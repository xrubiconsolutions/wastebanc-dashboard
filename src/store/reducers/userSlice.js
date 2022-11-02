import { createSlice } from "@reduxjs/toolkit";
import { currentMonthUser, totalUser } from "../actions";

const initialState = {
  filterClient: null,
  searchClient: null,
  currentMonthClient: null,
  allUser: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [totalUser.fulfilled]: (state, { payload }) => {
      state.allUser = payload.data;
    },
    [currentMonthUser.fulfilled]: (state, { payload }) => {
      state.currentMonthClient = payload.data;
    },
  },
});

const { reducer } = userSlice;

export default reducer;
