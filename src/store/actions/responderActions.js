import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import ResponderService from "../../services/responderService";
import { startLoad, stopLoad } from "../reducers/appSlice";

export const getAllResponders = createAsyncThunk(
  "responders/getAll",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await ResponderService.getAllResponders();
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const approveResponder = createAsyncThunk(
  "responders/approve",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await ResponderService.approveResponder(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const declineResponder = createAsyncThunk(
  "responders/decline",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await ResponderService.declineResponder(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const deleteResponders = createAsyncThunk(
  "responders/delete",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await ResponderService.deleteResponders(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
