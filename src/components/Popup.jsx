import { useDispatch, useSelector } from "react-redux";
import {
  toggleActive,
  deleteCard,
  togglePopup,
  selectPopupData,
} from "../features/cardsSlice";
import PopupCard from "./PopupCard";

const Popup = ({ id }) => {
  const dispatch = useDispatch();

  const popupData = useSelector(selectPopupData);

  // onClick-funktioner
  const handleActiveCard = () => {
    dispatch(toggleActive(id));
    dispatch(togglePopup(false));
  };

  const handleDelete = () => {
    dispatch(deleteCard(id));
    dispatch(togglePopup(false));
  };

  const closePopup = () => {
    dispatch(togglePopup(false));
  };

  return (
    <div className="bg-black bg-opacity-30 fixed top-0 left-0 h-screen w-screen z-10">
      <div className="h-screen w-screen row justify-center items-center">
        <div className="wrapper col shadow-md">
          <PopupCard {...popupData} />
          <div className="row justify-between align-middle">
            <button onClick={handleActiveCard} className="popup-btn activate">
              Activate
            </button>
            <button onClick={handleDelete} className="popup-btn delete">
              Delete
            </button>
            <button onClick={closePopup} className="popup-btn close">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
