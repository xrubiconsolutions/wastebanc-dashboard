import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import DashboardService from "../../services/dashboardService";
import { startLoad, stopLoad } from "../reducers/appSlice";

/****************************
 *
 * Admin Dashboard Actions
 *
 ****************************/

export const filterMatrix = createAsyncThunk(
  "filter/matrix",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await DashboardService.filterMatrix(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const getcurrentMonthMatrix = createAsyncThunk(
  "currentMonth/matrix",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await DashboardService.currentMonthMarix(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
/****************************
 *
 * Company Dashboard Actions
 *
 ****************************/

export const getCompanyMatrix = createAsyncThunk(
  "Dashboard/Company Metrics",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await DashboardService.companyMatrix(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const getFilteredCompanyMatrix = createAsyncThunk(
  "Dashboard/Company Metrics Filtered",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await DashboardService.companyMatrix(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
/****************************
 *
 *Recent Pickups company &admin Actions
 *
 ****************************/
export const getRecentPickups = createAsyncThunk(
  "recent/pickup",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await DashboardService.RecentPickup(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

// purpose of this duplicate is the prevent caching in the redux store
// while the other recent pickup is cached
export const getFilteredRecentPickups = createAsyncThunk(
  "recent pickup",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await DashboardService.filterRecentPickup(page, currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const searchRecentPickups = createAsyncThunk(
  "pickup/search",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page } = data;
      const res = await DashboardService.recentPickupSearch(key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const getCompanyRecentPickups = createAsyncThunk(
  "recent/company pickup",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await DashboardService.getcompanyRecentPickup(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const getFilteredCompanyRecentPickups = createAsyncThunk(
  "recent/filtered company pickup",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await DashboardService.companyRecentPickup(
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

export const searchCompanyPickups = createAsyncThunk(
  "pickup/searchcompany",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page } = data;
      const res = await DashboardService.companyPickupSearch(key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
/****************************
 *
 *New Users Admin Actions
 *
 ****************************/

export const getNewUsers = createAsyncThunk(
  "new/users",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await DashboardService.NewUsers(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const FilterNewUsers = createAsyncThunk(
  "filter/newusers",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await DashboardService.filterNewUsers(page, currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const SearchNewUsers = createAsyncThunk(
  "search/newusers",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page } = data;
      const res = await DashboardService.NewUsersSearch(key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

/****************************
 *
 *New Aggregators Admin Actions
 *
 ****************************/
export const getNewAggregators = createAsyncThunk(
  "new/aggregators",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await DashboardService.NewAggregators(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const FilterNewAggregators = createAsyncThunk(
  "filter/newaggregators",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await DashboardService.filterNewAggregators(
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

export const SearchNewAggregators = createAsyncThunk(
  "search/newaggregators",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page } = data;
      const res = await DashboardService.NewAggregatorsSearch(key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

/****************************
 *
 *New Waste Pickers Admin Actions
 *
 ****************************/
export const getWastePickers = createAsyncThunk(
  "new/wastepickers",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await DashboardService.NewWastePickers(page, currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const FilterNewWastePickers = createAsyncThunk(
  "filter/newwastepickers",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await DashboardService.NewWastePickers(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const SearchNewWastePickers = createAsyncThunk(
  "search/newaggregators",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await DashboardService.NewWastePickersSearch(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
