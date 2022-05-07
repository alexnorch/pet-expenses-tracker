import { useState } from "react";

//Mui materials
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

//Firebase
import { db } from "../../util/firebase-config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

const EditingSaving = ({ title, description, reached, goal, id,onCloseModal,}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescr, setNewDescr] = useState(description);
  const [newReached, setNewReached] = useState(reached);
  const [newGoal, setNewGoal] = useState(goal);

  const savingsDocRef = doc(db, "savings", id);

  const editSavingHandler = async (e) => {
    e.preventDefault();

    const newData = { 
      title: newTitle, 
      description: newDescr, 
      reached: newReached, goal: 
      newGoal
    };

    try {
      await updateDoc(savingsDocRef, newData);
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSavingHandler = async () => {
    try {
      await deleteDoc(savingsDocRef);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        onSubmit={editSavingHandler}
        component="form"
        sx={{"& .MuiTextField-root": { m: 1, width: "100%" } }}
        noValidate
        autoComplete="off"
      >
        <div className="input-group">
          <TextField
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            helperText="Please enter title of your saving goal"
            label="Title"
            variant="standard"
          />
        </div>
        <div className="input-group">
          <TextField
            value={newDescr}
            onChange={(e) => setNewDescr(e.target.value)}
            helperText="Description of your saving goal"
            label="Description"
            variant="standard"
          />
        </div>
        <div className="input-group">
          <TextField
            value={newReached}
            onChange={(e) => setNewReached(e.target.value)}
            helperText="Enter amount of money you have right now"
            label="Start amount"
            type="number"
            variant="standard"
          />
        </div>
        <div className="input-group">
          <TextField
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            helperText="Enter desire amount of money"
            label="Goal amount"
            type="number"
            variant="standard"
          />
        </div>

        <div className="button-group">
          <Button
            onClick={deleteSavingHandler}
            type='button'
            color='error'
            sx={{marginRight: 1}}
            variant="contained"
          >
            Delete
          </Button>
          <Button
            type='submit' 
            variant="contained">
            Save
          </Button>
        </div>
      </Box>
    </>
  );
};

export default EditingSaving;
