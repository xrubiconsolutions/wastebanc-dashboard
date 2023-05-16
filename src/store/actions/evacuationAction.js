import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import EvacuationService from "../../services/evacuationService";
import { startLoad, stopLoad } from "../reducers/appSlice";

export const evacuationRequest = createAsyncThunk(
  "approved/Evacuation",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { status, page } = data;
      const res = await EvacuationService.evacuationRequests(status, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const adminEvacuationRequest = createAsyncThunk(
  "approved/Evacuation",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { status, page } = data;
      const res = await EvacuationService.adminEvacuationRequests(status, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const companySearchEvacuationRequest = createAsyncThunk(
  "search/Evacuation",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { status, key, page } = data;
      const res = await EvacuationService.companySearchEvacuationRequests(
        status,
        key,
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

export const adminSearchEvacuationRequest = createAsyncThunk(
  "search/Evacuation",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { status, key, page } = data;
      const res = await EvacuationService.adminSearchEvacuationRequests(
        status,
        key,
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

export const companyFilterEvacuationRequest = createAsyncThunk(
  "filter/Evacuation",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { status, currentMonth, page } = data;
      const res = await EvacuationService.companyFilterEvacuationRequests(
        status,
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

export const adminFilterEvacuationRequest = createAsyncThunk(
  "filter/Evacuation",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { status, currentMonth, page } = data;
      const res = await EvacuationService.adminFilterEvacuationRequests(
        status,
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

export const requestActions = createAsyncThunk(
  "request-action/Evacuation",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { status, id } = data;
      const res = await EvacuationService.requestAction(status, id);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const adminRequestActions = createAsyncThunk(
  "request-action/Evacuation",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { status, id } = data;
      const res = await EvacuationService.adminRequestAction(status, id);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
