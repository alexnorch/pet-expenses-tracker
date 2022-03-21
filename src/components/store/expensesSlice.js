import { createSlice } from "@reduxjs/toolkit";

const currentMonth = new Date().getMonth();

const initialState = {
  expenses: [],
  filteredExpenses: [],
  userMonth: currentMonth,
  userCategory: "all",
};

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.expenses = action.payload;
      state.filteredExpenses = action.payload;
      state.filteredExpenses = [
        ...state.expenses.filter(
          (item) => new Date(item.data.date).getMonth() === currentMonth
        ),
      ];
    },
    setUserMonth: (state, action) => {
      state.userMonth = action.payload;
    },
    setUserCategory: (state, action) => {
      state.userCategory = action.payload;
    },
    filterData: (state, action) => {
      const { payload } = action;

      switch (payload) {
        case "month":
          if (state.userCategory === 'all') {
            state.filteredExpenses = [
              ...state.expenses.filter((item) => {
                const date = new Date(item.data.date).getMonth();
  
                if (date === state.userMonth) {
                  return item;
                }
              }),
            ];
          } else {
            state.filteredExpenses = [
              ...state.expenses.filter((item) => {
                const date = new Date(item.data.date).getMonth();
  
                if (date === state.userMonth && item.data.category === state.userCategory) {
                  return item;
                }
              }),
            ];
          }
          break;
        case "category":
          if (state.userCategory === "all") {
            state.filteredExpenses = [
              ...state.expenses.filter((item) => {
                const date = new Date(item.data.date).getMonth();

                if (currentMonth === date) {
                  return item;
                }
              }),
            ];
          } else {
            state.filteredExpenses = [
              ...state.expenses.filter(
                (item) => item.data.category === state.userCategory
              ),
            ];
          }
          break;
      }
    },
  },
});

export const { updateData, setUserMonth, setUserCategory, filterData } =
  expensesSlice.actions;
export default expensesSlice.reducer;
