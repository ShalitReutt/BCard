import httpService from "./httpService";

export function createCard(card) {
  return httpService.post("/cards", card);
}

export function getAll() {
  return httpService.get("/cards");
}

export function getMyCards() {
  return httpService.get("/cards/my-cards");
}

export function getCard(id) {
  return httpService.get(`/cards/${id}`);
}

export function deleteCard(id) {
  return httpService.delete(`/cards/${id}`);
}

export function updateCard(id, card) {
  return httpService.put(`/cards/${id}`, card);
}

export function likeCard(id) {
  return httpService.patch(`/cards/${id}`);
}

const cardsService = {
  createCard,
  getAll,
  getCard,
  deleteCard,
  updateCard,
  getMyCards,
  likeCard,
};

export default cardsService;
