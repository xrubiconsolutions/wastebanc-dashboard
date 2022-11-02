import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducers/appSlice";
import { handleError } from ".";
import ReportService from "../../services/reportService";

export const ReportLog = createAsyncThunk(
  "get/report",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      // const { page, currentMonth } = data;
      const res = await ReportService.getReport(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const searchReportLog = createAsyncThunk(
  "search/report",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const {searchQuery, page } = data;
      const res = await ReportService.searchReport(
        searchQuery,
        page
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const filterReportLog = createAsyncThunk(
  "filter/report",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await ReportService.getReport(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);




export const findReportLog = createAsyncThunk(
  "filter/find",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await ReportService.getReport(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);