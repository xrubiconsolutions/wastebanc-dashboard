import { createSlice } from "@reduxjs/toolkit";
import {
  getcurrentMonthMatrix,
  getRecentPickups,
  getNewUsers,
  getNewAggregators,
  getCompanyMatrix,
  getCompanyRecentPickups,
} from "../actions";

const initialState = {
  currentMonthCardContent: null,
  recentPickup: null,
  newUsers: null,
  newAggregator: null,
};

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getcurrentMonthMatrix.fulfilled]: (state, { payload }) => {
      state.currentMonthCardContent = payload.data;
    },
    [getCompanyMatrix.fulfilled]: (state, { payload }) => {
      state.currentMonthCardContent = payload.data;
    },
    [getRecentPickups.fulfilled]: (state, { payload }) => {
      state.recentPickup = payload.data;
    },
    [getCompanyRecentPickups.fulfilled]: (state, { payload }) => {
      state.recentPickup = payload.data;
    },
    [getNewUsers.fulfilled]: (state, { payload }) => {
      state.newUsers = payload.data;
    },
    [getNewAggregators.fulfilled]: (state, { payload }) => {
      state.newAggregator = payload.data;
    },
  },
});

const { reducer } = dashboardSlice;

export default reducer;
