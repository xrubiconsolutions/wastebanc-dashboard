import { createSlice } from "@reduxjs/toolkit";
import { estimatedCost, ongoingCost, AccountDetails } from "../actions";

const initialState = {
  estimate: null,
  ongiong: null,
  account: null,
};

const billingSlice = createSlice({
  name: "billingSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [AccountDetails.fulfilled]: (state, { payload }) => {
      state.account = payload.data;
    },
    [estimatedCost.fulfilled]: (state, { payload }) => {
      state.estimate = payload.data;
    },
    [ongoingCost.fulfilled]: (state, { payload }) => {
      state.ongiong = payload.data;
    },
  },
});

const { reducer } = billingSlice;

export default reducer;
