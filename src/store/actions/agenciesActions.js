import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import AgenciesService from "../../services/agenciesService";
import { startLoad, stopLoad } from "../reducers/appSlice";
import { getRoles } from "./roleActions";

export const getUserAgencies = createAsyncThunk(
  "agencies/get",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AgenciesService.getUserAgencies(data);
      dispatch(getRoles());
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const createUserAgencies = createAsyncThunk(
  "agencies/create",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AgenciesService.createUserAgencies(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const modifyUserAgency = createAsyncThunk(
  "agencies/edit",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { id, payload } = data;
      const res = await AgenciesService.updateUserAgencies(id, payload);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const deleteUserAgency = createAsyncThunk(
  "agencies/delete",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AgenciesService.deleteUserAgencies(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
