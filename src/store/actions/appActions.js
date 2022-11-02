import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import AppService from "../../services/appService";
import { startLoad, setError, stopLoad } from "../reducers/appSlice";

export const getAllAdmins = createAsyncThunk(
  "app/getAdmins",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AppService.getAllAdmins();
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const uploadFile = createAsyncThunk(
  "app/upload",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AppService.uploadFile(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
