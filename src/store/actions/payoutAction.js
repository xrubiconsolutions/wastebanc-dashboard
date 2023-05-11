import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducers/appSlice";
import { handleError } from ".";
import PayoutService from "../../services/payoutServie";

export const payoutpending = createAsyncThunk(
  "get/pendingpayout",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { currentMonth, id, page, status } = data;
      const res = await PayoutService.payoutPending(
        currentMonth,
        id,
        page,
        status
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

export const payoutpendingSearch = createAsyncThunk(
  "search/pendingpayout",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { id, key, page, status } = data;
      const res = await PayoutService.AllPayoutSearch(id, key, page, status);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const payoutCharity = createAsyncThunk(
  "get/pendingpayout",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { currentMonth, id, page, status } = data;
      const res = await PayoutService.payoutCharity(
        currentMonth,
        id,
        page,
        status
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

export const payoutSearchCharity = createAsyncThunk(
  "search/pendingpayout",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { id, key, page } = data;
      const res = await PayoutService.payoutSearchCharity(id, key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const insurancePurchases = createAsyncThunk(
  "get/insurancepurchases",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { currentMonth } = data;
      const res = await PayoutService.insurancePurchases(currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const InsuranceSearchPurchases = createAsyncThunk(
  "search/insurance",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page } = data;
      const res = await PayoutService.insuranceSearchPurchases(key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
