import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCardholder,
  selectCardholderStatus,
  addNewCard,
  interactiveCardnumber,
  interactiveVendor,
  interactiveValid,
  resetStates,
  selectId,
  selectCards,
} from "../features/cardsSlice";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cardholder = useSelector(selectCardholder);
  const cardholderStatus = useSelector(selectCardholderStatus);
  const id = useSelector(selectId);
  const cards = useSelector(selectCards);

  // onChange-funktioner
  const updateCardnumber = (e) => {
    const num = e.target.value;
    dispatch(interactiveCardnumber(num));
  };

  const updateVendor = (e) => {
    const vendor = e.target.value;
    dispatch(interactiveVendor(vendor));
  };

  const updateValid = (e) => {
    const valid = e.target.value;
    dispatch(interactiveValid(valid));
  };

  //schema
  const schema = yup.object().shape({
    cardnumber: yup.string().matches(/^[0-9]{16}$/, {
      message: "Must be 16 integers long",
    }),
    cardholder: yup.string(),
    valid: yup
      .date()
      .typeError("Must be a valid date format: yyyy-mm-dd")
      .required("Required field"),
    ccv: yup.string().matches(/^[0-9]{3}$/, {
      message: "Must be 3 integers long",
    }),
    vendor: yup.string().required("Required field"),
  });

  // deklarera en resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // denna funktion körs på sumbit
  const onSubmit = (data) => {
    const date = new Date(data.valid);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    data.valid = `${month}/${year}`;

    if (cards.length < 4) {
      dispatch(addNewCard({ ...data, active: false, id }));
    } else {
      alert(
        "You have already reached the maximum amount of 4 cards in your wallet!"
      );
    }
    navigate("/");
    dispatch(resetStates());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="uppercase">
      <div className="col">
        <label htmlFor="cardnumber">Card number</label>
        <input
          type="number"
          id="cardnumber"
          placeholder="16 integers"
          {...register("cardnumber")}
          onChange={updateCardnumber}
        />
        <p className="error-message">{errors.cardnumber?.message}</p>
      </div>
      <div className="col">
        <label htmlFor="cardholder">Cardholder name</label>
        <input
          className="bg-gray-100 text-gray-500"
          type="text"
          id="cardholder"
          value={cardholder ? cardholder : cardholderStatus}
          {...register("cardholder")}
          disabled
        />
        <p className="error-message">{errors.cardholder?.message}</p>
      </div>
      <div className="row justify-between">
        <div className="col w-1/2">
          <label htmlFor="valid">Valid thru</label>
          <input
            type="date"
            id="valid"
            {...register("valid")}
            onChange={updateValid}
          />
          <p className="error-message">{errors.valid?.message}</p>
        </div>
        <div className="col w-2/5">
          <label htmlFor="ccv">CCV</label>
          <input
            type="number"
            id="ccv"
            placeholder="3 integers"
            {...register("ccv")}
          />
          <p className="error-message">{errors.ccv?.message}</p>
        </div>
      </div>
      <div className="col">
        <label htmlFor="vendors">Vendor</label>
        <select
          name="vendors"
          id="vendors"
          defaultValue=""
          {...register("vendor")}
          onChange={updateVendor}
        >
          <option value="" disabled>
            Options
          </option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="amex">American Express</option>
        </select>
        <p className="error-message">{errors.vendor?.message}</p>
      </div>
      <button
        type="submit"
        className="big-btn mt-6 bg-gray-900 text-white hover:bg-white hover:text-black"
      >
        Add card
      </button>
    </form>
  );
};

export default Form;
