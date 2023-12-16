import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

const Footer = () => {
  const { user } = useAuth();
  return (
    <div className="border-top py-1 text-center text-secondary">
      <div className="d-flex justify-content-evenly">
        <Link to="/about">
          <div className="d-flex flex-column bd-highlight mb-3 icon-l">
            <div>
              <i className="bi bi-info-circle"></i>
            </div>
            <div>About</div>
          </div>
        </Link>
        {user && (
          <Link to="/fav-cards">
            <div className="icon-l">
              <div>
                <i className="bi bi-heart"></i>
              </div>
              <div>Favorites</div>
            </div>
          </Link>
        )}
        {(user?.isBusiness || user?.isAdmin) && (
          <Link to="/my-cards">
            <div className="icon-l">
              <div>
                <i className="bi bi-person-square"></i>
              </div>
              <div>My Cards</div>
            </div>
          </Link>
        )}
      </div>
      <hr style={{ margin: "0" }} />
      <div>
        <span>
          <i className="bi bi-postcard"></i>BCard
        </span>
        <span className="mx-2">&copy;</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </div>
  );
};

export default Footer;
