import httpService from "./httpService";
import { jwtDecode } from "jwt-decode";

const tokenKey = "token";

refreshTokenHeader();

export function refreshTokenHeader() {
  httpService.setCommonHeader("x-auth-token", getJWT());
}

export function createUser(user) {
  return httpService.post("/users", user);
}

export async function login(credentials) {
  const response = await httpService.post("/users/login", credentials);
  localStorage.setItem(tokenKey, response.data);
  refreshTokenHeader();

  return response;
}

export function logout() {
  localStorage.removeItem(tokenKey);
  refreshTokenHeader();
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}

export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

export function getAllUsers() {
  return httpService.get("/users");
}

export function updateUser(id, user) {
  return httpService.put(`/users/${id}`, user);
}

export function getUserById(id) {
  return httpService.get(`/users/${id}`);
}

export function deleteUser(id) {
  return httpService.delete(`/users/${id}`);
}

export function patchBusiness(id) {
  return httpService.patch(`/users/${id}`);
}

const usersService = {
  createUser,
  login,
  logout,
  getUser,
  getJWT,
  getAllUsers,
  updateUser,
  getUserById,
  deleteUser,
  patchBusiness,
};

export default usersService;
