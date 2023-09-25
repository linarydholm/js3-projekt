import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// api-fetch
export const getCardholder = createAsyncThunk(
  "cards/getCardholder",
  async () => {
    const response = await axios.get("https://randomuser.me/api/");
    const data = response.data;

    const { first, last } = data.results[0].name;
    const fullName = `${first} ${last}`;

    return fullName;
  }
);

// initial states
const initialState = {
  cardholder: null,
  cardholderFetched: false,
  cardholderStatus: "Missing",
  cardnumber: "XXXX XXXX XXXX XXXX",
  vendor: "Vendor",
  valid: "mm/yy",
  id: 1,
  showPopup: false,
  popupData: null,
  cards: [
    {
      cardnumber: "XXXXXXXXXXXXXXXX",
      valid: "10/23",
      ccv: "000",
      vendor: "visa",
      active: true,
      id: 0,
    },
  ],
};

// slicer
export const cards = createSlice({
  name: "cards",
  // state(s)
  initialState,
  // reducer(s)
  reducers: {
    // action(s)
    // för att sätta ett random kortnummer
    setCardnumber: (state) => {
      const number = Math.floor(Math.random() * 10).toString();
      state.cards[0].cardnumber = state.cards[0].cardnumber.replace(
        "X",
        number
      );
    },
    // för att lägga till nytt kort och uppdatera state för id
    addNewCard: (state, action) => {
      state.cards.push(action.payload);
      state.id += 1;
    },
    // uppdatera kortnummer när man skriver in det
    interactiveCardnumber: (state, action) => {
      state.cardnumber = "XXXX XXXX XXXX XXXX";

      const arrX = state.cardnumber.split("").filter((value) => value !== " ");
      const numArr = action.payload.split("");

      const newArr = arrX.map((value, index) => {
        return numArr[index] !== undefined ? numArr[index] : value;
      });

      const newCardnumber = newArr.join("");

      state.cardnumber = `${newCardnumber.substring(
        0,
        4
      )} ${newCardnumber.substring(4, 8)} ${newCardnumber.substring(
        8,
        12
      )} ${newCardnumber.substring(12, 16)}`;
    },
    // uppdatera vendor när man byter
    interactiveVendor: (state, action) => {
      state.vendor = action.payload;
    },
    // uppdatera datum när man byter
    interactiveValid: (state, action) => {
      const date = new Date(action.payload);

      if (date == "Invalid Date") {
        state.valid = "Not valid";
      } else {
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2);

        state.valid = `${month}/${year}`;
      }
    },
    // reseta alla states för interactiveCard
    resetStates: (state) => {
      state.cardnumber = initialState.cardnumber;
      state.valid = initialState.valid;
      state.vendor = initialState.vendor;
    },
    // för att sätta nytt kort till "active: true"
    toggleActive: (state, action) => {
      const id = action.payload;

      state.cards.map((card) => {
        if (card.id === id) {
          card.active = true;
        } else if (card.active === true) {
          card.active = false;
        }
      });
    },
    // för att ta bort ett inaktivt kort
    deleteCard: (state, action) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    // för att visa/dölja popup
    togglePopup: (state, action) => {
      state.showPopup = action.payload;
    },
    // för att ändra datan som skickas till knappar i popup
    changePopupData: (state, action) => {
      state.popupData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCardholder.pending, (state) => {
        state.cardholderStatus = "Loading...";
      })
      .addCase(getCardholder.fulfilled, (state, action) => {
        state.cardholder = action.payload;
        state.cardholderFetched = true;
        state.cardholderStatus = "Success!";
      })
      .addCase(getCardholder.rejected, (state) => {
        state.cardholderStatus = "Failed :(";
      });
  },
});

// exporter av actions
export const {
  setCardnumber,
  addNewCard,
  interactiveCardnumber,
  interactiveVendor,
  interactiveValid,
  resetStates,
  toggleActive,
  deleteCard,
  togglePopup,
  changePopupData,
} = cards.actions;

// exporter av states
export const selectCardholder = (state) => state.cards.cardholder;
export const selectCardholderFetched = (state) => state.cards.cardholderFetched;
export const selectCardholderStatus = (state) => state.cards.cardholderStatus;
export const selectCardnumber = (state) => state.cards.cardnumber;
export const selectVendor = (state) => state.cards.vendor;
export const selectValid = (state) => state.cards.valid;
export const selectCards = (state) => state.cards.cards;
export const selectId = (state) => state.cards.id;
export const selectShowPopup = (state) => state.cards.showPopup;
export const selectPopupData = (state) => state.cards.popupData;

// export av reducers
export default cards.reducer;
