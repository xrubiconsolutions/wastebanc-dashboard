import { createSlice } from "@reduxjs/toolkit";
import {
  createLocation,
  getAllLocations,
  modifyLocation,
  deleteLocation,
  getAllWorldLocations,
} from "../actions";

const initialState = {
  locations: null,
  location: null,
  modifiedLocation: null,
  deletedLocation: null,
  worldLocations: null,
};

const locationSlice = createSlice({
  name: "locationSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllLocations.fulfilled]: (state, { payload }) => {
      state.locations = payload.data;
    },
    [createLocation.fulfilled]: (state, { payload }) => {
      state.location = payload.data;
    },
    [modifyLocation.fulfilled]: (state, { payload }) => {
      state.modifiedLocation = payload.data;
    },
    [deleteLocation.fulfilled]: (state, { payload }) => {
      state.deletedLocation = payload.data;
    },
    [getAllWorldLocations.fulfilled]: (state, { payload }) => {
      state.worldLocations = payload.data;
    },
  },
});

const { reducer } = locationSlice;

export default reducer;
