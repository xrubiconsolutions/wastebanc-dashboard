import { createSlice } from "@reduxjs/toolkit";
import { Collector } from "../actions";

const initialState = {
  wasteCollection: null,
};

const wasteCollectionSlice = createSlice({
  name: "wasteCollectionSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [Collector.fulfilled]: (state, { payload }) => {
      state.wasteCollection = payload.data;
    },
  },
});

const { reducer } = wasteCollectionSlice;

export default reducer;
