import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducers/appSlice";
import { handleError } from ".";
import GeoFenceService from "../../services/geoFenceService";

export const getMapGeoFence = createAsyncThunk(
  "map/geoFence",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await GeoFenceService.getGeoFence();
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const companySearchGeoFence = createAsyncThunk(
  "search/geoFence",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await GeoFenceService.searchCompanyTotalDropoff(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const filterGeoFence = createAsyncThunk(
  "filter/geoFence",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await GeoFenceService.filterTotalDropoff(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const createDropOffLocation = createAsyncThunk(
  "geoFence/create-drop-off-location",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await GeoFenceService.createDropOffLocation(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const mapDropOffLocation = createAsyncThunk(
  "geoFence/map-create-drop-off-location",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await GeoFenceService.mapDropOffLocation(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
