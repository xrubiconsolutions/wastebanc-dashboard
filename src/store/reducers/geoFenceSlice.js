import { createSlice } from "@reduxjs/toolkit";
import { getMapGeoFence, mapDropOffLocation } from "../actions";

const initialState = {
  mapGeoFence: null,
  mapDropOff: null,
};

const geoFenceSlice = createSlice({
  name: "geoFenceSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getMapGeoFence.fulfilled]: (state, { payload }) => {
      state.mapGeoFence = payload.data;
    },
    [mapDropOffLocation.fulfilled]: (state, { payload }) => {
      state.mapDropOff = payload;
    },
  },
});

const { reducer } = geoFenceSlice;

export default reducer;
