import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducers/appSlice";
import { handleError } from ".";
import RaffleService from "../../services/raffleService";

export const getClients = createAsyncThunk(
  "clients/get",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page } = data;
      const res = await RaffleService.getAllClients(page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const searchClients = createAsyncThunk(
  "clients/search",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { searchQuery } = data;
      const res = await RaffleService.searchAllClients(searchQuery);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const postRaffle = createAsyncThunk(
  "roles/create",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await RaffleService.postRaffle(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
