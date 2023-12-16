import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let lastToastId = null;

export const showSuccessToast = (message) => {
  if (lastToastId) {
    toast.dismiss(lastToastId);
  }
  const newToast = toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: true,
    className: "toast-dark",
  });
  lastToastId = newToast;
};

export const showErrorToast = (message) => {
  if (lastToastId) {
    toast.dismiss(lastToastId);
  }
  const newToast = toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: true,
    className: "toast-dark",
  });
  lastToastId = newToast;
};
