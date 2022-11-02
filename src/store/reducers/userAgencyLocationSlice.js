import { createSlice } from "@reduxjs/toolkit";
import { getUserLocations, updateUserLocations } from "../actions";

const initialState = {
  getAllLocation: null,
  updateLocation: null,
};

const userAgencyLocationSlice = createSlice({
  name: "userAgencyLocationSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserLocations.fulfilled]: (state, { payload }) => {
      state.getAllLocation = payload.data;
    },
    [updateUserLocations.fulfilled]: (state, { payload }) => {
      state.updateLocation = payload.data;
    },
  },
});

const { reducer } = userAgencyLocationSlice;

export default reducer;
