import { setError, stopLoad } from "../reducers/appSlice";

export const handleError = (err, dispatch) => {
  // handle non-server based erorrs
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
    localStorage.clear();
  }
  throw err;
};

export {
  createUserAgencies,
  deleteUserAgency,
  getUserAgencies,
  modifyUserAgency,
} from "./agenciesActions";
export { getAllAdmins, uploadFile } from "./appActions";
export {
  editAdminProfile,
  fetchAdminProfile,
  updateUserPassword,
} from "./authActions";
export {
  createLocation,
  deleteLocation,
  getAllLocations,
  getAllWorldLocations,
  modifyLocation,
} from "./locationActions";
export {
  createOrganization,
  deleteCompany,
  editCompanyProfile,
  getAllOrganizations,
  getLGA,
} from "./orgActions";
export {
  approveResponder,
  declineResponder,
  deleteResponders,
  getAllResponders,
} from "./responderActions";

export {
  FilterNewAggregators,
  FilterNewUsers,
  FilterNewWastePickers,
  SearchNewAggregators,
  SearchNewUsers,
  SearchNewWastePickers,
  filterMatrix,
  getCompanyMatrix,
  getCompanyRecentPickups,
  getFilteredCompanyMatrix,
  getFilteredCompanyRecentPickups,
  getFilteredRecentPickups,
  getNewAggregators,
  getNewUsers,
  getRecentPickups,
  getWastePickers,
  getcurrentMonthMatrix,
  searchCompanyPickups,
  searchRecentPickups,
} from "./dashboardAction";
export {
  SearchCollectorDropoff,
  // new
  approvedDropoff,
  currentMonthDropoff,
  deleteCompanyDropoff,
  filterCollectorDropoff,
  filterDropoff,
  getCollectorDropoff,
  getCompanyDropoff,
  searchDropoff,
} from "./dropOffAction";
export {
  createRole,
  deleteRole,
  getClaims,
  getRoles,
  updateRole,
} from "./roleActions";
export {
  currentMonthUser,
  filterUser,
  filterUssdUser,
  insuranceUserDetail,
  insuranceUsers,
  searchUser,
  searchUssdUser,
  serachInsuranceUsers,
  totalUser,
  totalUsersCompletedDropoffSchedule,
  totalUsersCompletedPickupSchedule,
  totalUsersDropoffSearchSchedules,
  totalUsersPickupSearchSchedules,
  totalUssdUsers,
  userAcceptedSchedule,
  userCancelledSchedule,
  userCompletedSchedule,
  userDetail,
  userDropoffRequest,
  userMissedSchedule,
  userPendingSchedule,
  userRenewalHistory,
  userSearCancelledSchedule,
  userSearchAcceptedSchedule,
  userSearchCompletedSchedule,
  userSearchDropoffRequest,
  userSearchMissedSchedule,
  userSearchPendingSchedule,
  usersSearchRenewalHistory,
} from "./userAction";
export {
  createCategory,
  deleteCategory,
  getCategory,
} from "./wasteCategoryAction";

export {
  approvedCompletedSchedues,
  currentMonthAccepted,
  currentMonthCancelled,
  currentMonthCompleted,
  currentMonthMissed,
  currentMonthPending,
  filterAccepted,
  filterCancelled,
  filterCompanyAccepted,
  filterCompanyApprovedCompletedSchedule,
  filterCompanyCancelled,
  filterCompanyCompleted,
  filterCompanyMissed,
  // testing
  filterCompanyRejectedCompletedSchedule,
  filterCompleted,
  filterMissed,
  filterPending,
  getCompanyAcceptedSchedule,
  getCompanyApprovedCompletedSchedule,
  getCompanyCancelledSchedule,
  getCompanyCompletedSchedule,
  getCompanyMissedSchedule,
  getCompanyPendingSchedules,
  getCompanyRejectedCompletedSchedule,
  rejectCompletedSchedules,
  searchAccepted,
  searchCancelled,
  searchCompanyAccepted,
  searchCompanyApprovedCompletedSchedule,
  searchCompanyCancelled,
  searchCompanyCompleted,
  searchCompanyMissed,
  searchCompanyRejectedCompletedSchedule,
  searchCompleted,
  searchMissed,
  searchPending,
} from "./scheduleActions";

export {
  approveCompanyCollector,
  companySearchAggregator,
  declineCompanyCollector,
  deleteAggregator,
  filterAggregator,
  filterCompanyAggregator,
  filterCompanyPending,
  getCompanyAggregator,
  getCompanyPending,
  mapAggregator,
  searchAggregator,
  toggleStatusAggregator,
} from "./aggregatorActions";

export {
  companyCharity,
  companyDirect,
  companyOutstanding,
  currentMonthCharity,
  currentMonthDirect,
  currentMonthOutstanding,
  filterCharity,
  filterCompanyCharity,
  filterCompanyDirect,
  filterCompanyOutstanding,
  filterDirect,
  filterOutstanding,
  filtercompletedPayoutRequest,
  filterfailedPayoutRequest,
  filterpendingPayoutRequest,
  getcompletedPayoutRequest,
  getfailedPayoutRequest,
  getpendingPayoutRequest,
  searchCharity,
  searchCompanyCharity,
  searchCompanyDirect,
  searchCompanyOutstanding,
  searchDirect,
  searchOutstanding,
  searchcompletedPayoutRequest,
  searchfailedPayoutRequest,
  searchpendingPayoutRequest,
} from "./paymentActions";

export {
  createManagedArea,
  getAllAreas,
  getManagedArea,
  getStateAreas,
  getSubAreas,
  searchManagedArea,
  updateManagedArea,
} from "./areaActions";
export {
  Collector,
  filterWasteCollector,
  searchWasteCollector,
} from "./wasteCollectionAction";

export {
  filterAdminWaste,
  getAdminWaste,
  getAdminWasteStats,
  searchAdminWaste,
} from "./adminWasteStatAction";
export {
  filterCompanyWaste,
  getCompanyWaste,
  getCompanyWasteStats,
  searchCompanyWaste,
} from "./companyWasteStatsAction";
export {
  filterdDropoffLocations,
  getDropoffLocations,
  searchDropoffLocations,
} from "./dropoffLocationsAction";
export {
  createDropOffLocation,
  getMapGeoFence,
  mapDropOffLocation,
} from "./geoFenceAction";
export {
  createOrganisation,
  deleteOrganisation,
  disableOrganisation,
  downloadInvoices,
  enableOrganisation,
  filterCompletedDropffSchedules,
  filterCompletedInvoice,
  filterCompletedPickupSchedules,
  filterOutstandingInvoice,
  findOrganisation,
  getAllOrganisations,
  getCompletedInvoice,
  getCompletedPickupSchedules,
  getCompletedSchedules,
  getGeneratedInvoice,
  getOrganisationAggregators,
  getOrganisations,
  getOrganisationsProfile,
  getOutstandingInvoice,
  searchCompletedDropffSchedules,
  searchCompletedInvoice,
  searchCompletedPickupSchedules,
  searchOrganisationAggregators,
  searchOrganisations,
  searchOutstandingInvoice,
  updateOrganisation,
  updateOrganisationCompany,
} from "./organisationActions";
export { getClients, postRaffle, searchClients } from "./raffleAction";
export { ReportLog, filterReportLog, searchReportLog } from "./reportAction";

export {
  getUserLocations,
  updateUserLocations,
} from "./userAgencyLocationAction";

export {
  createResources,
  deleteResources,
  getResources,
  updateResources,
} from "./resourceActions";

export {
  ApprovedPickerCompany,
  assignPicker,
  createPicker,
  disableCompanyPickerCollector,
  enableCompanyPickerCollector,
  getAssignedPickers,
  getBank,
  getCompanyPickerPending,
  getCompanyWastePickerStats,
  getPickers,
  getPickersWithData,
  getUnassignedPickers,
  unassignPicker,
  validateAccount,
} from "./wastePickerActions";

export {
  completeFinancialPayment,
  downloadInvoice,
  fetchFinancialCompleted,
  fetchFinancialOutstandings,
  fetchFinancialSummary,
  fetchTransactionInvoice,
} from "../actions/financialsActions";
export {
  AccountDetails,
  billingHistory,
  estimatedCost,
  filterBillingHistory,
  ongoingCost,
  searchBillingHistory,
} from "./billingActions";

export {
  InsuranceSearchPurchases,
  insurancePurchases,
  payoutCharity,
  payoutSearchCharity,
  payoutpending,
  payoutpendingSearch,
} from "./payoutAction";

export {
  approveRequest,
  companyFilterEvacuationRequest,
  companySearchEvacuationRequest,
  evacuationRequest,
} from "./evacuationAction";
