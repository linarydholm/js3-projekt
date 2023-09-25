import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Popup from "./Popup";
import {
  getCardholder,
  setCardnumber,
  selectCardholder,
  selectCardholderFetched,
  selectCardholderStatus,
  togglePopup,
  selectShowPopup,
  changePopupData,
  selectPopupData,
} from "../features/cardsSlice";
// ikoner
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi, faTableCells } from "@fortawesome/free-solid-svg-icons";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
} from "@fortawesome/free-brands-svg-icons";

const Card = ({ cardnumber, valid, vendor, active, id }) => {
  const dispatch = useDispatch();

  // selectors
  const cardholder = useSelector(selectCardholder);
  const cardholderFetched = useSelector(selectCardholderFetched);
  const cardholderStatus = useSelector(selectCardholderStatus);
  const showPopup = useSelector(selectShowPopup);
  const popupData = useSelector(selectPopupData);

  // hämta värde från api
  useEffect(() => {
    if (!cardholderFetched) {
      dispatch(getCardholder());
    }
  }, [dispatch, cardholderFetched]);

  // onClick-funktioner
  const popup = () => {
    if (!active) {
      dispatch(changePopupData({ cardnumber, valid, vendor, active, id }));
      dispatch(togglePopup(true));
    }
  };

  // hämta ett random nummer vid start av applikationen
  const updateNumber = (number) => {
    dispatch(setCardnumber(number));
  };

  useEffect(() => {
    updateNumber();
  }, [updateNumber]);

  const cardClass = `${vendor} card col justify-between rounded-2xl font-card uppercase shadow-md mb-6`;

  return (
    <div>
      <div onClick={popup} className={cardClass}>
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
      {showPopup && <Popup {...popupData} />}
    </div>
  );
};

export default Card;
