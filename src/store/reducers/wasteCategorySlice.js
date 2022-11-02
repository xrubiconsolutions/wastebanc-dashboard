import { createSlice } from "@reduxjs/toolkit";
import { getCategory } from "../actions";
// import { getCategory } from "../actions/wasteCategoryAction";

const initialState = {
  category: null,
};

const wasteCategorySlice = createSlice({
  name: "wasteCategorySlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getCategory.fulfilled]: (state, { payload }) => {
      state.category = payload.data;
    },
  },
});

const { reducer } = wasteCategorySlice;

export default reducer;
