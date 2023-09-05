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

export const userPendingSchedule = createAsyncThunk(
  "pending/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth, id } = data;
      const res = await UserService.userPendingSchedule(page, currentMonth, id);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const userAcceptedSchedule = createAsyncThunk(
  "accepted/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth, id } = data;
      const res = await UserService.userAcceptedSchedule(
        page,
        currentMonth,
        id
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
export const userCancelledSchedule = createAsyncThunk(
  "cancelled/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth, id } = data;
      const res = await UserService.userCancelledSchedule(
        page,
        currentMonth,
        id
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
export const userMissedSchedule = createAsyncThunk(
  "missed/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth, id } = data;
      const res = await UserService.userMissedSchedule(page, currentMonth, id);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const userCompletedSchedule = createAsyncThunk(
  "missed/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth, id } = data;
      const res = await UserService.userCompletedSchedule(
        page,
        currentMonth,
        id
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

export const totalUsersCompletedPickupSchedule = createAsyncThunk(
  "completed-pickup/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth, id } = data;
      const res = await UserService.totalUsersCompletedPickupSchedule(
        page,
        currentMonth,
        id
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

export const totalUsersCompletedDropoffSchedule = createAsyncThunk(
  "completed-dropoff/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth, id } = data;
      const res = await UserService.totalUsersCompletedDropoffSchedule(
        page,
        currentMonth,
        id
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

export const userDropoffRequest = createAsyncThunk(
  "pending/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth, id } = data;
      const res = await UserService.userDropoffRequest(page, currentMonth, id);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const userSearchPendingSchedule = createAsyncThunk(
  "searchpending/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page, id } = data;
      const res = await UserService.userSearchPendingSchedule(key, page, id);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const userSearCancelledSchedule = createAsyncThunk(
  "searchpending/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page, id } = data;
      const res = await UserService.userSearchCancelledSchedule(key, page, id);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const userSearchAcceptedSchedule = createAsyncThunk(
  "searchAccepted/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page, id } = data;
      const res = await UserService.userSearchAcceptedSchedule(key, page, id);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);
export const userSearchCompletedSchedule = createAsyncThunk(
  "searchCompleted/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key, id } = data;
      const res = await UserService.userSearchCompletedSchedule(key, page, id);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const userSearchMissedSchedule = createAsyncThunk(
  "searchCompleted/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key, id } = data;
      const res = await UserService.userSearchMissedSchedule(key, page, id);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const userSearchDropoffRequest = createAsyncThunk(
  "searchCompleted/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key, id } = data;
      const res = await UserService.userSearchDropoffRequest(key, page, id);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const userDetail = createAsyncThunk(
  "user/details",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await UserService.userDetails(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const insuranceUserDetail = createAsyncThunk(
  "user/insurance_details",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await UserService.insuranceUserDetails(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const insuranceUsers = createAsyncThunk(
  "user/details",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await UserService.insuranceUsers(page, currentMonth);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const userRenewalHistory = createAsyncThunk(
  "user/renewal_history",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { userId, currentMonth, page } = data;
      const res = await UserService.userRenewalHistory(
        userId,
        currentMonth,
        page
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const serachInsuranceUsers = createAsyncThunk(
  "user/details",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { key, page } = data;
      const res = await UserService.serachInsuranceUsers(key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const usersSearchRenewalHistory = createAsyncThunk(
  "user/renewal_history_search",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { userId, key, page } = data;
      const res = await UserService.userSearchRenewalHistory(userId, key, page);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const totalUsersPickupSearchSchedules = createAsyncThunk(
  "pickup-searchCompleted/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key, id } = data;
      const res = await UserService.totalUserPickupSearchSchedule(
        key,
        page,
        id
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

export const totalUsersDropoffSearchSchedules = createAsyncThunk(
  "dropoff-searchCompleted/user",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key, id } = data;
      const res = await UserService.totalUserDropoffSearchSchedule(
        key,
        page,
        id
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
