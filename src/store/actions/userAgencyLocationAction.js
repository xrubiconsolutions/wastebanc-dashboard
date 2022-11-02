import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducers/appSlice";
import { handleError } from ".";
import UserAgencyLocationService from "../../services/UserAgencyLocationService";
// import UserAgencyLocationService from "../../services/UserAgencyLocationService";

export const getUserLocations = createAsyncThunk(
  "admin lcoation scope/get",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await UserAgencyLocationService.getUserAgencyLocation();
      // console.log(res, "res ----getAllLocation");
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const updateUserLocations = createAsyncThunk(
  "admin location scope/update",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await UserAgencyLocationService.updateUserAgencyLocation(
        data
      );
      console.log(res);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
