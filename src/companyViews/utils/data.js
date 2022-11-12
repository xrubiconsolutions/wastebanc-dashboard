export const colors = ["#00966D", "#5D5FEF", "#F5000F", "#009A00"];

export const CardDashbordDetails = [
  {
    icon: "/assets/images/transport_icon 1.svg",
    title: "Total Drop Off",
    amount: "200",
    link: "/user/total_dropoff",
    key: "drop_off",
  },
  {
    icon: "/assets/images/No_plastic_bottle.svg",
    title: "Total Waste (KG)",
    amount: "5000",
    link: "/user/total_waste",
  },
  // {
  //   icon: "/assets/images/No_plastic_bottle.svg",
  //   title: "Total Payment",
  //   amount: "12.5k",
  //   link: "/user/total_payment",
  // },
  // {
  //   icon: "/assets/images/No_plastic_bottle.svg",
  //   title: "Total Outstanding",
  //   amount: "4.5k",
  //   link: "/user/outstanding_payment",
  // },
  {
    icon: "/assets/images/No_plastic_bottle.svg",
    title: "Total Schedule",
    amount: "200",
    link: "#",
  },
  {
    icon: "/assets/images/No_plastic_bottle.svg",
    title: "Pending Pickup",
    amount: "20",
    progress: "50",
    link: "/user/total-schedule/pending_schedule",
  },
  {
    icon: "/assets/images/No_plastic_bottle.svg",
    title: "Completed Pickup",
    amount: "160",
    progress: "70",
    link: "/user/total-schedule/completed_schedule",
  },
  {
    icon: "/assets/images/No_plastic_bottle.svg",
    title: "Missed Pickup",
    amount: "20",
    progress: "60",
    link: "/user/total-schedule/missed_schedule",
  },
  {
    schedules: [],
  },
];

export const TotalCardUser = [
  {
    icon: "/assets/images/transport_icon 1.svg",
    title: "Total Male",
    user: "20",
  },
  {
    icon: "/assets/images/No_plastic_bottle.svg",
    title: "Total Female",
    user: "200",
  },
  {
    icon: "/assets/images/No_plastic_bottle.svg",
    title: "New User",
    user: "20",
  },
];
export const TotalCardAggregators = [
  {
    icon: "/assets/images/transport_icon 1.svg",
    title: "Total Male",
    user: "20",
  },
  {
    icon: "/assets/images/No_plastic_bottle.svg",
    title: "Total Female",
    user: "200",
  },
  {
    icon: "/assets/images/No_plastic_bottle.svg",
    title: "New Aggregators",
    user: "20",
  },
  {
    icon: "/assets/images/No_plastic_bottle.svg",
    title: "Verified",
    user: "10",
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
  total_aggregators: "Total Agent",
  total_aggregators_all: "Total Organization",
  total_organizations: "Total Organizations",
  profile_details: "Total Organizations",
  total_organizations_setup: "Setup Organizations",
  total_organizations_modify: "Modify Organization",
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
};
