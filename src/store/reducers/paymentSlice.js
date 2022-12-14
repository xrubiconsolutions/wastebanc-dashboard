import { createSlice } from "@reduxjs/toolkit";
import {
  currentMonthDirect,
  currentMonthCharity,
  currentMonthOutstanding,
  companyOutstanding,
  companyCharity,
  companyDirect,
} from "../actions";

const initialState = {
  directPayment: null,
  charityPayment: null,
  outstandingPayment: null,
  companydirectPayment: null,
  companycharityPayment: null,
  companyoutstandingPayment: null,
};

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [currentMonthDirect.fulfilled]: (state, { payload }) => {
      state.directPayment = payload.data;
    },
    [currentMonthCharity.fulfilled]: (state, { payload }) => {
      state.charityPayment = payload.data;
    },
    [currentMonthOutstanding.fulfilled]: (state, { payload }) => {
      state.outstandingPayment = payload.data;
    },
    [companyDirect.fulfilled]: (state, { payload }) => {
      state.companydirectPayment = payload.data;
    },
    [companyCharity.fulfilled]: (state, { payload }) => {
      state.companycharityPayment = payload.data;
    },
    [companyOutstanding.fulfilled]: (state, { payload }) => {
      state.companyoutstandingPayment = payload.data;
    },
  },
});

const { reducer } = dashboardSlice;

export default reducer;
