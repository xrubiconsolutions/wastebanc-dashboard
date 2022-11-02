import { createSlice } from "@reduxjs/toolkit";
import { getClients } from "../actions";

const initialState = {
  allClients: null,
};

const raffleSlice = createSlice({
  name: "raffleSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getClients.fulfilled]: (state, { payload }) => {
      state.allClients = payload.data;
    },
  },
});

const { reducer } = raffleSlice;

export default reducer;
