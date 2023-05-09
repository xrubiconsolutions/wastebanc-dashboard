import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFinancialCompleted,
  fetchFinancialOutstandings,
} from "../actions";

const initialState = {
  completedPayment: null,
  outstandingPayment: null,
};

const financialsSlice = createSlice({
  name: "financials",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFinancialCompleted.fulfilled](state, { payload }) {
      state.completedPayment = payload.data.invoices;
    },
    [fetchFinancialOutstandings.fulfilled](state, { payload }) {
      state.outstandingPayment = payload.data.invoices;
    },
  },
});

const { actions, reducer } = financialsSlice;
export const {} = actions;
export default reducer;
