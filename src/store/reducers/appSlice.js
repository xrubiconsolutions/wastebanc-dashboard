import { createSlice } from "@reduxjs/toolkit";
import { pureReverse } from "../../utils";
import { getAllAdmins } from "../actions";

const initialState = {
  error: "",
  loading: false,
  admins: null,
  pageTitle: "Dashboard",
};

const appReducer = createSlice({
  name: "app",
  initialState,

  reducers: {
    startLoad(state) {
      state.loading = true;
      state.error = null;
    },
    stopLoad(state) {
      state.loading = false;
    },

    setError(state, { payload }) {
      // console.log("The error is: ", payload);
      state.error = payload;
    },

    clearError(state) {
      state.error = "";
    },

    setPage(state, { payload }) {
      state.pageTitle = payload;
      // console.log("The title is: ", payload);
    },
  },
  extraReducers: {
    [getAllAdmins.fulfilled]: (state, { payload }) => {
      state.admins = pureReverse(payload.data);
    },
  },
});

const { reducer, actions } = appReducer;

export const { startLoad, stopLoad, setError, clearError, setPage } = actions;
export default reducer;
