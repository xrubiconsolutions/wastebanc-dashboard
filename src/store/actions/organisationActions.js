import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from ".";
import OrganisationService from "../../services/organisationService";
import { startLoad, stopLoad } from "../reducers/appSlice";

export const getOrganisationsProfile = createAsyncThunk(
  "organisations_profile/get",
  async (_, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await OrganisationService.getOrganisationProfile();
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
export const getOrganisations = createAsyncThunk(
  "organisations/get",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, currentMonth } = data;
      const res = await OrganisationService.getOrganisations(
        page,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
export const getAllOrganisations = createAsyncThunk(
  "organisations/get all",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await OrganisationService.getAllOrganisations({
        allowPickers: true,
        ...data,
      });
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const searchOrganisations = createAsyncThunk(
  "organisations/search",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, key } = data;
      const res = await OrganisationService.searchOrganisations(page, key);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const createOrganisation = createAsyncThunk(
  "organisations/create",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await OrganisationService.createOrganisation(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const updateOrganisation = createAsyncThunk(
  "organisations/update",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { id, orgFormData } = data;
      const res = await OrganisationService.updateOrganisation(id, orgFormData);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const updateOrganisationCompany = createAsyncThunk(
  "organisationscompany/update",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { orgFormData } = data;
      const res = await OrganisationService.updateOrganisationCompany(
        orgFormData
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const findOrganisation = createAsyncThunk(
  "organisations/find",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await OrganisationService.findOrganisation(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const deleteOrganisation = createAsyncThunk(
  "organisation/delete",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await OrganisationService.deleteOrganisation(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getOrganisationAggregators = createAsyncThunk(
  "organisation/aggregators",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, id, currentMonth } = data;
      const res = await OrganisationService.getOrganisationAggregators(
        page,
        id,
        currentMonth
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const searchOrganisationAggregators = createAsyncThunk(
  "organisations/aggregators/search",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { page, id, key } = data;
      const res = await OrganisationService.searchOrganisationAggregators(
        page,
        id,
        key
      );
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getOutstandingInvoice = createAsyncThunk(
  "generated/invoice",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { id, currentMonth, page } = data;
      const res = await OrganisationService.getOutstandingInvoice(
        id,
        currentMonth,
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

export const getGeneratedInvoice = createAsyncThunk(
  "generated/invoice",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      // const { id, currentMonth, page } = data;
      const res = await OrganisationService.getGeneratedInvoice(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const getCompletedInvoice = createAsyncThunk(
  "generated/invoice",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { id, currentMonth, page } = data;
      const res = await OrganisationService.getCompletedInvoice(
        id,
        currentMonth,
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

export const getCompletedSchedules = createAsyncThunk(
  "generated/invoice",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { id, currentMonth } = data;
      const res = await OrganisationService.getCompletedSchedules(
        id,
        currentMonth
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

export const getCompletedPickupSchedules = createAsyncThunk(
  "completed/pickup",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { id, currentMonth } = data;
      const res = await OrganisationService.getCompletedPickupSchedules(
        id,
        currentMonth
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

export const searchCompletedPickupSchedules = createAsyncThunk(
  "completed/pickup",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { id, key, page } = data;
      const res = await OrganisationService.searchCompletedPickupSchedules(
        id,
        key,
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

export const searchCompletedDropffSchedules = createAsyncThunk(
  "completed/search",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { id, key, page } = data;
      const res = await OrganisationService.searchCompletedDropOffSchedules(
        id,
        key,
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

export const filterCompletedDropffSchedules = createAsyncThunk(
  "completed/filter",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { id, currentMonth, page } = data;
      const res = await OrganisationService.filterCompletedDropOffSchedules(
        id,
        currentMonth,
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

export const filterCompletedPickupSchedules = createAsyncThunk(
  "completed/pickup",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { id, currentMonth, page } = data;
      const res = await OrganisationService.filterCompletedPickupSchedules(
        id,
        currentMonth,
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

export const searchOutstandingInvoice = createAsyncThunk(
  "generated/search",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { id, key, page, currentMonth } = data;
      const res = await OrganisationService.searchOutstandingInvoice(
        id,
        key,
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

export const searchCompletedInvoice = createAsyncThunk(
  "generated/search",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { id, currentMonth, key, page } = data;
      const res = await OrganisationService.searchCompletedInvoice(
        id,
        key,
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

export const filterOutstandingInvoice = createAsyncThunk(
  "generated/filter_outstanding",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { currentMonth, page, id } = data;
      const res = await OrganisationService.filterOutstandingInvoice(
        currentMonth,
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

export const filterCompletedInvoice = createAsyncThunk(
  "generated/filter_completed",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const { currentMonth, page, id } = data;
      const res = await OrganisationService.filterCompletedInvoice(
        currentMonth,
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

export const downloadInvoices = createAsyncThunk(
  "download/filter",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      // const { invoiceNumber } = data;
      const res = await OrganisationService.downloadInvoice(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      // stop loading eventually
      dispatch(stopLoad());
    }
  }
);

export const disableOrganisation = createAsyncThunk(
  "organisation/disable",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await OrganisationService.disableOrganisation(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);

export const enableOrganisation = createAsyncThunk(
  "organisation/enable",
  async (data, { dispatch }) => {
    dispatch(startLoad());
    try {
      const res = await OrganisationService.enableOrganisation(data);
      return res;
    } catch (err) {
      handleError(err, dispatch);
    } finally {
      dispatch(stopLoad());
    }
  }
);
