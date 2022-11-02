import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import LocationService from "../../services/locationService";
import { startLoad, stopLoad } from "../reducers/appSlice";
import { fetchAdminProfile } from "./authActions";

export const getAllLocations = createAsyncThunk(
  "location/get",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await LocationService.getLocations();
      dispatch(getAllWorldLocations());
      dispatch(fetchAdminProfile());
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const createLocation = createAsyncThunk(
  "location/create",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await LocationService.createLocation(data);
      dispatch(getAllLocations());
      dispatch(getAllWorldLocations());
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const modifyLocation = createAsyncThunk(
  "location/edit",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { id, formValues } = data;
      const res = await LocationService.modifyLocation(id, formValues);
      dispatch(getAllLocations());
      dispatch(getAllWorldLocations());
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const deleteLocation = createAsyncThunk(
  "location/delete",
  async (id, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await LocationService.deleteLocation(id);
      dispatch(getAllLocations());
      dispatch(getAllWorldLocations());
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getAllWorldLocations = createAsyncThunk(
  "location/world/get",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await LocationService.getWorldLocations();
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
