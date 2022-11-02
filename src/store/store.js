import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import appReducer from "./reducers/appSlice";
import orgReducer from "./reducers/organizationSlice";
// import incidentReducer from "./reducers/incidentSlice";
import responderReducer from "./reducers/responderSlice";
import locationReducer from "./reducers/locationSlice";
import agenciesReducer from "./reducers/agenciesSlice";
import roleReducer from "./reducers/roleSlice";
import wasteCategoryReducer from "./reducers/wasteCategorySlice";
import userReducer from "./reducers/userSlice";
import dashboardReducer from "./reducers/dashboardSlice";
import dropOffReducer from "./reducers/dropOffSlice";
import schedulesReducer from "./reducers/schedulesSlice";
import aggregatorReducer from "./reducers/aggregatorSlice";
import paymentReducer from "./reducers/paymentSlice";
import areaReducer from "./reducers/areaSlice";
import wasteCollectionReducer from "./reducers/wasteCollectionSlice";
import organisationReducer from "./reducers/organisationsSlice";
import geoFenceReducer from "./reducers/geoFenceSlice";
import companyWasteReducer from "./reducers/companyWasteStatsSlice";
import adminWasteReducer from "./reducers/adminWastestatSlice";
import raffleReducer from "./reducers/raffleSlice";
import reportReducer from "./reducers/reportSlice";
import userAgencyLocationReducer from "./reducers/userAgencyLocationSlice";
import dropoffLocation from "./reducers/dropoffLocationsSlice";
import wastePickerReducer from "./reducers/wastePickerSlice";
import resourceReducer from "./reducers/resourceSlice";
import financialsReducer from "./reducers/financialSlice";
import billingReducer from "./reducers/billingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    org: orgReducer,
    // incident: incidentReducer,
    responder: responderReducer,
    location: locationReducer,
    agencies: agenciesReducer,
    role: roleReducer,
    wasteCategory: wasteCategoryReducer,
    user: userReducer,
    dashboard: dashboardReducer,
    dropOff: dropOffReducer,
    schedules: schedulesReducer,
    aggregators: aggregatorReducer,
    payments: paymentReducer,
    area: areaReducer,
    collector: wasteCollectionReducer,
    organisation: organisationReducer,
    geoFence: geoFenceReducer,
    companyWaste: companyWasteReducer,
    adminWaste: adminWasteReducer,
    raffle: raffleReducer,
    report: reportReducer,
    resource: resourceReducer,
    dropoffLocation: dropoffLocation,
    userAgencyLocation: userAgencyLocationReducer,
    pickers: wastePickerReducer,
    financials: financialsReducer,
    billing: billingReducer,
  },
});

export default store;
