import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducers/appSlice";
import { handleError } from ".";
import BillingService from "../../services/billingService";

export const AccountDetails = createAsyncThunk(
  "account/details",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await BillingService.AccountPaymentDetails();
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const estimatedCost = createAsyncThunk(
  "estimated/cost",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await BillingService.EstimatedCost();
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const ongoingCost = createAsyncThunk(
  "ongoing/cost",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await BillingService.OngoingBiling();
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const billingHistory = createAsyncThunk(
  "billing/history",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { currentMonth } = data;
      const res = await BillingService.BilingHistory(currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const searchBillingHistory = createAsyncThunk(
  "ongoing/cost",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page } = data;
      const res = await BillingService.SearchBilingHistory(key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const filterBillingHistory = createAsyncThunk(
  "ongoing/cost",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { currentMonth, page, key } = data;
      const res = await BillingService.FilterBillingHistory(
        currentMonth,
        page,
        key
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
