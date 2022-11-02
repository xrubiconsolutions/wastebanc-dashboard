import { createSlice } from "@reduxjs/toolkit";
import { getCompanyWasteStats, getCompanyWaste } from "../actions";

const initialState = {
  companyWaste: null,
  companyWasteStats: null,
};

const companyWasteStatsSlice = createSlice({
  name: "companyWasteStatsSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getCompanyWasteStats.fulfilled]: (state, { payload }) => {
      // console.log("The payload rsult: ", payload.data);
      state.companyWasteStats = payload.data;
    },
    [getCompanyWaste.fulfilled]: (state, { payload }) => {
      state.companyWaste = payload.data;
    },
  },
});

const { reducer } = companyWasteStatsSlice;

export default reducer;
