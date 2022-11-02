import { createSlice } from "@reduxjs/toolkit";
import { getAllResponders } from "../actions";

const initialState = {
  allResponders: null,
  approvedResponders: null,
  pendingResponders: null,
};

const responderSlice = createSlice({
  name: "responder",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllResponders.fulfilled]: (state, { payload }) => {
      const approved = payload.filter(
        (responder) => responder.status === "APPROVED"
      );
      const pending = payload.filter(
        (responder) => responder.status === "PENDING"
      );
      state.allResponders = payload;
      state.approvedResponders = approved;
      state.pendingResponders = pending;
    },
  },
});

const { reducer } = responderSlice;

export default reducer;
