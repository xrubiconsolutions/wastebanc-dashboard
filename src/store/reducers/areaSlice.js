import { createSlice } from "@reduxjs/toolkit";
import {
  createManagedArea,
  getManagedArea,
  updateManagedArea,
  searchManagedArea,
  getAllAreas,
} from "../actions";

const initialState = {
  managedArea: null,
  createdArea: null,
  updatedArea: null,
  searchedArea: null,
  allAreas: null,
};

const areaSlice = createSlice({
  name: "areaSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getManagedArea.fulfilled]: (state, { payload }) => {
      state.managedArea = payload.data;
    },
    [createManagedArea.fulfilled]: (state, { payload }) => {
      state.createdArea = payload.data;
    },
    [updateManagedArea.fulfilled]: (state, { payload }) => {
      state.updatedArea = payload.data;
    },
    [searchManagedArea.fulfilled]: (state, { payload }) => {
      state.searchedArea = payload.data;
    },
    [getAllAreas.fulfilled]: (state, { payload }) => {
      state.allAreas = payload.data;
    },
  },
});

const { reducer } = areaSlice;

export default reducer;
