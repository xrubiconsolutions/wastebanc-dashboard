import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import AdminWasteStatsService from "../../services/adminWasteStatsService";
import { startLoad, stopLoad } from "../reducers/appSlice";

export const getAdminWasteStats = createAsyncThunk(
  "admin_waste_stats/get",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AdminWasteStatsService.getAdminWasteStats(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getAdminWaste = createAsyncThunk(
  "admin_waste/get",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await AdminWasteStatsService.AdminWasteStats(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const filterAdminWaste = createAsyncThunk(
  "admin_waste/filter",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await AdminWasteStatsService.AdminWasteStatsFilter(
        currentMonth,
        page
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const searchAdminWaste = createAsyncThunk(
  "admin_waste/search",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { searchQuery, page } = data;
      const res = await AdminWasteStatsService.AdminWasteStatsSearch(
        searchQuery,
        page
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
