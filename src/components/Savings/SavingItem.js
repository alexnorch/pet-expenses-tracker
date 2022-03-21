import { useState } from "react";

//My components
import SavingProgress from "./SavingProgress";
import EditingSaving from "./EditSaving";
import Modal from "../ui/Modal";

//Mui materials
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

//Firebase
import { db } from "../../util/firebase-config";
import { doc, updateDoc } from "firebase/firestore";

const SavingItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [changedAmount, setChangedAmount] = useState(0);
  const { title, description, reached, goal } = props.savingData.data;
  const { id } = props.savingData;

  const savingsDocRef = doc(db, "savings", id);

  const updateAmountHandler = async () => {
    try {
      await updateDoc(savingsDocRef, {
        reached: Number(reached) + Number(changedAmount),
      });
      setIsAdding(false);
      setChangedAmount(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="saving-item">
        <div className="saving-item__header">
          <h3 className="saving-item__title">{title}</h3>
          <p className="saving-item__desc">{description}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="saving-item__btn edit"
          >
            <i className="fas fa-edit" />
          </button>
        </div>

        <div className="saving-item__middle">
          <SavingProgress data={{ reached, goal }} />
          <p>You have reached:</p>
          <span className="reached-amount">{reached}$</span>
          <p>of your saving goals: </p>
          <span className="goal-amount">{goal}$</span>
        </div>

        <div className="saving-item__bottom">
          <Button onClick={() => setIsAdding(true)} variant="contained">
            Add amount
          </Button>
        </div>
      </div>

      {/* if user click on edit button */}
      <Modal
        title="Editing saving"
        isShowing={isEditing}
        toggle={() => setIsEditing((prevState) => !prevState)}
      >
        <EditingSaving
          id={id}
          title={title}
          description={description}
          reached={reached}
          goal={goal}
          onCloseModal={() => setIsEditing(false)}
        />
      </Modal>

      {/* if user click on add button */}
      <Modal
        title="Add an amount"
        isShowing={isAdding}
        toggle={() => setIsAdding((prevState) => !prevState)}
      >
        <div className="input-group">
          <TextField
            value={changedAmount}
            onChange={(e) => setChangedAmount(e.target.value)}
            helperText="Please enter an amount you want to put on this saving"
            id="outlined-basic"
            type="number"
            label="Amount"
            variant="standard"
          />
        </div>
        <div className="button-group">
          <Button onClick={updateAmountHandler} variant="contained">
            Put
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SavingItem;
