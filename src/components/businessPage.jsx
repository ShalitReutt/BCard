import { useParams } from "react-router-dom";
import { useCard } from "../hooks/useCard";
import "../style/businessPage.css";
import { Link } from "react-router-dom";

const BusinessPage = () => {
  const { id } = useParams();
  const { card } = useCard(id);

  if (!card) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1 className="display-2 text-center">Business Info</h1>
      <p style={{ fontSize: "3vmin" }} className="text-center">
        More information and details about the business
      </p>
      <hr />
      <div className="position-relative business d-flex">
        <img
          src={card.image.url}
          alt={card.image.alt}
          className="d-inline start-0 img"
        />
        <div className="info flex-column">
          <h1 className="m-auto mb-4">{card.title}</h1>
          <h3 className="h3">{card.subtitle}</h3>
          <p className="par">
            <b>Business Description: </b>
            {card.description}
          </p>
          <p className="par">
            <b>Phone:</b> {card.phone}
          </p>
          <p className="par">
            <b>Email:</b> {card.email}
          </p>
          {card.web && (
            <p>
              <b>Website:</b>{" "}
              <Link to={card.web} target="_blank">
                {" "}
                {card.web.slice(0, 30)}
              </Link>
            </p>
          )}
          <p className="par">
            <b>Address: </b>
            {card.address.state && `${card.address.state}, `}
            {` ${card.address.country}, ${card.address.city}, ${card.address.street}, ${card.address.houseNumber}`}
          </p>
          {card.address.zip !== 0 && (
            <p className="par">
              <b>Zip Code: {`${card.address.zip}`}</b>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default BusinessPage;
