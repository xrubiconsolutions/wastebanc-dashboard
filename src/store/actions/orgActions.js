import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducers/appSlice";
import OrgService from "../../services/orgService";
import { handleError } from ".";

export const createOrganization = createAsyncThunk(
  "organization/create",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await OrgService.createOrganization(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const getLGA = createAsyncThunk(
  "organization/lga",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await OrgService.getLGA(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const getAllOrganizations = createAsyncThunk(
  "organization/getAll",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await OrgService.getAllOrganizations(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const editCompanyProfile = createAsyncThunk(
  "organization/edit",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await OrgService.editCompanyProfile(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);


export const deleteCompany = createAsyncThunk(
  "organization/delete",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await OrgService.deleteCompany(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);


