import { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import cardsService from "../services/cardService";
import { showErrorToast, showSuccessToast } from "../utilities/toast";
import { useAuth } from "../contexts/auth.context";

const DeleteCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { user } = useAuth();

  const handleDelete = async () => {
    try {
      await cardsService.deleteCard(id);
      showSuccessToast("Card deleted successfully");
      navigate("/my-cards");
    } catch (error) {
      showErrorToast("Failed to delete card");
    }
  };

  const handleConfirmDelete = () => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    navigate("/my-cards");
  };

  useEffect(() => {
    if (showConfirmation) {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this card?"
      );
      if (isConfirmed) {
        handleDelete();
      } else {
        handleCancelDelete();
      }
      setShowConfirmation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showConfirmation]);

  useEffect(() => {
    handleConfirmDelete();
  }, []);

  if (!(user?.isBusiness || user?.isAdmin)) {
    return <Navigate to="/" />;
  }

  return null;
};

export default DeleteCard;
