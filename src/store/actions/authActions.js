import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import AuthService from "../../services/authService";
import { startLoad, stopLoad } from "../reducers/appSlice";

export const fetchAdminProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AuthService.getAdminProfile();
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const editAdminProfile = createAsyncThunk(
  "auth/editProfile",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AuthService.editAdminProfile(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const fetchCompanyProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AuthService.getCompanyProfile();
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "auth/update-user-password",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AuthService.updateUserPassword(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
