import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { db } from "../../util/firebase-config";
import { collection } from "firebase/firestore";

// Mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from '@mui/material/FormHelperText';

//Custom hooks
import useForm from "../hooks/useForm";

const initialState = {
  title: '',
  date: '',
  amount: '',
  category: ''
}

const NewExpense = ({onCloseModal}) => {
  const expensesCollection = collection(db, "expenses");

  const {userValue, inputHandler, hasErrors, validateValues} = useForm(initialState)


  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateValues()) {
      await addDoc(expensesCollection, userValue);
      onCloseModal()
    }
  };


  return (
    <>
      <div className="new-expense">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="input-group">
            <TextField
              error={hasErrors.title ? true : false}
              name="title"
              helperText={hasErrors.title}
              value={userValue.title}
              onChange={inputHandler}
              id="standard-basic"
              label="Title"
              variant="standard"
            />
          </div>
         
          <div className="input-group">
            <TextField
               error={hasErrors.amount ? true : false}
              helperText={hasErrors.amount}
              value={userValue.amount}
              name="amount"
              onChange={inputHandler}
              id="standard-basic"
              label="Amount"
              variant="standard"
            />
          </div>
          <div className="input-group">
            <FormControl 
              variant="standard" 
              error={hasErrors.category ? true : false}>
              <InputLabel id="user-category">Category</InputLabel>
              <Select
                labelId="user-category"
                id="user-category"
                name="category"
                value={userValue.category}
                label="Category"
                onChange={inputHandler}
              >
                <MenuItem value="Health">Health</MenuItem>
                <MenuItem value="Relax">Relax</MenuItem>
                <MenuItem value="Hobbies">Hobbies</MenuItem>
                <MenuItem value="Shopping">Shopping</MenuItem>
                <MenuItem value="Travel">Travel</MenuItem>
              </Select>
              <FormHelperText>{hasErrors.category}</FormHelperText>
            </FormControl>
          </div>
          <div className="input-group">
            <TextField
              error={hasErrors.date ? true : false}
              helperText={hasErrors.date}
              name='date'
              type='date'
              value={userValue.date}
              onChange={inputHandler}
              id="standard-basic"
              variant="outlined"
            />
          </div>
          <div className="button-group">
            <Button type="submit" onClick={submitHandler} variant="contained">
              Add
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
};

export default NewExpense;
