import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducers/appSlice";
import { handleError } from ".";
import DropOffService from "../../services/dropOffService";

export const currentMonthDropoff = createAsyncThunk(
  "currentMonth/dropoff",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await DropOffService.getTotalDropoff(page, currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const getCompanyDropoff = createAsyncThunk(
  "get/companyDropoff",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { currentMonth, page } = data;
      const res = await DropOffService.getCompanyTotalDropoff(
        currentMonth,
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
export const getCollectorDropoff = createAsyncThunk(
  "get/collectorDropoff",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await DropOffService.getCollectorTotalDropoff(
        page,
        currentMonth
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
export const filterCollectorDropoff = createAsyncThunk(
  "filter/collectorDropoff",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await DropOffService.filterCollectorTotalDropoff(
        page,
        currentMonth
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
export const SearchCollectorDropoff = createAsyncThunk(
  "get/collectorDropoff",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key } = data;
      const res = await DropOffService.SearchCollectorTotalDropoff(page, key);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const filterCompanyDropoff = createAsyncThunk(
  "filter/companyDropoff",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { currentMonth, page } = data;
      const res = await DropOffService.getCompanyTotalDropoff(
        currentMonth,
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
export const companySearchDropoff = createAsyncThunk(
  "search/companydropoff",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page } = data;
      const res = await DropOffService.searchCompanyTotalDropoff(key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const searchDropoff = createAsyncThunk(
  "search/dropoff",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page } = data;
      const res = await DropOffService.searchTotalDropoff(key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const filterDropoff = createAsyncThunk(
  "filter/dropoff",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await DropOffService.filterTotalDropoff(page, currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const deleteCompanyDropoff = createAsyncThunk(
  "Companydropoff/delete",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await DropOffService.deleteDropoff(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const approvedDropoff = createAsyncThunk(
  "approve/completed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await DropOffService.approveDropOff(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
