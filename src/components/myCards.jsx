import { useAuth } from "../contexts/auth.context";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import cardsService from "../services/cardService";
import Card from "./card";
import { Link } from "react-router-dom";

const MyCards = () => {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      const { data } = await cardsService.getMyCards();
      setCards(data);
    };
    getCards();
  });

  if (!user?.isBusiness) {
    return <Navigate to="/main" />;
  }

  return (
    <>
      <div className="position-relative">
        <Link to={"/create-card"}>
          <i className="bi bi-file-plus display-1 position-absolute end-0 card-icon-hover card-icon"></i>
        </Link>
        <h1 className="display-2"> My Cards</h1>
        <p style={{ fontSize: "3vmin" }}>here you can find all of your cards</p>
      </div>
      <hr />
      <div className="d-flex justify-content-evenly flex-wrap">
        {!cards.length ? (
          <></>
        ) : (
          cards.map((card) => <Card card={card} key={card._id} />)
        )}
      </div>
    </>
  );
};

export default MyCards;
