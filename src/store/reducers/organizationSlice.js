import { createSlice } from "@reduxjs/toolkit";
import { pureReverse } from "../../utils";
import { getAllOrganizations, getLGA } from "../actions/";

const initialState = {
  areas: null,
  organizations: null,
};

const organizationSlice = createSlice({
  name: "organizationSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getLGA.fulfilled]: (state, { payload }) => {
      state.areas = payload;
    },
    [getAllOrganizations.fulfilled]: (state, { payload }) => {
      state.organizations = pureReverse(payload);
    },
  },
});

const { reducer } = organizationSlice;
export default reducer;
