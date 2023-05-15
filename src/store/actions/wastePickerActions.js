import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import WastePickerService from "../../services/wastePickerService";
import { startLoad, stopLoad } from "../reducers/appSlice";

export const getPickers = createAsyncThunk(
  "get/waste-pickers",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WastePickerService.getPickers(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const getAssignedPickers = createAsyncThunk(
  "get/assigned-waste-pickers",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WastePickerService.getPickers({
        isAssigned: true,
        ...data,
      });
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const getPickersWithData = createAsyncThunk(
  "get/filter-or-search-waste-pickers",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WastePickerService.getPickersWithData(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const getUnassignedPickers = createAsyncThunk(
  "get/unassigned-waste-pickers",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WastePickerService.getPickers({
        isAssigned: false,
        ...data,
      });
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const createPicker = createAsyncThunk(
  "create/waste-picker",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WastePickerService.createPicker(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const getBank = createAsyncThunk(
  "waste-picker/getbanks",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WastePickerService.getBanks();
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const validateAccount = createAsyncThunk(
  "waste-picker/validate account",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WastePickerService.validateAccount(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const assignPicker = createAsyncThunk(
  "waste-picker/assign-picker",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WastePickerService.assignPicker(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const unassignPicker = createAsyncThunk(
  "waste-picker/unassign-picker",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WastePickerService.unassignPicker(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const getCompanyPickerPending = createAsyncThunk(
  "pending/picker",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WastePickerService.companyPickerPending(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const ApprovedPickerCompany = createAsyncThunk(
  "approved/picker",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WastePickerService.companyPickerApproved(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const enableCompanyPickerCollector = createAsyncThunk(
  "company-picker/enable",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WastePickerService.enableCompanyPickerCollector(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const disableCompanyPickerCollector = createAsyncThunk(
  "company-picker/disable",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WastePickerService.disableCompanyPickerCollector(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getCompanyWastePickerStats = createAsyncThunk(
  "companywastepicker/get",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WastePickerService.companyWastePickerStats(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
