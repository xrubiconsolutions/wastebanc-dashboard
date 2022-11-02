import { createSlice } from "@reduxjs/toolkit";
import {
  getUserAgencies,
  createUserAgencies,
  modifyUserAgency,
  deleteUserAgency,
} from "../actions";

const initialState = {
  agencies: null,
  agency: null,
  updatedAgency: null,
  deletedAgency: null,
};

const agenciesSlice = createSlice({
  name: "agenciesSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserAgencies.fulfilled]: (state, { payload }) => {
      state.agencies = payload.data;
    },
    [createUserAgencies.fulfilled]: (state, { payload }) => {
      state.agency = payload.data;
    },
    [modifyUserAgency.fulfilled]: (state, { payload }) => {
      state.updatedAgency = payload.data;
    },
    [deleteUserAgency.fulfilled]: (state, { payload }) => {
      state.deletedAgency = payload.data;
    },
  },
});

const { reducer } = agenciesSlice;

export default reducer;
