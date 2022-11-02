import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducers/appSlice";
import { handleError } from ".";
import WasteCollectionService from "../../services/wasteCollectionService";

export const Collector = createAsyncThunk(
  "currentMonth/collector",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WasteCollectionService.getCollector(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const searchWasteCollector = createAsyncThunk(
  "search/collector",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const {searchQuery, page} = data
      const res = await WasteCollectionService.searchCollector(
        searchQuery,
        page
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const filterWasteCollector = createAsyncThunk(
  "filter/wastecollector",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
       const {page, date} = data
      const res = await WasteCollectionService.filterCollector(page, date);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
