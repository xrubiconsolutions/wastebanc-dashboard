import { createSlice } from "@reduxjs/toolkit";
import {
  ApprovedPickerCompany,
  getAssignedPickers,
  getBank,
  getCompanyPickerPending,
  getCompanyPickers,
  getCompanyWastePickerStats,
  getPickers,
  getUnassignedPickers,
} from "../actions";

const initialState = {
  pickers: null,
  assignedPickers: null,
  unassignedPickers: null,
  companyWastePickers: null,
  pendingPicker: null,
  approvedPicker: null,
  pickersStats: null,
  allBanks: null,
};

const wastePickerSlice = createSlice({
  name: "wastePickersSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getPickers.fulfilled]: (state, { payload }) => {
      state.pickers = payload.data;
    },
    [getBank.fulfilled]: (state, { payload }) => {
      state.allBanks = payload;
    },
    [getAssignedPickers.fulfilled]: (state, { payload }) => {
      state.assignedPickers = payload.data.collectors;
    },
    [getUnassignedPickers.fulfilled]: (state, { payload }) => {
      state.unassignedPickers = payload.data.collectors;
    },
    [getAssignedPickers.fulfilled]: (state, { payload }) => {
      state.assignedPickers = payload.data.collectors;
    },
    [getUnassignedPickers.fulfilled]: (state, { payload }) => {
      state.unassignedPickers = payload.data.collectors;
    },
    [getCompanyPickerPending.fulfilled]: (state, { payload }) => {
      state.pendingPicker = payload.data.collectors;
    },
    [ApprovedPickerCompany.fulfilled]: (state, { payload }) => {
      state.approvedPicker = payload.data.collectors;
    },
    [getCompanyWastePickerStats.fulfilled]: (state, { payload }) => {
      state.pickersStats = payload.data;
    },
  },
});

const { reducer } = wastePickerSlice;

export default reducer;
