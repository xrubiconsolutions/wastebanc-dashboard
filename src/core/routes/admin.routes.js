import ChangePassword from "../../views/ChangePassword/ChangePassword";
import Dashbord from "../../views/Dashbord";
import DropOff from "../../views/DropOff/DropOff";
import DropOffLocation from "../../views/DropOffLocation/DropOffLocation";
import Financials from "../../views/Financials";
import IncidentDetails from "../../views/IncidentDetails/IncidentDetails";
import IncidentLog from "../../views/IncidentLog/IncidentLog";
import Location from "../../views/Location/Location";
import ManageAreas from "../../views/ManageAreas/ManageAreas";
import OutstandingPayment from "../../views/Payment/OutstandingPayment";
import TotalPayment from "../../views/Payment/TotalPayment";
import ProfileDetails from "../../views/ProfileDetails/ProfileDetails";
import Raffle from "../../views/Raffle/Raffle";
import RecyclerWaste from "../../views/RecyclerWaste/RecyclerWaste";
import Resources from "../../views/Resources/Resources";
import Roles from "../../views/Roles/Roles";
import AllAggregators from "../../views/TotalAggregators/AllAggregators";
import TotalAggregators from "../../views/TotalAggregators/TotalAggregators";
import GeneratedInvoices from "../../views/TotalOrganization/GeneratedInvoices";
import InvoiceGenerate from "../../views/TotalOrganization/InvoiceGenerate";
import ModifyOrganization from "../../views/TotalOrganization/ModifyOrganization";
import SetupOrganization from "../../views/TotalOrganization/SetupOrganization";
import TotalCompletedSchedule from "../../views/TotalOrganization/TotalCompletedSchedule";
import TotalOrganization from "../../views/TotalOrganization/TotalOrganization";
import WasteOrganization from "../../views/TotalOrganization/WasteOrganization";
import { InsuranceDetails } from "../../views/TotalUser/Insurance/InsuranceDetails";
import { InsuranceUserDetails } from "../../views/TotalUser/Insurance/InsuranceUserDetails";
import TotalInsuranceUser from "../../views/TotalUser/Insurance/TotalInsuranceUser";
import RenewalHistory from "../../views/TotalUser/Insurance/renewal";
import TotalUser from "../../views/TotalUser/TotalUser";
import UserDetails from "../../views/TotalUser/UserDetails";
import UserDropOff from "../../views/TotalUser/dropoff/UserDropOff";
import BankPayout from "../../views/TotalUser/payout/BankPayout";
import CharityPayout from "../../views/TotalUser/payout/CharityPayout";
import InsurancePurchase from "../../views/TotalUser/payout/InsurancePurchase";
import { PayoutBreakdown } from "../../views/TotalUser/payout/PayoutBreakdown";
import UserPayout from "../../views/TotalUser/payout/UserPayout";
import UserAcceptedSchedule from "../../views/TotalUser/schedules/UserAcceptedSchedule";
import UserCancelledSchedule from "../../views/TotalUser/schedules/UserCancelledSchedule";
import UserCompletedSchedule from "../../views/TotalUser/schedules/UserCompletedSchedule";
import UserMissedSchedule from "../../views/TotalUser/schedules/UserMissedSchedule";
import UserPendingSchedule from "../../views/TotalUser/schedules/UserPendingSchedule";
import TotalWaste from "../../views/TotalWaste/TotalWaste";
import UserAgencies from "../../views/UserAgencies/UserAgencies";
import UserAgency from "../../views/UserAgencies/UserAgency";
import WasteCategory from "../../views/WasteCategory/WasteCategory";
import WastePicker from "../../views/WastePicker/WastePicker";
import WastePickerAssign from "../../views/WastePicker/WastePickerAssign";
import WastePickerProfile from "../../views/WastePicker/WastePickerProfile";
import AcceptedSchedule from "../../views/schedule/AcceptedSchedule";
import CancelledSchedule from "../../views/schedule/CancelledSchedule";
import CompletedSchedule from "../../views/schedule/CompletedSchedule";
import MissedSchedule from "../../views/schedule/MissedSchedule";
import PendingSchedule from "../../views/schedule/PendingSchedule";

const userInfo = JSON.parse(localStorage.getItem("current_user"));
const whiteList = [
  "user_agency",
  "total-schedule/pending_schedule",
  "total-schedule/cancelled_schedule",
  "total-schedule/completed_schedule",
  "total-schedule/missed_schedule",
  "total-schedule/accepted_schedule",
  "total_waste",
  "outstanding_payment",
  "total_payment",
  "profile_details/:id",
];
const accountClaims = userInfo ? userInfo.claims?.claims : [];

const routes = [
  { name: "Dashboard", path: "dashboard", component: Dashbord },
  {
    name: "pending-schedule",
    path: "total-schedule/pending_schedule",
    component: PendingSchedule,
  },

  {
    name: "cancelled_schedule",
    path: "total-schedule/cancelled_schedule",
    component: CancelledSchedule,
  },
  {
    name: "completed-schedule",
    path: "total-schedule/completed_schedule",
    component: CompletedSchedule,
  },
  {
    name: "missed-schedule",
    path: "total-schedule/missed_schedule",
    component: MissedSchedule,
  },
  {
    name: "accepted-schedule",
    path: "total-schedule/accepted_schedule",
    component: AcceptedSchedule,
  },
  {
    name: "total-dropoff",
    path: "total_dropoff",
    component: DropOff,
  },
  {
    name: "total_users",
    path: "total_users",
    component: TotalUser,
  },
  {
    name: "total_users",
    path: "total_users/total_insurance_user",
    component: TotalInsuranceUser,
  },
  {
    name: "user_details",
    path: "user_details/:id",
    component: UserDetails,
  },

  {
    name: "insurance_details",
    path: "insurance_details/:id",
    component: InsuranceDetails,
  },
  {
    name: "total_aggregators",
    path: "total_aggregators",
    component: TotalAggregators,
  },
  {
    name: "total_aggregators_all",
    path: "total_aggregators_all/:id",
    component: AllAggregators,
  },
  {
    name: "total_organizations",
    path: "total_organizations",
    component: TotalOrganization,
  },
  {
    name: "profile_details",
    path: "profile_details/:id",
    component: ProfileDetails,
  },
  {
    name: "incident_details",
    path: "incident_details/:id",
    component: IncidentDetails,
  },
  {
    name: "total_organizations_setup",
    path: "total_organizations_setup",
    component: SetupOrganization,
  },
  {
    name: "total_organizations_modify",
    path: "total_organizations_modify/:id",
    component: ModifyOrganization,
  },
  {
    name: "change_password",
    path: "change_password",
    component: ChangePassword,
  },
  {
    name: "total_organizations_wastePicker",
    path: "total_organizations_wastePicker/:id",
    component: WasteOrganization,
  },
  {
    name: "total_organizations_generated_invoices",
    path: "total_organizations_generated_invoices/:id",
    component: GeneratedInvoices,
  },

  {
    name: "generated_invoice",
    path: "total_organizations_completed_schedules/invoice_details/:id",
    component: InvoiceGenerate,
  },

  {
    name: "total_organizations_completed_schedules",
    path: "total_organizations_completed_schedules/:id",
    component: TotalCompletedSchedule,
  },

  {
    name: "resource",
    path: "resource",
    component: Resources,
  },
  {
    name: "dropoff_locations",
    path: "dropoff_locations",
    component: DropOffLocation,
  },
  {
    name: "manage_areas",
    path: "manage_areas",
    component: ManageAreas,
  },
  {
    name: "recycler_waste",
    path: "recycler_waste",
    component: RecyclerWaste,
  },
  {
    name: "waste_picker",
    path: "waste_picker",
    component: WastePicker,
  },
  {
    name: "waste_picker_profile",
    path: "waste_picker_profile/:id",
    component: WastePickerProfile,
  },
  {
    name: "waste_picker",
    path: "waste_picker_assign/:id",
    component: WastePickerAssign,
  },
  {
    name: "incident_log",
    path: "incident_log",
    component: IncidentLog,
  },
  {
    name: "total_waste",
    path: "total_waste",
    component: TotalWaste,
  },
  {
    name: "waste_category",
    path: "waste_category",
    component: WasteCategory,
  },
  {
    name: "total_payment",
    path: "total_payment",
    component: TotalPayment,
  },
  {
    name: "outstanding_payment",
    path: "outstanding_payment",
    component: OutstandingPayment,
  },
  {
    name: "raffle_draw",
    path: "raffle_draw",
    component: Raffle,
  },
  {
    name: "location",
    path: "location",
    component: Location,
  },
  {
    name: "user_agencies",
    path: "user_agencies",
    component: UserAgencies,
  },
  {
    name: "roles_permission",
    path: "roles_permission",
    component: Roles,
  },
  {
    name: "user_agency",
    path: "user_agency/:id",
    component: UserAgency,
  },
  {
    name: "financials",
    path: "financials",
    component: Financials,
  },

  {
    name: "user_pending_schedule",
    path: "user_pending_schedule/:id",
    component: UserPendingSchedule,
  },

  {
    name: "user_completed_schedule",
    path: "user_completed_schedule/:id",
    component: UserCompletedSchedule,
  },

  {
    name: "user_missed_schedule",
    path: "user_missed_schedule/:id",
    component: UserMissedSchedule,
  },

  {
    name: "user_cancelled_schedule",
    path: "user_cancelled_schedule/:id",
    component: UserCancelledSchedule,
  },

  {
    name: "user_dropoff_request",
    path: "user_dropoff_request/:id",
    component: UserDropOff,
  },

  {
    name: "user_payout_history",
    path: "user_payout_history/:id",
    component: UserPayout,
  },

  {
    name: "user_accepted_schedule",
    path: "user_accepted_schedule/:id",
    component: UserAcceptedSchedule,
  },

  {
    name: "bank_payout",
    path: "bank_payout/:id",
    component: BankPayout,
  },

  {
    name: "charity_payout",
    path: "charity_payout/:id",
    component: CharityPayout,
  },

  {
    name: "insurance_purchase",
    path: "insurance_purchase/:id",
    component: InsurancePurchase,
  },

  {
    name: "renewal_history",
    path: "renewal_history/:id",
    component: RenewalHistory,
  },

  {
    name: "payout_breakdown",
    path: "payout_breakdown/:id",
    component: PayoutBreakdown,
  },
];

/*************************************************
 * user agency isn't included in the accountClaims
 * and is required to be included in the filtered
 * routes, hence the first the condition in the filter
 *************************************************/
const filteredRoutes = routes.filter(
  (route) =>
    whiteList.includes(route.path) ||
    accountClaims?.findIndex(
      (ac) => route.path === ac.claimId.path && ac.read
    ) > -1
);

// export const filterRoutes = (claims) => {
//   return routes
//   routes.filter(
//   //   (route) =>
//   //     whiteList.includes(route.path) ||
//   //     claims?.findIndex((ac) => route.path === ac.claimId.path && ac.read) > -1
//   // );
// };

export const filterRoutes = (claims) => routes;

export default routes;
