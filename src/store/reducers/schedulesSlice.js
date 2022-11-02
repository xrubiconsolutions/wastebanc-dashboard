import { createSlice } from "@reduxjs/toolkit";
import {
  currentMonthPending,
  currentMonthAccepted,
  currentMonthCompleted,
  currentMonthCancelled,
  currentMonthMissed,
  getCompanyPendingSchedules,
} from "../actions";

const initialState = {
  currentMonthPendingSchedule: null,
  currentMonthAcceptedSchedule: null,
  currentMonthCompletedSchedule: null,
  currentMonthCancelledSchedule: null,
  currentMonthMissedSchedule: null,
};

const schedulesSlice = createSlice({
  name: "schedulesSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [currentMonthPending.fulfilled]: (state, { payload }) => {
      state.currentMonthPendingSchedule = payload.data;
    },
    [getCompanyPendingSchedules.fulfilled]: (state, { payload }) => {
      state.currentMonthPendingSchedule = payload.data;
    },
    [currentMonthAccepted.fulfilled]: (state, { payload }) => {
      state.currentMonthAcceptedSchedule = payload.data;
    },
    [currentMonthCompleted.fulfilled]: (state, { payload }) => {
      state.currentMonthCompletedSchedule = payload.data;
    },
    [currentMonthCancelled.fulfilled]: (state, { payload }) => {
      state.currentMonthCancelledSchedule = payload.data;
    },
    [currentMonthMissed.fulfilled]: (state, { payload }) => {
      state.currentMonthMissedSchedule = payload.data;
    },
  },
});

const { reducer } = schedulesSlice;

export default reducer;
