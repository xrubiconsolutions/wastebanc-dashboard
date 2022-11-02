import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import AggregatorService from "../../services/aggregatorsService";
import { startLoad, stopLoad } from "../reducers/appSlice";

// for admin
export const filterAggregator = createAsyncThunk(
  "aggregator/get",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth, enabled } = data;
      const res = await AggregatorService.collectorFilter(
        page,
        currentMonth,
        enabled
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

// for admin
export const searchAggregator = createAsyncThunk(
  "aggregator/search",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key, enabled } = data;
      const res = await AggregatorService.collectorSearch(page, key, enabled);

      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

// search for company
export const companySearchAggregator = createAsyncThunk(
  "aggregator/search",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key } = data;
      const res = await AggregatorService.companyCollectorSearch(page, key);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const comapanyCollectorSearch = createAsyncThunk(
  "aggregator/search",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key, enabled } = data;
      const res = await AggregatorService.collectorSearch(page, key, enabled);

      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getCompanyAggregator = createAsyncThunk(
  "companyaggregator/get",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AggregatorService.companyCollectorStats(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const filterCompanyAggregator = createAsyncThunk(
  "companyaggregator/filter",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AggregatorService.companyCollector(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getCompanyPending = createAsyncThunk(
  "pending/get",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page } = data;
      const res = await AggregatorService.companyPending(key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const filterCompanyPending = createAsyncThunk(
  "company pending aggregators/filter",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AggregatorService.companyPending(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const mapAggregator = createAsyncThunk(
  "aggregator_map/get",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AggregatorService.collectorMap(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const approveCompanyCollector = createAsyncThunk(
  "company-aggregator/approve",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AggregatorService.approveCompanyCollector(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const declineCompanyCollector = createAsyncThunk(
  "company-aggregator/decline",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AggregatorService.declineCompanyCollector(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const toggleStatusAggregator = createAsyncThunk(
  "aggregator_map/toggleStatus",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { collectorId, status } = data;
      const res = await AggregatorService.toggleStatusAggregator(
        collectorId,
        status
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const deleteAggregator = createAsyncThunk(
  "admin_aggregator/remove",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { collectorId } = data;
      const res = await AggregatorService.deleteAggregator(collectorId);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
