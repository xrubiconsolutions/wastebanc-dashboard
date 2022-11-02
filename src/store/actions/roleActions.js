import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducers/appSlice";
import { handleError } from ".";
import RoleService from "../../services/roleService";

export const getRoles = createAsyncThunk(
  "roles/get",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await RoleService.getRoles();
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const getClaims = createAsyncThunk(
  "roles/claims",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await RoleService.getClaims(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const createRole = createAsyncThunk(
  "roles/create",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await RoleService.createRole(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const updateRole = createAsyncThunk(
  "roles/update",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await RoleService.updateRole(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const deleteRole = createAsyncThunk(
  "roles/delete",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await RoleService.deleteRole(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
