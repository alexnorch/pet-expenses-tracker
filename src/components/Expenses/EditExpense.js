import { useState } from "react";

import { db } from "../../util/firebase-config";
import { updateDoc, doc } from "firebase/firestore";

// Mui material
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const EditExpense = ({date, amount, title, category, id, onCloseModal}) => {

    const [newTitle, setNewTitle] = useState(title);
    const [newAmount, setNewAmount] = useState(amount);
    const [newDate, setNewDate] = useState(date)
    const [newCategory, setNewCategory] = useState(category)

    const expenseDocRef = doc(db, "expenses", id);

    const editExpenseHandler = async (e) => {
        e.preventDefault()

        const newData = {
            amount: newAmount,
            category: newCategory,
            date: newDate,
            title: newTitle
          };
      
          try {
            await updateDoc(expenseDocRef, newData);
            onCloseModal()
          } catch (error) {
            console.log(error);
          }
    }

    return (
        <Box
          onSubmit={editExpenseHandler}
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="input-group">
            <TextField
              name="title"          
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              label="Title"
              variant="standard"
            />
          </div>
          <div className="input-group">
            <TextField
              name='date'
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              label="Date"
              variant="standard"
            />
          </div>
          <div className="input-group">
            <TextField
               
              value={newAmount}
              name="amount"
              onChange={(e) => setNewAmount(e.target.value)}
              label="Amount"
              variant="standard"
            />
          </div>
          <div className="input-group">
            <FormControl 
              variant="standard">
              <InputLabel id="user-category">Category</InputLabel>
              <Select
                labelId="user-category"
                id="user-category"
                name="category"
                value={newCategory}
                label="Category"
                onChange={(e) => setNewCategory(e.target.value)}
              >
                <MenuItem value="Health">Health</MenuItem>
                <MenuItem value="Relax">Relax</MenuItem>
                <MenuItem value="Hobbies">Hobbies</MenuItem>
                <MenuItem value="Shopping">Shopping</MenuItem>
                <MenuItem value="Travel">Travel</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="button-group">
            <Button type="submit" variant="contained">
              Save
            </Button>
          </div>
        </Box>
    )
}

export default EditExpense;