import { createSlice } from "@reduxjs/toolkit";
import {
  getOrganisationsProfile,
  getOrganisations,
  findOrganisation,
  createOrganisation,
  updateOrganisation,
  deleteOrganisation,
  getOrganisationAggregators,
  searchOrganisations,
  searchOrganisationAggregators,
  getGeneratedInvoice,
} from "../actions";

const initialState = {
  profileOrganisation: null,
  organisations: null,
  selectedOrganisation: null,
  organisation: null,
  updatedOrganisation: null,
  deletedOrganisation: null,
  orgAggregators: null,
  searchOrg: null,
  searchOrgAggr: null,
  generatedInvoice: null,
};

const organisationSlice = createSlice({
  name: "organisationSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getOrganisationsProfile.fulfilled]: (state, { payload }) => {
      state.profileOrganisation = payload.data;
    },
    [getOrganisations.fulfilled]: (state, { payload }) => {
      state.organisations = payload.data;
    },
    [findOrganisation.fulfilled]: (state, { payload }) => {
      state.selectedOrganisation = payload.data;
    },
    [createOrganisation.fulfilled]: (state, { payload }) => {
      state.organisation = payload.data;
    },
    [updateOrganisation.fulfilled]: (state, { payload }) => {
      state.updatedOrganisation = payload.data;
    },
    [deleteOrganisation.fulfilled]: (state, { payload }) => {
      state.deletedOrganisation = payload.data;
    },
    [getOrganisationAggregators.fulfilled]: (state, { payload }) => {
      state.orgAggregators = payload.data;
    },
    [searchOrganisations.fulfilled]: (state, { payload }) => {
      state.searchOrg = payload.data;
    },
    [searchOrganisationAggregators.fulfilled]: (state, { payload }) => {
      state.searchOrgAggr = payload.data;
    },
    [getGeneratedInvoice.fulfilled]: (state, { payload }) => {
      state.generatedInvoice = payload.data;
    },
  },
});

const { reducer } = organisationSlice;
export default reducer;
