import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducers/appSlice";
import { handleError } from ".";
import ResourceService from "../../services/resourceService";

export const getResources = createAsyncThunk(
  "resource/get",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await ResourceService.getResources();
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const createResources = createAsyncThunk(
  "resource/add",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await ResourceService.createResources(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const updateResources = createAsyncThunk(
  "resource/update",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { resourceId } = data;
      const res = await ResourceService.updateResources(resourceId);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const deleteResources = createAsyncThunk(
  "resource/delete",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await ResourceService.deleteResources(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
