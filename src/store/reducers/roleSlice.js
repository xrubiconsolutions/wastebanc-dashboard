import { createSlice } from "@reduxjs/toolkit";
import { getClaims, getRoles } from "../actions";

const initialState = {
  roles: null,
  claims: null,
};

const roleSlice = createSlice({
  name: "roleSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getRoles.fulfilled]: (state, { payload }) => {
      state.roles = payload.data;
    },

    [getClaims.fulfilled]: (state, { payload }) => {
      state.claims = payload.data;
    },
  },
});

const { reducer } = roleSlice;

export default reducer;
