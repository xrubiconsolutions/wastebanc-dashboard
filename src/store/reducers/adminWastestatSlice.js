import { createSlice } from "@reduxjs/toolkit";
import { getAdminWasteStats, getAdminWaste } from "../actions";

const initialState = {
  adminWasteStats: null,
  adminWaste: null,
};

const adminWasteStatsSlice = createSlice({
  name: "WasteStatsSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getAdminWasteStats.fulfilled]: (state, { payload }) => {
      state.adminWasteStats = payload.data;
    },
    [getAdminWaste.fulfilled]: (state, { payload }) => {
      state.adminWaste = payload.data;
    },
  },
});

const { reducer } = adminWasteStatsSlice;

export default reducer;
