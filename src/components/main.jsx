import AdminCard from "./adminCard";
import { useState, useEffect } from "react";
import cardsService from "../services/cardService";

const Main = ({ searchTerm }) => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      const { data } = await cardsService.getAll();
      setCards(data);
      setFilteredCards(data);
    };
    getCards();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCards(cards);
    } else {
      const filtered = cards.filter(
        (card) =>
          card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCards(filtered);
    }
  }, [searchTerm, cards]);

  return (
    <>
      <h1 className="display-2">Cards</h1>
      <p style={{ fontSize: "4vmin" }}>
        Here you can find business cards from all categories
      </p>
      <hr />
      <div className="d-flex justify-content-evenly flex-wrap">
        {!filteredCards.length ? (
          <></>
        ) : (
          filteredCards.map((card) => <AdminCard card={card} key={card._id} />)
        )}
      </div>
    </>
  );
};

export default Main;
