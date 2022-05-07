import { categories } from "../constants";
import { addDoc } from "firebase/firestore";
import { db } from "../../util/firebase-config";
import { collection } from "firebase/firestore";
import * as Yup from 'yup'
import { useFormik } from 'formik'

// Mui components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from '@mui/material/FormHelperText';

const NewExpense = ({onCloseModal}) => {
  const expensesCollection = collection(db, "expenses");

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: { title: '', amount: '', category: '', date: '' },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(6, 'Must be greater then 6 characters')
        .required('Title is required'),
      amount: Yup.number()
        .required('Amount is required')
        .positive('Must be a positive number'),
      category: Yup.string()
        .required('Category is required'),
      date: Yup.string()
        .required('Date is required')
    }),
    onSubmit: async (values) => {
      await addDoc(expensesCollection, values);
      onCloseModal()
    }
  })

  return (
    <div className="new-expense">
        <Box
          component="form"
          sx={{"& > :not(style)": { m: 1 },}}
          noValidate
          autoComplete="off"
        >
          <div className="input-group">
            <TextField
              error={Boolean(errors.title)}
              name="title"
              helperText={errors.title}
              value={values.title}
              onChange={handleChange}
              label="Title"
              variant="standard"
            />
          </div>
          <div className="input-group">
            <TextField
              error={Boolean(errors.amount)}
              helperText={errors.amount}
              value={userValue.amount}
              name="amount"
              onChange={handleChange}
              label="Amount"
              variant="standard"
            />
          </div>
          <div className="input-group">
            <FormControl 
              variant="standard" 
              error={Boolean(errors.category)}>
              <InputLabel id="user-category">Category</InputLabel>
              <Select
                labelId="user-category"
                id="user-category"
                name="category"
                value={values.category}
                label="Category"
                onChange={handleChange}>
                  {categories.map(el => {
                    if (el === 'All') return
                    return <MenuItem value={el}>{el}</MenuItem>
                  })}
              </Select>
              <FormHelperText>{hasErrors.category}</FormHelperText>
            </FormControl>
          </div>
          <div className="input-group">
            <TextField
              error={Boolean(errors.date)}
              helperText={errors.date}
              name='date'
              type='date'
              value={values.date}
              onChange={handleChange}
              variant="outlined"
            />
          </div>
          <div className="button-group">
            <Button type="submit" onClick={handleSubmit} variant="contained">Add </Button>
          </div>
        </Box>
      </div>
  );
};

export default NewExpense;
