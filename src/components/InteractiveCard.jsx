import {
  selectCardholder,
  selectCardholderStatus,
  selectCardholderFetched,
  getCardholder,
  selectCardnumber,
  selectVendor,
  selectValid,
} from "../features/cardsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// ikoner
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi, faTableCells } from "@fortawesome/free-solid-svg-icons";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
} from "@fortawesome/free-brands-svg-icons";

const InteractiveCard = () => {
  // useDispatch()
  const dispatch = useDispatch();

  // useSelectors()
  const cardholder = useSelector(selectCardholder);
  const cardholderFetched = useSelector(selectCardholderFetched);
  const cardholderStatus = useSelector(selectCardholderStatus);
  const cardnumber = useSelector(selectCardnumber);
  const vendor = useSelector(selectVendor);
  const valid = useSelector(selectValid);

  // hämta cardholder från api om vi inte redan gjort det
  useEffect(() => {
    if (!cardholderFetched) {
      dispatch(getCardholder());
    }
  }, [dispatch, cardholderFetched]);

  const cardClass = `${vendor} card col justify-between rounded-2xl font-card uppercase shadow-md mb-6`;

  return (
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
          {vendor === "Vendor" && "vendor"}
          {vendor === "visa" && <FontAwesomeIcon icon={faCcVisa} size="2xl" />}
          {vendor === "mastercard" && (
            <FontAwesomeIcon icon={faCcMastercard} size="2xl" />
          )}
          {vendor === "amex" && <FontAwesomeIcon icon={faCcAmex} size="2xl" />}
        </div>
      </div>
      <div>
        <p className="text-2xl p-3">{cardnumber}</p>
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
  );
};

export default InteractiveCard;
