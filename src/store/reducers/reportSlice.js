import { createSlice } from "@reduxjs/toolkit";
import { ReportLog } from "../actions";

const initialState = {
  incidentLog: null,
};

const reportSlice = createSlice({
  name: "reportSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [ReportLog.fulfilled]: (state, { payload }) => {
      state.incidentLog = payload.data;
    },
  },
});

const { reducer } = reportSlice;

export default reducer;
