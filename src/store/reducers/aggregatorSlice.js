import { createSlice } from "@reduxjs/toolkit";
import {
  filterAggregator,
  searchAggregator,
  mapAggregator,
  getCompanyAggregator,
  getCompanyPending,
  toggleStatusAggregator,
} from "../actions";

const initialState = {
  aggregators: null,
  aggregatorsMap: null,
  companyAggregator: null,
  companyPending: null,
  toggleStatus: null,
  searchAggre: null,
};

const aggregatorSlice = createSlice({
  name: "aggregatorSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [filterAggregator.fulfilled]: (state, { payload }) => {
      state.aggregators = payload.data;
    },
    [searchAggregator.fulfilled]: (state, { payload }) => {
      state.searchAggre = payload.data;
    },
    [mapAggregator.fulfilled]: (state, { payload }) => {
      state.aggregatorsMap = payload.data;
    },
    [getCompanyAggregator.fulfilled]: (state, { payload }) => {
      state.companyAggregator = payload.data;
    },
    [getCompanyPending.fulfilled]: (state, { payload }) => {
      state.companyPending = payload.data;
    },
    [toggleStatusAggregator.fulfilled]: (state, { payload }) => {
      state.toggleStatus = payload.data;
    },
  },
});

const { reducer } = aggregatorSlice;

export default reducer;
