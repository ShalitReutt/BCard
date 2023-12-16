import { createContext, useContext, useState, useEffect } from "react";
import usersService from "../services/usersServices";
import httpService from "../services/httpService";

const fn_error_context_must_be_used = () => {
  throw new Error("must use authContext provider for consumer to work");
};

export const authContext = createContext({
  user: null,
  login: fn_error_context_must_be_used,
  logout: fn_error_context_must_be_used,
  signUp: fn_error_context_must_be_used,
});
authContext.displayName = "auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(usersService.getUser());
  const [likedCards, setLikedCards] = useState([]);

  useEffect(() => {
    const fetchLikedCards = async () => {
      if (user) {
        const userData = await httpService.get(`/users/${user._id}`);
        setLikedCards(userData.data.likedCards || []);
      }
    };

    fetchLikedCards();
  }, [user]);

  const refreshUser = () => {
    setUser(usersService.getUser());
  };

  const login = async (credentials) => {
    const response = await usersService.login(credentials);

    refreshUser();

    return response;
  };

  const logout = () => {
    usersService.logout();
    refreshUser();
  };

  const getUser = (id) => {
    return httpService.get(`/users/${id}`);
  };
  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
        register: usersService.createUser,
        getUser,
        likedCards,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
