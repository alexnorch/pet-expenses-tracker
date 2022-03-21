import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    savings: []
}

export const savingsSlice = createSlice({
    name: 'savings',
    initialState,
    reducers: {
        uploadData: (state, action) => {
            state.savings = action.payload
        }
    }
})

export const { uploadData } = savingsSlice.actions;
export default savingsSlice.reducer;