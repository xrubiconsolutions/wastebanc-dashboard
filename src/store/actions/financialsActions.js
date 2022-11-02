import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import FinancialService from "../../services/financialService";
import { startLoad, stopLoad } from "../reducers/appSlice";

export const fetchFinancialSummary = createAsyncThunk(
  "financials/summary",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await FinancialService.getFinancialSummary();
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const fetchFinancialOutstandings = createAsyncThunk(
  "financials/oustandings",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await FinancialService.getOutstandingFinancials(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const fetchFinancialCompleted = createAsyncThunk(
  "financials/completed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await FinancialService.getCompletedFinancials(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const completeFinancialPayment = createAsyncThunk(
  "financials/complete payment",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await FinancialService.completePayment(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const fetchTransactionInvoice = createAsyncThunk(
  "financials/fetch invoice",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await FinancialService.getInvoice(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const downloadInvoice = createAsyncThunk(
  "financials/download invoice",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await FinancialService.downloadInvoice(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
