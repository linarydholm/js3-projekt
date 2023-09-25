import { useSelector } from "react-redux";
import {
  selectCardholder,
  selectCardholderStatus,
} from "../features/cardsSlice";
// ikoner
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi, faTableCells } from "@fortawesome/free-solid-svg-icons";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
} from "@fortawesome/free-brands-svg-icons";

const PopupCard = ({ cardnumber, valid, vendor }) => {
  // selectors
  const cardholder = useSelector(selectCardholder);
  const cardholderStatus = useSelector(selectCardholderStatus);

  const cardClass = `${vendor} card col justify-between rounded-2xl font-card uppercase shadow-md mb-6`;

  return (
    <div>
      <div className={cardClass}>
        <div className="row justify-between px-3 pt-3">
          <div className="col">
            <div>
              <FontAwesomeIcon icon={faWifi} size="lg" />
            </div>
            <div>
              <FontAwesomeIcon icon={faTableCells} size="xl" />
            </div>
          </div>
          <div>
            {vendor === "visa" && (
              <FontAwesomeIcon icon={faCcVisa} size="2xl" />
            )}
            {vendor === "mastercard" && (
              <FontAwesomeIcon icon={faCcMastercard} size="2xl" />
            )}
            {vendor === "amex" && (
              <FontAwesomeIcon icon={faCcAmex} size="2xl" />
            )}
          </div>
        </div>
        <div>
          <p className="text-2xl p-3">{`${cardnumber.substring(
            0,
            4
          )} ${cardnumber.substring(4, 8)} ${cardnumber.substring(
            8,
            12
          )} ${cardnumber.substring(12, 16)}`}</p>
        </div>
        <div className="row justify-between p-3">
          <div className="col">
            <div>
              <p className="text-xs">Cardholder name</p>
            </div>
            <div>
              <p className="text-sm">
                {cardholder ? cardholder : cardholderStatus}
              </p>
            </div>
          </div>
          <div className="col text-right">
            <div>
              <p className="text-xs">Valid thru</p>
            </div>
            <div>
              <p className="text-sm">{valid}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
