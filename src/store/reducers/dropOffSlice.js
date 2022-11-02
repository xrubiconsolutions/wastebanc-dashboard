import { createSlice } from "@reduxjs/toolkit";
import {
  currentMonthDropoff,
  getCollectorDropoff,
  getCompanyDropoff,
} from "../actions";

const initialState = {
  currentMonthTotalDropOff: null,
  companyTotalDropOff: null,
  collectorDropOff: null,
};

const dropOffSlice = createSlice({
  name: "dropOffSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [currentMonthDropoff.fulfilled]: (state, { payload }) => {
      state.currentMonthTotalDropOff = payload.data;
    },
    [getCompanyDropoff.fulfilled]: (state, { payload }) => {
      state.companyTotalDropOff = payload.data;
    },
    [getCollectorDropoff.fulfilled]: (state, { payload }) => {
      state.collectorDropOff = payload.data;
    },
  },
});

const { reducer } = dropOffSlice;

export default reducer;
