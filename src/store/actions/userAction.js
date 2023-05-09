import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducers/appSlice";
import { handleError } from ".";
import UserService from "../../services/userService";

export const totalUser = createAsyncThunk(
  "get/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await UserService.totalUser(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const searchUser = createAsyncThunk(
  "search/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key } = data;
      const res = await UserService.searchUser(page, key);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const filterUser = createAsyncThunk(
  "filter/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await UserService.filterUser(page, currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const currentMonthUser = createAsyncThunk(
  "currentMonth/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await UserService.currentMonthUser(page, currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const totalUssdUsers = createAsyncThunk(
  "ussd/users",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { currentMonth, page } = data;
      const res = await UserService.getTottalUssdUSers(currentMonth, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const searchUssdUser = createAsyncThunk(
  "search/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key } = data;
      const res = await UserService.searchUssdUsers(key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const filterUssdUser = createAsyncThunk(
  "filterussd/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await UserService.filterUssdUser(page, currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
