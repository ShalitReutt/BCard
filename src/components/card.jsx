import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import { useState } from "react";
import cardsService from "../services/cardService";
import { showErrorToast } from "../utilities/toast";

const Card = ({
  card: { title, subtitle, phone, address, _id, image, bizNumber, likes },
}) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(likes.includes(user._id));

  const handleLike = async () => {
    if (user) {
      await cardsService.likeCard(_id);
      setIsLiked(!isLiked);
    } else {
      showErrorToast("Failed to Like a card");
    }
  };
  return (
    <div className="card mb-4">
      <Link to={`/business-page/${_id}`}>
        <img
          src={image.url}
          className="card-img-top"
          alt={image.alt}
          style={{ height: "12rem" }}
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{subtitle}</p>
        <hr />
        <div className="card-text">
          <b>Phone: {phone}</b>
        </div>
        <div className="card-text">
          <b>
            Address:
            {` ${address.street} ${address.houseNumber} ${address.city}`}
          </b>
        </div>
        <div className="card-text">
          <b>Card Number: {bizNumber}</b>
        </div>
        {user?.isBusiness ? (
          <div className="position-absolute card-icons-left d-flex">
            <Link
              to={`/edit-card/${_id}`}
              className="card-icon card-icon-hover"
            >
              <i className="bi bi-pencil-fill me-2"></i>
            </Link>
            <Link
              to={`/delete-card/${_id}`}
              className="card-icon card-icon-hover"
            >
              <i className="bi bi-trash3-fill"></i>
            </Link>
          </div>
        ) : (
          <></>
        )}
        <div className="position-absolute card-icons-right d-flex">
          <Link to={`tel: ${phone}`} className="card-icon-hover">
            <i className="bi bi-telephone-fill me-2 card-icon"></i>
          </Link>
          {!isLiked ? (
            <i
              className="bi bi-heart-fill card-icon-hover"
              onClick={() => {
                handleLike();
              }}
              style={{ cursor: "pointer" }}
            ></i>
          ) : (
            <i
              className="bi bi-heart-fill card-icon-hover text-danger pointer"
              onClick={() => {
                handleLike();
              }}
              style={{ cursor: "pointer" }}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
