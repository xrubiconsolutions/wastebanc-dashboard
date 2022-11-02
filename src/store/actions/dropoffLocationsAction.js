import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import DropoffLocationsService from "../../services/dropoffLocationsService";
import { startLoad, stopLoad } from "../reducers/appSlice";

export const getDropoffLocations = createAsyncThunk(
  "dropoffLocations/get",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await DropoffLocationsService.getDropoffLocations(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
export const filterdDropoffLocations = createAsyncThunk(
  "dropoffLocations/get",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await DropoffLocationsService.filterDropoffLocations(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const searchDropoffLocations = createAsyncThunk(
  "dropoffLocations/search",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key } = data;
      const res = await DropoffLocationsService.searchDropoffLocations(
        page,

        key
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
