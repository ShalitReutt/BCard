import { useAuth } from "../contexts/auth.context";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import cardsService from "../services/cardService";
import AdminCard from "./adminCard";

const FavCards = () => {
  const { user } = useAuth();
  const [favoriteCards, setFavoriteCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await cardsService.getAll();
        const filteredCards = response.data.filter((card) =>
          card.likes.includes(user._id)
        );
        setFavoriteCards(filteredCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    if (user) {
      getCards();
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h1 className="display-2">Favorite Cards</h1>
      <p style={{ fontSize: "3vmin" }}>
        Here you can find all your favorite business cards
        <i className="bi bi-heart-fill ms-2"></i>
      </p>
      <hr />
      <div className="d-flex justify-content-evenly flex-wrap">
        {favoriteCards.length === 0 ? (
          <></>
        ) : (
          favoriteCards.map((card) => <AdminCard card={card} key={card._id} />)
        )}
      </div>
    </>
  );
};

export default FavCards;
