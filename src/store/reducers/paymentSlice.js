import { createSlice } from "@reduxjs/toolkit";
import {
  currentMonthDirect,
  currentMonthCharity,
  currentMonthOutstanding,
  companyOutstanding,
  companyCharity,
  companyDirect,
  getpendingPayoutRequest,
  getcompletedPayoutRequest,
  getfailedPayoutRequest,
} from "../actions";

const initialState = {
  directPayment: null,
  charityPayment: null,
  outstandingPayment: null,
  companydirectPayment: null,
  companycharityPayment: null,
  companyoutstandingPayment: null,
  totalWithdrawalAmount: 0,
  pendingRequest: null,
  completedRequest: null,
  failedRequest: null,
  // pay: "",
};

const paymentSlice = createSlice({
  name: "paymentSlice",
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
    [getpendingPayoutRequest.fulfilled]: (state, { payload }) => {
      state.pendingRequest = payload.data;
    },
    [getcompletedPayoutRequest.fulfilled]: (state, { payload }) => {
      state.completedRequest = payload.data;
    },
    [getfailedPayoutRequest.fulfilled]: (state, { payload }) => {
      state.failedRequest = payload.data;
    },
  },
});

const { reducer } = paymentSlice;

export default reducer;
