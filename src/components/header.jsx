import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../App";
import ReactSwitch from "react-switch";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import { useCard } from "../hooks/useCard";
import { NavDropdown } from "react-bootstrap";
import usersService from "../services/usersServices";
import { showErrorToast } from "../utilities/toast";

const Header = ({ searchTerm, setSearchTerm }) => {
  const { user: userIn } = useAuth();
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { card } = useCard();
  const [showNav, setShowNav] = useState(false);
  const [user, setUser] = useState([]);

  const handleToggleNav = () => {
    setShowNav(!showNav);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        if (userIn?._id) {
          const { data } = await usersService.getUserById(userIn._id);
          setUser(data);
        }
      } catch (error) {
        showErrorToast("Failed to fetch user");
      }
    };

    getUser();
  }, [userIn]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.pathname !== "/main") {
      navigate("/main");
    }
    if (card) {
      const filteredCards = card.filter(
        (singleCard) =>
          singleCard.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          singleCard.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      );

      console.log("Searching for:", searchTerm);
      console.log("Filtered Cards:", filteredCards);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <nav
      className="navbar navbar-expand-xl navbar-light shadow-sm bg-success text-white py-4"
      id={theme}
    >
      <div className="container">
        <Link to="/main" className="navbar-brand">
          <span className="fw-bolder display-6 logo">
            <i className="bi bi-postcard"></i>BCard
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <NavLink to="/about" className="nav-link link ">
                About
              </NavLink>
            </li>
            {(userIn?.isBusiness || userIn?.isAdmin) && (
              <li className="nav-item">
                <NavLink to="/fav-cards" className="nav-link link">
                  Favorite Cards
                </NavLink>
              </li>
            )}
            {(userIn?.isBusiness || userIn?.isAdmin) && (
              <li className="nav-item">
                <NavLink to="/my-cards" className="nav-link link">
                  My Cards
                </NavLink>
              </li>
            )}
            {userIn?.isAdmin && (
              <li className="nav-item">
                <NavLink to="/sandbox" className="nav-link link">
                  Sandbox
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
            <li>
              <form
                onSubmit={handleSearch}
                className="d-flex form-inputs nav-item me-2"
                style={{ width: "max-content" }}
              >
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyUp={handleKeyPress}
                  className="form-control me-2"
                  type="text"
                  placeholder="Search any card"
                  style={{ width: "13rem" }}
                />
                <i
                  className="bi bi-search"
                  onClick={handleSearch}
                  style={{ cursor: "pointer" }}
                ></i>
              </form>
            </li>
            <li style={{ marginTop: "1vmin" }}>
              <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
              <i className="bi bi-moon-fill moon time"></i>
              <i className="bi bi-sun-fill sun time"></i>
            </li>
            {userIn ? (
              <>
                <NavDropdown
                  title={
                    <img
                      src={user.image?.url}
                      alt={user.image?.alt}
                      className="avatar"
                    />
                  }
                  id="basic-nav-dropdown"
                  show={showNav}
                  onClick={handleToggleNav}
                >
                  <NavDropdown.Item
                    onClick={() => navigate(`/edit-user/${userIn._id}`)}
                    className="toggle-item"
                  >
                    Edit Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate("/logout")}
                    className="toggle-item"
                  >
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link link">
                    Log In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link link">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
