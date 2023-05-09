import Dashboard from "../../companyViews/Dashboard";
import CancelledSchedule from "../../companyViews/schedule/CancelledSchedule";
import CompletedSchedule from "../../companyViews/schedule/CompletedSchedule";
import MissedSchedule from "../../companyViews/schedule/MissedSchedule";
import PendingSchedule from "../../companyViews/schedule/PendingSchedule";
import AcceptedSchedule from "../../companyViews/schedule/AcceptedSchedule";
import DropOff from "../../companyViews/DropOff/DropOff";
import TotalAggregators from "../../companyViews//TotalAggregators/TotalAggregators";
import ManageDropOff from "../../companyViews/ManageDropOff/ManageDropOff";
import GeoFencing from "../../companyViews/GeoFencing/GeoFencing";
import TotalWaste from "../../companyViews/TotalWaste/TotalWaste";
import OutstandingPayment from "../../companyViews/Payment/OutstandingPayment";
import TotalPayment from "../../companyViews/Payment/TotalPayment";
import ModifyOrganization from "../../companyViews/TotalOrganization/ModifyOrganization";
import ChangePassword from "../../companyViews/ChangePassword/ChangePassword";
import WastePickerAssign from "../../companyViews/WastePicker/WastePickerAssign";
import WastePicker from "../../companyViews/WastePicker/WastePicker";
import Billing from "../../companyViews/Billing/Billing";
import { PayoutRequest } from "../../companyViews/UserPayment/Payment";
import { CompletedPayoutPayment } from "../../companyViews/UserPayment/CompletedPayoutPayment";
import { PendingPayoutPayment } from "../../companyViews/UserPayment/PendingPayoutPayment";
import { FailedPayoutPayment } from "../../companyViews/UserPayment/FailedPayoutPayment";
import EvacuationRequest from "../../companyViews/Evacuation/EvacuationRequest";
import EvacuationBreakdown from "../../companyViews/Evacuation/Breakdown/IncomingBreakdown";
import ApprovalBreakdown from "../../companyViews/Evacuation/Breakdown/ApprovalBreakdown";
import ApprovedBreakdown from "../../companyViews/Evacuation/Breakdown/ApproveBreakdown";
import RejectedBreakdown from "../../companyViews/Evacuation/Breakdown/RejectedBreakdown";

const routes = [
  { name: "dashboard", path: "dashboard", component: Dashboard },
  {
    name: "pending-schedule",
    path: "total-schedule/pending_schedule",
    component: PendingSchedule,
  },
  {
    name: "accepted-schedule",
    path: "total-schedule/accepted_schedule",
    component: AcceptedSchedule,
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
    name: "total_waste",
    path: "total_waste",
    component: TotalWaste,
  },
  {
    name: "outstanding_payment",
    path: "outstanding_payment",
    component: OutstandingPayment,
  },
  {
    name: "total_payment",
    path: "total_payment",
    component: TotalPayment,
  },
  {
    name: "total-dropoff",
    path: "total_dropoff",
    component: DropOff,
  },
  {
    name: "total_agents",
    path: "total_agents",
    component: TotalAggregators,
  },
  {
    name: "total_organizations_modify",
    path: "total_organizations_modify",
    component: ModifyOrganization,
  },
  {
    name: "change_password",
    path: "change_password",
    component: ChangePassword,
  },
  {
    name: "manage_drop_off",
    path: "manage_drop_off",
    component: ManageDropOff,
  },
  {
    name: "geo_fencing",
    path: "geo_fencing",
    component: GeoFencing,
  },
  {
    name: "waste_picker",
    path: "waste_picker",
    component: WastePicker,
  },
  {
    name: "waste_picker",
    path: "waste_picker_assign",
    component: WastePickerAssign,
  },
  {
    name: "billing",
    path: "billing",
    component: Billing,
  },

  {
    name: "evacuation",
    path: "evacuation",
    component: EvacuationRequest,
  },

  {
    name: "breakdown_request",
    path: "breakdown_request/:id",
    component: EvacuationBreakdown,
  },
  {
    name: "approval_breakdown_request",
    path: "approval_breakdown_request/:id",
    component: ApprovalBreakdown,
  },

  {
    name: "approved_breakdown_request",
    path: "approved_breakdown_request/:id",
    component: ApprovedBreakdown,
  },

  {
    name: "rejected_breakdown_request",
    path: "rejected_breakdown_request/:id",
    component: RejectedBreakdown,
  },

  // {
  //   name: "payout_requests",
  //   path: "payout_requests",
  //   component: PayoutRequest,
  // },
  // {
  //   name: "completed_payout",
  //   path: "completed_payout",
  //   component: CompletedPayoutPayment,
  // },

  // {
  //   name: "failed_payout",
  //   path: "failed_payout",
  //   component: FailedPayoutPayment,
  // },

  {
    name: "pending_payout",
    path: "pending_payout",
    component: PendingPayoutPayment,
  },
];
export default routes;
