import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import { selectCards } from "../features/cardsSlice";

const Home = () => {
  const cards = useSelector(selectCards);
  // console.log(cards);

  return (
    <div className="wrapper">
      <h1>E-wallet</h1>
      <p className="small-text">Active card</p>
      {cards.map((card, i) => {
        if (card.active) {
          return <Card {...card} key={i} id={card.id} />;
        }
      })}

      {cards.length > 1 && <p className="small-text">Inactive cards</p>}
      {cards.map((card, i) => {
        if (!card.active) {
          return <Card {...card} key={i} id={card.id} />;
        }
      })}

      {cards.length < 4 && (
        <NavLink to="add">
          <button className="big-btn mt-2 hover:bg-gray-900 hover:text-white">
            Add a new card
          </button>
        </NavLink>
      )}
    </div>
  );
};

export default Home;
