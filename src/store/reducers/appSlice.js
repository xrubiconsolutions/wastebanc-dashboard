import { createSlice } from "@reduxjs/toolkit";
import { pureReverse } from "../../utils";
import { getAllAdmins } from "../actions";

const initialState = {
  error: "",
  loading: false,
  admins: null,
  pageTitle: "Dashboard",

  // for payout screen
  payout: [],
  modal: false,
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
      state.error = payload;
    },

    clearError(state) {
      state.error = "";
    },

    setPage(state, { payload }) {
      state.pageTitle = payload;
    },
    setPayout(state, action) {
      state.payout = action.payload;
    },
    setModalOpening(state, action) {
      state.modal = action.payload;
    },
  },
  extraReducers: {
    [getAllAdmins.fulfilled]: (state, { payload }) => {
      state.admins = pureReverse(payload.data);
    },
  },
});

const { reducer, actions } = appReducer;

export const {
  startLoad,
  stopLoad,
  setError,
  clearError,
  setPage,
  setPayout,
  setModalOpening,
} = actions;
export default reducer;
