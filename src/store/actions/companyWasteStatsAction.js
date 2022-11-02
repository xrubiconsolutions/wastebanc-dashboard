import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import CompanyWasteStatsService from "../../services/companyWasteStats";
import { startLoad, stopLoad } from "../reducers/appSlice";

export const getCompanyWasteStats = createAsyncThunk(
  "company_waste_stats/get",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await CompanyWasteStatsService.getCompanyWasteStats(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getCompanyWaste = createAsyncThunk(
  "company_waste/get",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { date } = data;
      const res = await CompanyWasteStatsService.CompanyWasteStats(date);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const filterCompanyWaste = createAsyncThunk(
  "admin_waste/filter",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { date } = data;

      const res = await CompanyWasteStatsService.CompanyWasteStatsFilter(date);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const searchCompanyWaste = createAsyncThunk(
  "admin_waste/search",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { searchQuery, page } = data;
      const res = await CompanyWasteStatsService.CompanyWasteStatsSearch(
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
