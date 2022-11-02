import { createSlice } from "@reduxjs/toolkit";
import { getDropoffLocations, searchDropoffLocations } from "../actions";

const initialState = {
  dropoffLocations: null,
  searchDropoffLocation: null,
};

const dropoffLocationsSlice = createSlice({
  name: "dropoffLocationsSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getDropoffLocations.fulfilled]: (state, { payload }) => {
      state.dropoffLocations = payload.data;
    },
    [searchDropoffLocations.fulfilled]: (state, { payload }) => {
      state.searchDropoffLocation = payload.data;
    },
  },
});

const { reducer } = dropoffLocationsSlice;

export default reducer;
