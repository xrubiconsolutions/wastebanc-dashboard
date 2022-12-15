import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import PaymentService from "../../services/paymentService";
import { startLoad, stopLoad } from "../reducers/appSlice";

export const currentMonthOutstanding = createAsyncThunk(
  "currentMonth/outstanding",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await PaymentService.OutstandingPayment(page, currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
export const companyOutstanding = createAsyncThunk(
  "companycurrentMonth/outstanding",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { date } = data;
      const res = await PaymentService.CollectorOutstandingPayment(date);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
export const currentMonthCharity = createAsyncThunk(
  "currentMonth/charity",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { date } = data;
      const res = await PaymentService.CharityPayment(date);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
export const companyCharity = createAsyncThunk(
  "company/charity",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { date } = data;
      const res = await PaymentService.CollectorCharityPayment(date);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
export const currentMonthDirect = createAsyncThunk(
  "currentMonth/direct",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { date } = data;
      const res = await PaymentService.DirectPayment(date);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
export const companyDirect = createAsyncThunk(
  "company/direct",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { date } = data;
      const res = await PaymentService.CollectorDirectPayment(date);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

/****************************
 *
 * filter Actions
 *
 ****************************/
export const filterDirect = createAsyncThunk(
  "filter/direct",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await PaymentService.filterDirectPayment(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const filterCompanyDirect = createAsyncThunk(
  "filter/companydirect",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await PaymentService.CollectorDirectPayment(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const filterCharity = createAsyncThunk(
  "filter/charity",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await PaymentService.filterCharityPayment(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const filterCompanyCharity = createAsyncThunk(
  "filter/companycharity",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await PaymentService.CollectorCharityPayment(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const filterOutstanding = createAsyncThunk(
  "filter/outstanding",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await PaymentService.filterOutstandingPayment(
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
export const filterCompanyOutstanding = createAsyncThunk(
  "filter/outstanding",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { date } = data;
      const res = await PaymentService.CollectorOutstandingPayment(date);
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
 * search Actions
 *
 ****************************/
export const searchDirect = createAsyncThunk(
  "search/direct",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { searchQuery, page } = data;
      const res = await PaymentService.searchDirectPayment(searchQuery, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const searchCompanyDirect = createAsyncThunk(
  "search/direct",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { searchQuery, page } = data;
      const res = await PaymentService.searchCompanyDirectPayment(
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
export const searchCharity = createAsyncThunk(
  "search/charity",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { searchQuery, page } = data;
      const res = await PaymentService.searchCharityPayment(searchQuery, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const searchCompanyCharity = createAsyncThunk(
  "search/charity",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { searchQuery, page } = data;
      const res = await PaymentService.searchCompanyCharityPayment(
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

export const searchOutstanding = createAsyncThunk(
  "search/outstanding",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { searchQuery, page } = data;
      const res = await PaymentService.searchOutstandingPayment(
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

export const searchCompanyOutstanding = createAsyncThunk(
  "search/outstanding",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { searchQuery } = data;
      const res = await PaymentService.searchCompanyOutstandingPayment({
        searchQuery,
      });
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const getpendingPayoutRequest = createAsyncThunk(
  "get/pending-payout-request",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await PaymentService.getPendingPayoutRequest(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const searchpendingPayoutRequest = createAsyncThunk(
  "search/pending-payout-request",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await PaymentService.searchPendingPayoutRequest(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
export const filterpendingPayoutRequest = createAsyncThunk(
  "filter/pending-payout-request",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await PaymentService.filterPendingPayoutRequest(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getcompletedPayoutRequest = createAsyncThunk(
  "get/completed-payout-request",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await PaymentService.getCompletedPayoutRequest(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const searchcompletedPayoutRequest = createAsyncThunk(
  "search/pending-payout-request",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await PaymentService.searchCompletedPayoutRequest(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const filtercompletedPayoutRequest = createAsyncThunk(
  "search/pending-payout-request",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await PaymentService.filterCompletedPayoutRequest(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getfailedPayoutRequest = createAsyncThunk(
  "get/failed-payout-request",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await PaymentService.getFailedPayoutRequest(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const searchfailedPayoutRequest = createAsyncThunk(
  "search/completed-payout-request",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await PaymentService.searchFailedPayoutRequest(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const filterfailedPayoutRequest = createAsyncThunk(
  "search/failed-payout-request",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await PaymentService.filterFailedPayoutRequest(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
