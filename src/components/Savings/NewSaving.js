import { useState, forwardRef } from "react";

//Mui materials
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//Firebase
import { addDoc } from "firebase/firestore";
import { db } from "../../util/firebase-config";
import { collection } from "firebase/firestore";

import Modal from "../ui/Modal";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewSaving = () => {

  const [isModalActive, setIsModalActive] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [startAmount, setStartAmount] = useState("");
  const [desireAmount, setDesireAmount] = useState("");
  const [hasErrors, setHasErrors] = useState({})

  const savingCollection = collection(db, "savings");

  const showModal = () => {
    setIsModalActive(true)
  }

  const closeModal = () => {
    setIsModalActive(prevState => !prevState)
    setHasErrors({})
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const validateValues = () => {
    const errors = {}

    if (title === '' || title.length < 6) {
      errors.title = 'Must contain at last 6 characters'
    }

    if (descr === '' || descr.length < 6) {
      errors.descr = 'Must contain at last 6 characters'
    }

    if (startAmount === '' || Number(startAmount) < 0) {
      errors.startAmount = 'Must be greater then  0'
    }

    if (desireAmount === '') {
      errors.desireAmount = 'Must not be empty'
    }

    if (Object.keys(errors).length == 0) {
      return true
    } else {
      return setHasErrors(errors)
    }
  }


  const submitHandler = (e) => {
    e.preventDefault();

    const savingData = {
      title: title,
      description: descr,
      reached: startAmount,
      goal: desireAmount,
    };

    if (validateValues()) {
      addDoc(savingCollection, savingData);
      closeModal(false);
      setSnackOpen(true);
  
      setDescr("");
      setTitle("");
      setDesireAmount("");
      setStartAmount("");
    }
  };

  return (
    <>
      <div onClick={showModal} className="saving-item new-item">
        <i className="fas fa-plus" />
        <p>Add new</p>
      </div>
      {isModalActive && (
        <Modal
          title="Add new saving"
          isShowing={isModalActive}
          toggle={closeModal}>
          <Box
            onSubmit={submitHandler}
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="input-group">
              <TextField
                error={hasErrors.title? true : false}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                helperText={hasErrors.title || "Please enter title of your saving goal"}
                id="outlined-basic"
                label="Title"
                variant="standard"
              />
            </div>
            <div className="input-group">
              <TextField
                error={hasErrors.descr? true : false}
                value={descr}
                onChange={(e) => setDescr(e.target.value)}
                helperText={hasErrors.descr || "Description of your saving goal"}
                id="outlined-basic"
                label="Description"
                variant="standard"
              />
            </div>
            <div className="input-group">
              <TextField
                error={hasErrors.startAmount? true : false}
                value={startAmount}
                onChange={(e) => setStartAmount(e.target.value)}
                helperText={hasErrors.startAmount || "Enter amount of money you have right now"}
                id="standard-number"
                label="Start amount"
                type="number"
                variant="standard"
              />
            </div>
            <div className="input-group">
              <TextField
                error={hasErrors.desireAmount? true : false}
                value={desireAmount}
                onChange={(e) => setDesireAmount(e.target.value)}
                helperText={hasErrors.desireAmount || "Enter desire amount of money"}
                id="standard-number"
                label="Goal amount"
                type="number"
                variant="standard"
              />
            </div>
            <div className="button-group">
              <Button type="submit" variant="contained">
                Add
              </Button>
            </div>
          </Box>
        </Modal>
      )}
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          You have successfuly added a new saving!
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewSaving;
