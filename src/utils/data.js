export const colors = ["#00966D", "#5D5FEF", "#F5000F", "#009A00"];

export const CardDashbordDetails = [
  {
    icon: "/assets/images/transport_icon 1.svg",
    title: "Total Drop Off",
    amount: "200",
    link: "/admin/total_dropoff",
    key: "drop_off",
  },
  {
    icon: "/assets/images/No_plastic_bottle.svg",
    title: "Total Waste (KG)",
    amount: "5000",
    link: "/admin/total_waste",
  },
  {
    icon: "/assets/images/totalPayment.svg",
    title: "Total Waste Pickers",
    amount: "12.5k",
    link: "/admin/waste_picker",
  },
  {
    icon: "/assets/images/totalUnderstanding.svg",
    title: "Total Organisations",
    amount: "4.5k",
    link: "/admin/total_organizations",
  },
  {
    icon: "/assets/images/totalSchedule.svg",
    title: "Total Schedule",
    amount: "200",
    link: "#",
  },
  {
    icon: "/assets/images/totalSchedule.svg",
    title: "Pending Pickup",
    amount: "20",
    progress: "50",
    link: "/admin/total-schedule/pending_schedule",
  },
  {
    icon: "/assets/images/totalSchedule.svg",
    title: "Completed Pickup",
    amount: "160",
    progress: "70",
    link: "/admin/total-schedule/completed_schedule",
  },
  {
    icon: "/assets/images/totalSchedule.svg",
    title: "Missed Pickup",
    amount: "200",
    progress: "100",
    link: "/admin/total-schedule/missed_schedule",
  },
  {
    schedules: [],
  },
];

export const CardCompanyDetails = [
  {
    icon: "/assets/images/transport_icon 1.svg",
    title: "Total Drop Off",
    amount: "200",
    link: "/admin/total_dropoff",
    key: "drop_off",
  },
  {
    icon: "/assets/images/No_plastic_bottle.svg",
    title: "Total Waste (KG)",
    amount: "200",
    link: "/admin/total_waste",
  },
  {
    icon: "/assets/images/totalPayment.svg",
    title: "Total Payment",
    amount: "200",
    link: "/admin/total_payment",
  },
  {
    icon: "/assets/images/totalUnderstanding.svg",
    title: "Total Outstanding",
    amount: "200",
    link: "/admin/outstanding_payment",
  },
  {
    icon: "/assets/images/totalSchedule.svg",
    title: "Total Schedule",
    amount: "200",
    link: "#",
  },
  {
    icon: "/assets/images/totalSchedule.svg",
    title: "Pending Pickup",
    amount: "200",
    progress: "50",
    link: "/admin/total-schedule/pending_schedule",
  },
  {
    icon: "/assets/images/totalSchedule.svg",
    title: "Completed Pickup",
    amount: "200",
    progress: "40",
    link: "/admin/total-schedule/completed_schedule",
  },
  {
    icon: "/assets/images/totalSchedule.svg",
    title: "Missed Pickup",
    amount: "20",
    progress: "60",
    link: "/admin/total-schedule/missed_schedule",
  },
];

export const TotalCardUser = [
  {
    icon: "/assets/images/userVector.svg",
    title: "Total Male",
    user: "20",
  },
  {
    icon: "/assets/images/userVector.svg",
    title: "Total Female",
    user: "200",
  },
  {
    icon: "/assets/images/userVector.svg",
    title: "Total User",
    user: "20",
  },
];

export const TotalCardWastePicker = [
  {
    icon: "/assets/images/userVector.svg",
    title: "Total Male Pickers",
    user: "20",
  },
  {
    icon: "/assets/images/userVector.svg",
    title: "Total Female Pickers",
    user: "200",
  },
  {
    icon: "/assets/images/userVector.svg",
    title: "Total Pickers",
    user: "20",
  },
  {
    icon: "/assets/images/userVector.svg",
    title: "Verified",
    user: "10",
  },
  {
    collectors: [],
  },
];

export const FinancialsCards = [
  {
    icon: "/assets/images/userVector.svg",
    title: "Total Payments",
    amount: "40000",
  },
  {
    icon: "/assets/images/userVector.svg",
    title: "Total Oustanding",
    amount: "20000",
  },
  {
    icon: "/assets/images/userVector.svg",
    title: "Completed Payment",
    amount: "200000",
  },
  {
    icon: "/assets/images/userVector.svg",
    title: "Total Maintenance Fee",
    amount: "50000",
  },
];

export const TotalCardAggregators = [
  {
    icon: "/assets/images/userVector.svg",
    title: "Total Male",
    user: "20",
  },
  {
    icon: "/assets/images/userVector.svg",
    title: "Total Female",
    user: "200",
  },
  {
    icon: "/assets/images/userVector.svg",
    title: "New Aggregators",
    user: "20",
  },
  {
    icon: "/assets/images/userVector.svg",
    title: "Verified",
    user: "10",
  },
  {
    collectors: [],
  },
];
export const PageTitle = {
  dashboard: "Dashboard",
  // total_dropoff: "Total Drop-Off",
  pending_schedule: "Total Schedule - Pending",
  accepted_schedule: "Total Schedule - Accepted",
  completed_schedule: "Total Schedule - Completed",
  cancelled_schedule: "Total Schedule - Cancelled",
  missed_schedule: "Total Schedule - Missed",
  total_dropoff: "Total Drop-off",
  total_users: "Total Users",
  // total_aggregators: "Total Aggregators",
  total_aggregators: "Total Agents",
  total_aggregators_all: "Total Organization",
  total_organizations: "Total Organizations",
  total_organizations_completed_schedules: "Total Organizations",
  profile_details: "Total Organizations",
  waste_picker: "Total Waste Pickers",
  waste_picker_profile: "Total Waste Pickers",
  waste_picker_assign: "Total Waste Pickers",
  total_organizations_setup: "Setup Organizations",
  total_organizations_modify: "Modify Organization",
  total_organizations_wastePicker: "Waste Pickers",
  dropoff_locations: "Drop-off Locations",
  manage_areas: "Manage Areas",
  recycler_waste: "Waste Collected By Organizations",
  waste_category: "Available Recyclable Waste Pickup",
  incident_log: "Incident Log",
  total_waste: "Total Waste (kg)",
  total_payment: "Total Payment",
  outstanding_payment: "Outstanding Payment",
  raffle_draw: "Raffle Draw",
  location: "Location",
  user_agencies: "User Agencies",
  user_agency: "User Agencies",
  roles_permission: "Roles & Claims",
  manage_drop_off: "Manage Drop-Off",
  geo_fencing: "Geo-Fenced Agent",
  change_password: "Change Password",
  resource: "Resource",
  billing: "Billing",
  financials: "Financials",
  generated_invoice: "Generated_Invoice",
};
