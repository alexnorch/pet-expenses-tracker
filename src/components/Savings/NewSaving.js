import { useState, forwardRef } from "react";
import * as Yup from 'yup'
import { useFormik } from 'formik'

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
  const savingCollection = collection(db, "savings");

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: { title: '', description: '', reached: '', goal: ''},
    validationSchema: Yup.object({
      title: Yup.string()
        .min(6, 'Must be greater than 6 characters')
        .required('Title is required'),
      description: Yup.string()
        .min(6, 'Must be greater than 6 characters')
        .required('Description is required'),
      reached: Yup.number()
        .required('Reached amount is required')
        .positive('Must be a positive value'),
      goal: Yup.number()
        .required('Goal is required')
        .positive('Must be a positive value')
    }),
    onSubmit: async (values) => {
      await addDoc(savingCollection, values);
      closeModal(false);
      setSnackOpen(true);
    }
  })

  const showModal = () => { setIsModalActive(true) }
  const closeModal = () => setIsModalActive(prevState => !prevState)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackOpen(false);
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
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
            noValidate
            autoComplete="off"
          >
            <div className="input-group">
              <TextField
                name='title'
                error={errors.title}
                value={values.title}
                onChange={handleChange}
                helperText={errors.title || "Please enter title of your saving goal"}
                label="Title"
                variant="standard"
              />
            </div>
            <div className="input-group">
              <TextField
                name='description'
                error={errors.description}
                value={values.description}
                onChange={handleChange}
                helperText={errors.description || "Description of your saving goal"}
                label="Description"
                variant="standard"
              />
            </div>
            <div className="input-group">
              <TextField
                name='reached'
                error={errors.reached}
                value={values.reached}
                onChange={handleChange}
                helperText={errors.reached || "Enter amount of money you have right now"}
                label="Start amount"
                type="number"
                variant="standard"
              />
            </div>
            <div className="input-group">
              <TextField
                name='goal'
                error={errors.goal}
                value={values.goal}
                onChange={handleChange}
                helperText={errors.goal || "Enter desire amount of money"}
                label="Goal amount"
                type="number"
                variant="standard"
              />
            </div>
            <div className="button-group">
              <Button
                onClick={handleSubmit} 
                type="submit" 
                variant="contained"> Add </Button>
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
