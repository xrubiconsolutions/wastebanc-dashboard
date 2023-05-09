import { setError, stopLoad } from "../reducers/appSlice";

export const handleError = (err, dispatch) => {
  // handle non-server based erorrs
  // console.log(err);
  if (!err.response && !err.data)
    dispatch(
      setError("There seems to be an issue currently, please try again")
    );
  else if (!err.response) dispatch(setError(err.data.message));
  // handle server server based errors
  else {
    let msg =
      err.response.data.customMessage ||
      err.response.data.message ||
      err.response.data;
    if (typeof msg === "object")
      msg = msg.reduce((aggr, errObj) => aggr + errObj.msg + ",", "");
    dispatch(setError(msg));
    dispatch(stopLoad());
  }
  if (err.response?.data?.statusCode === 401) {
    // console.log("Now logging out");
    localStorage.clear();
  }
  throw err;
};

export {
  fetchAdminProfile,
  editAdminProfile,
  updateUserPassword,
} from "./authActions";
export {
  createOrganization,
  getAllOrganizations,
  getLGA,
  editCompanyProfile,
  deleteCompany,
} from "./orgActions";
export { getAllAdmins, uploadFile } from "./appActions";
export {
  getAllResponders,
  approveResponder,
  deleteResponders,
  declineResponder,
} from "./responderActions";
export {
  getAllLocations,
  createLocation,
  modifyLocation,
  deleteLocation,
  getAllWorldLocations,
} from "./locationActions";
export {
  getUserAgencies,
  createUserAgencies,
  modifyUserAgency,
  deleteUserAgency,
} from "./agenciesActions";

export {
  getRoles,
  getClaims,
  createRole,
  updateRole,
  deleteRole,
} from "./roleActions";
export {
  getCategory,
  createCategory,
  deleteCategory,
} from "./wasteCategoryAction";
export {
  searchUser,
  filterUser,
  currentMonthUser,
  totalUser,
  totalUssdUsers,
  searchUssdUser,
  filterUssdUser,
} from "./userAction";
export {
  filterMatrix,
  getcurrentMonthMatrix,
  getNewAggregators,
  FilterNewAggregators,
  SearchNewAggregators,
  getNewUsers,
  SearchNewUsers,
  FilterNewUsers,
  getRecentPickups,
  getCompanyMatrix,
  getFilteredCompanyMatrix,
  getCompanyRecentPickups,
  getFilteredRecentPickups,
  getFilteredCompanyRecentPickups,
  searchCompanyPickups,
  searchRecentPickups,
  getWastePickers,
  FilterNewWastePickers,
  SearchNewWastePickers,
} from "./dashboardAction";
export {
  currentMonthDropoff,
  getCompanyDropoff,
  searchDropoff,
  filterDropoff,
  SearchCollectorDropoff,
  filterCollectorDropoff,
  getCollectorDropoff,
  deleteCompanyDropoff,
} from "./dropOffAction";

export {
  currentMonthPending,
  currentMonthAccepted,
  currentMonthCompleted,
  currentMonthCancelled,
  getCompanyPendingSchedules,
  getCompanyAcceptedSchedule,
  getCompanyCancelledSchedule,
  getCompanyCompletedSchedule,
  getCompanyMissedSchedule,
  currentMonthMissed,
  searchPending,
  searchAccepted,
  searchCompleted,
  searchCancelled,
  searchCompanyAccepted,
  searchCompanyCancelled,
  searchCompanyCompleted,
  searchCompanyMissed,
  searchMissed,
  filterMissed,
  filterCancelled,
  filterCompleted,
  filterAccepted,
  filterPending,
  filterCompanyAccepted,
  filterCompanyCancelled,
  filterCompanyCompleted,
  filterCompanyMissed,
} from "./scheduleActions";

export {
  filterAggregator,
  mapAggregator,
  getCompanyAggregator,
  getCompanyPending,
  searchAggregator,
  deleteAggregator,
  toggleStatusAggregator,
  approveCompanyCollector,
  declineCompanyCollector,
  filterCompanyAggregator,
  filterCompanyPending,
  companySearchAggregator,
} from "./aggregatorActions";

export {
  currentMonthDirect,
  currentMonthCharity,
  currentMonthOutstanding,
  companyDirect,
  companyCharity,
  companyOutstanding,
  searchDirect,
  searchCharity,
  searchOutstanding,
  searchCompanyDirect,
  searchCompanyCharity,
  searchCompanyOutstanding,
  filterDirect,
  filterCharity,
  filterOutstanding,
  filterCompanyDirect,
  filterCompanyCharity,
  filterCompanyOutstanding,
  getpendingPayoutRequest,
  getcompletedPayoutRequest,
  searchpendingPayoutRequest,
  filterpendingPayoutRequest,
  searchcompletedPayoutRequest,
  filtercompletedPayoutRequest,
  getfailedPayoutRequest,
  searchfailedPayoutRequest,
  filterfailedPayoutRequest,
} from "./paymentActions";

export {
  getManagedArea,
  createManagedArea,
  updateManagedArea,
  searchManagedArea,
  getAllAreas,
  getStateAreas,
  getSubAreas,
} from "./areaActions";
export {
  filterWasteCollector,
  searchWasteCollector,
  Collector,
} from "./wasteCollectionAction";

export {
  getOrganisationsProfile,
  getOrganisations,
  getAllOrganisations,
  findOrganisation,
  createOrganisation,
  updateOrganisation,
  updateOrganisationCompany,
  searchOrganisations,
  deleteOrganisation,
  getOrganisationAggregators,
  searchOrganisationAggregators,
  getOutstandingInvoice,
  searchOutstandingInvoice,
  filterOutstandingInvoice,
  getCompletedInvoice,
  searchCompletedInvoice,
  filterCompletedInvoice,
  getCompletedSchedules,
  searchCompletedDropffSchedules,
  filterCompletedDropffSchedules,
  getCompletedPickupSchedules,
  searchCompletedPickupSchedules,
  filterCompletedPickupSchedules,
  getGeneratedInvoice,
  downloadInvoices,
  disableOrganisation,
  enableOrganisation,
} from "./organisationActions";
export {
  getCompanyWasteStats,
  getCompanyWaste,
  filterCompanyWaste,
  searchCompanyWaste,
} from "./companyWasteStatsAction";
export {
  getAdminWasteStats,
  searchAdminWaste,
  filterAdminWaste,
  getAdminWaste,
} from "./adminWasteStatAction";
export {
  getMapGeoFence,
  createDropOffLocation,
  mapDropOffLocation,
} from "./geoFenceAction";
export { getClients, postRaffle, searchClients } from "./raffleAction";
export { ReportLog, searchReportLog, filterReportLog } from "./reportAction";
export {
  getDropoffLocations,
  searchDropoffLocations,
  filterdDropoffLocations,
} from "./dropoffLocationsAction";

export {
  getUserLocations,
  updateUserLocations,
} from "./userAgencyLocationAction";

export {
  getResources,
  createResources,
  updateResources,
  deleteResources, // getParticularResources,
} from "./resourceActions";

export {
  createPicker,
  getPickers,
  getBank,
  validateAccount,
  getAssignedPickers,
  getUnassignedPickers,
  getPickersWithData,
  assignPicker,
  unassignPicker,
  ApprovedPickerCompany,
  getCompanyPickerPending,
  disableCompanyPickerCollector,
  enableCompanyPickerCollector,
  getCompanyWastePickerStats,
} from "./wastePickerActions";

export {
  fetchFinancialSummary,
  fetchFinancialCompleted,
  fetchFinancialOutstandings,
  completeFinancialPayment,
  fetchTransactionInvoice,
  downloadInvoice,
} from "../actions/financialsActions";
export {
  estimatedCost,
  ongoingCost,
  billingHistory,
  searchBillingHistory,
  filterBillingHistory,
  AccountDetails,
} from "./billingActions";
