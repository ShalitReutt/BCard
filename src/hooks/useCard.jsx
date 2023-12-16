import { useEffect, useState } from "react";
import cardsService from "../services/cardService";

export const useCard = (id) => {
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCard = async () => {
      try {
        const { data } = await cardsService.getCard(id);
        setCard(data);
      } catch (error) {
        setError(error);
      }
    };

    if (id) {
      getCard();
    }
  }, [id]);

  return { card, error };
};
