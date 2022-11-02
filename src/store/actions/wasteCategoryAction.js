import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoad, stopLoad } from "../reducers/appSlice";
import { handleError } from ".";
import WasteCategoryService from "../../services/wasteCategoryService";

export const getCategory = createAsyncThunk(
  "category/get",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WasteCategoryService.getCategory();
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/add",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WasteCategoryService.createCategory(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const updateCategory = createAsyncThunk(
  "category/update",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const {id, categoryData } = data;
      const res = await WasteCategoryService.updateCategory(id, categoryData);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);


export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await WasteCategoryService.deleteCategory(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
