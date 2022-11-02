import { createSlice } from "@reduxjs/toolkit";
import { getResources } from "../actions";

const initialState = {
  allResources: null,
};

const resourceSlice = createSlice({
  name: "wasteCategorySlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getResources.fulfilled]: (state, { payload }) => {
      state.allResources = payload.data;
    },
  },
});

const { reducer } = resourceSlice;

export default reducer;
