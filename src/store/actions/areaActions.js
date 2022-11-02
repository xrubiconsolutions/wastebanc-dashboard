import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import AreaService from "../../services/areaService";
import { startLoad, stopLoad } from "../reducers/appSlice";

export const getManagedArea = createAsyncThunk(
  "area/get",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await AreaService.getManagedArea(page, currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const createManagedArea = createAsyncThunk(
  "area/create",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      // console.log("data", data);
      const res = await AreaService.createManagedArea(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const updateManagedArea = createAsyncThunk(
  "area/update",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { id, formValues } = data;
      const res = await AreaService.updateManagedArea(id, formValues);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const searchManagedArea = createAsyncThunk(
  "area/search",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page, currentMonth } = data;
      const res = await AreaService.searchManagedArea(key, page, currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getAllAreas = createAsyncThunk(
  "area/areas",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page } = data;
      const res = await AreaService.getAllAreas(page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getStateAreas = createAsyncThunk(
  "area/state-areas",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AreaService.getStateAreas(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getSubAreas = createAsyncThunk(
  "area/sub-areas",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AreaService.getSubAreas(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
