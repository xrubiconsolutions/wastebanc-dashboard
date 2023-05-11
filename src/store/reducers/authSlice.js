import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";
import {
  handleError,
  fetchAdminProfile,
  getcurrentMonthMatrix,
  getCompanyMatrix,
} from "../actions";
import { stopLoad, startLoad } from "./appSlice";
import moment from "moment";
///admin

const date = new Date();
const currentMonth = {
  start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
    "YYYY-MM-DD"
  ),
  end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
    "YYYY-MM-DD"
  ),
};

export const loginUser = createAsyncThunk(
  "/login",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AuthService.loginUser(data);
      if (res.token) {
        localStorage.setItem("lasepa_admin_token", res.token);
        await dispatch(getcurrentMonthMatrix(currentMonth));
      }
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

///recyclers|| company
export const loginAdmin = createAsyncThunk(
  "/login",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AuthService.login(data);
      if (res.token) {
        localStorage.setItem("lasepa_admin_token", res.token);
        await dispatch(getCompanyMatrix(currentMonth));
      }

      localStorage.setItem("current_company", JSON.stringify(res));

      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/changePassword",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AuthService.resetPassword(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const createAdmin = createAsyncThunk(
  "auth/createAdmin",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AuthService.createAdmin(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AuthService.changePassword(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "auth/updatePassword",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AuthService.passwordChange(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const validateAdminReset = createAsyncThunk(
  "auth/validateAdminToken",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await AuthService.validateToken(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

const initialState = {
  userInfo: {},
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    checkAuth(state) {
      const data = localStorage.getItem("lasepa_admin_token");
      const userInfo = JSON.parse(localStorage.getItem("current_user"));
      state.userInfo = userInfo;

      if (!data) return;
      state.token = data;
    },

    logout(state) {
      localStorage.clear();
      state.userInfo = {};
      state.token = "";
    },
  },

  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      const { token, ...data } = payload;
      state.token = token;
      state.userInfo = data;

      localStorage.setItem("lasepa_admin_token", token);
      localStorage.setItem("current_user_role", data.roles);
      localStorage.setItem("current_company_role", data.roles);

      localStorage.setItem("current_fullname", data.displayRole);
      localStorage.setItem("current_firstname", data.firstname);
      localStorage.setItem("current_lastname", data.lastname);
      localStorage.setItem("current_companyname", data.companyName);
      // window.location.reload();
    },

    [fetchAdminProfile.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.data;
      localStorage.setItem("current_user", JSON.stringify(payload.data));
    },
    // [loginAdmin.fulfilled]: (state, { payload }) => {
    //   window.location.reload();
    // },
  },
});

const { reducer, actions } = AuthSlice;

export const { checkAuth, logout } = actions;

export default reducer;
