import InteractiveCard from "../components/InteractiveCard";
import Form from "../components/Form";

const AddCard = () => {
  return (
    <div className="wrapper">
      <h1>Add a new card</h1>
      <p className="small-text">New card</p>
      <InteractiveCard />
      <Form />
    </div>
  );
};

export default AddCard;
