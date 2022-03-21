import { configureStore } from "@reduxjs/toolkit";
import expensesSlice from "./expensesSlice";
import savingsSlice from "./savingsSlice";

export const store = configureStore({
    reducer: {expenses: expensesSlice, savingsData: savingsSlice}
})