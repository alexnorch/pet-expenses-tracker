import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserMonth, setUserCategory, filterData } from "../store/expensesSlice";
import { months, categories } from "../constants";

// Mui components
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// My components
import NewExpense from "./NewExpense";
import Modal from '../ui/Modal'

const ExpensesNavigation = () => {
  const [isModalActive, setIsModalActive] = useState(false)
  
  const userMonth = useSelector(state => state.expenses.userMonth)
  const userCategory = useSelector(state => state.expenses.userCategory)
  const dispatch = useDispatch();

  const userMonthHandler = (value) => {
    dispatch(setUserMonth(value))
    dispatch(filterData('month'))
  }

  const userCategoryHandler = (value) => {
    dispatch(setUserCategory(value))
    dispatch(filterData('category'))
  }

  return (
    <>
      <div className="expenses-navigation">
        <div className="expenses-navigation__filter">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              value={userCategory}
              onChange={(e) => userCategoryHandler(e.target.value)}
              label="Category"
            >
              {categories.map(el => <MenuItem value={el}>{el}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="month">Month</InputLabel>
            <Select
              labelId="month"
              value={userMonth}
              onChange={(e) => userMonthHandler(e.target.value)}
              label="Month"
            >
              {months.map((el, index) => <MenuItem value={index}>{el}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <div className="expenses-navigation__buttons">
          <Button
            onClick={() => setIsModalActive(true)}
            variant="contained">
            Add expense
          </Button>
        </div>
      </div>
        <Modal
          title="Add new expense"
          isShowing={isModalActive}
          toggle={() => setIsModalActive(false)}>
          <NewExpense
            onCloseModal={() => setIsModalActive(false)} />
        </Modal>

    </>
  );
};

export default ExpensesNavigation;
