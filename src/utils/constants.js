export const adminPermissions = [
  "Dashboard & Metrics",
  "Total Schedule",
  "Total Drop-off",
  "Total Users",
  "Total Aggregators",
  "Total Organizations",
  "Drop-Off Location",
  "Manage Areas",
  "Recycler Waste",
  "Incident Log",
  "Raffle Draw",
  "User Agencies",
];

export const claimPermissions = Object.freeze({
  MANAGE_AREA: { path: "manage_area", title: "Manage Areas" },
  ORGANISATION: { path: "total_organizations", title: "Total Organizations" },
  WASTE_CATEGORY: { path: "waste_category", title: "Waste Category" },
  RAFFLE_DRAW: { path: "raffle_draw", title: "Raffle Draw" },
  ROLES: { path: "roles_permission", title: "Roles & Permission" },
  AGENCIES: { path: "user_agencies", title: "User Agencies" },
  LOCATION: { path: "location", title: "Location" },
  WASTE_PICKER: { path: "waste_picker", title: "Waste Picker" },
  FINANCIALS: { path: "financials", title: "Financials" },
});

export const genderOptions = [
  { text: "Male", value: "male" },
  { text: "Female", value: "female" },
  { text: "I prefer not to say", value: "prefer_not_to_say" },
];

export const adminRoles = [
  { text: "Super Admin - Manager", value: "manager" },
  { text: "Super Admin - Moderator", value: "moderator" },
  { text: "Admin - CallTaker", value: "calltaker" },
];

export const initialUserprofile = {
  firstName: { label: "First Name", placeholder: "First Name", value: "David" },
  lastName: { label: "Last Name", placeholder: "Last Name", value: "Ola" },
  email: {
    label: "Email Address",
    value: "admin001@gmail.com",
    placeholder: "Email",
    rules: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "▲ E-mail must be valid",
    ],
  },
  phoneNo: {
    label: "Phone NUmber",
    value: "08144252886",
    placeholder: "Phone Number",
  },
  username: { label: "Username", value: "Admin00", placeholder: "Username" },
  gender: {
    label: "Gender",
    options: genderOptions,
    title: "Select gender",
    optionIdx: 1,
    type: "select",
  },
  adminRole: {
    label: "Admin Role",
    optionIdx: 1,
    type: "select",
    options: adminRoles,
  },
  permissions: {
    label: "Roles & Permission",
    optionIdx: 1,
    type: "select",
    options: [
      { text: "All", value: "all" },
      ...adminPermissions.map((each) => ({ text: each, value: each })),
    ],
  },
};

export const userForm = {
  firstName: {
    label: "First Name",
    placeholder: "First Name",
    value: "LASEPA",
    disabled: true,
    rules: [(v) => !!v || "First name cannot be empty"],
  },
  lastName: {
    label: "Last Name",
    placeholder: "Last Name",
    value: "LASEPA",
    disabled: true,
    rules: [(v) => !!v || "Last name cannot be empty"],
  },
  email: {
    label: "Email Address",
    placeholder: "Email",
    value: "ezike@xrubiconsolutions.com",
    disabled: true,
    rules: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "▲ E-mail must be valid",
    ],
  },
  phone: {
    label: "Phone Number",
    placeholder: "Phone Number",
    value: "08109950207",
    disabled: true,
  },
  username: {
    label: "Username",
    placeholder: "Username",
    value: "LASEPA",
    disabled: true,
    rules: [(v) => !!v || "Username cannot be empty"],
  },
  gender: {
    label: "Gender",
    options: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
      { text: "I prefer not to say", value: "none" },
    ],
    title: "Select gender",
    optionIdx: 1,
    type: "select",
  },
};

export const edithProfileForm = {
  firstName: {
    label: "First Name",
    placeholder: "First Name",
    rules: [(v) => !!v || "First name cannot be empty"],
  },
  lastName: {
    label: "Last Name",
    placeholder: "Last Name",

    rules: [(v) => !!v || "Last name cannot be empty"],
  },
  email: {
    label: "Email Address",
    placeholder: "Email",
    rules: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "▲ E-mail must be valid",
    ],
  },
  phone: {
    label: "Phone Number",
    placeholder: "Phone Number",
  },
  username: {
    label: "Username",
    placeholder: "Username",
    rules: [(v) => !!v || "Username cannot be empty"],
  },
  gender: {
    label: "Gender",
    options: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
      { text: "I prefer not to say", value: "none" },
    ],
    title: "Select gender",
    optionIdx: 1,
    type: "select",
  },
};

export const months = [
  {
    value: 1,
    text: "January",
  },
  {
    value: 2,
    text: "February",
  },
  {
    value: 3,
    text: "March",
  },
  {
    value: 4,
    text: "April",
  },
  {
    value: 5,
    text: "May",
  },
  {
    value: 6,
    text: "June",
  },
  {
    value: 7,
    text: "July",
  },
  {
    value: 8,
    text: "August",
  },
  {
    value: 9,
    text: "September",
  },
  {
    value: 10,
    text: "October",
  },
  {
    value: 11,
    text: "November",
  },
  {
    value: 12,
    text: "December",
  },
];

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const truncate = (text, n) =>
  text?.length > n ? text.substr(0, n - 1) + "..." : text;

export const infoData = {
  recentPickup: [
    {
      title: "Schedule ID",
      value: "17288",
    },
    {
      title: "Phone Number",
      value: "John Doe",
    },
    {
      title: "Waste Category",
      value: ["Can", "Pet bottles", "Carton"],
    },

    {
      title: "Waste Quantity",
      value: "1-5 bags",
    },
    {
      title: "Pickup Date",
      value: "Jan 15, 2022",
    },
    {
      title: "Pickup Location",
      value: "1 Segun Sodiya Dr, Ajah 106104, Lagos, Nigeria",
    },

    {
      title: "Status",
      value: "Pending",
    },
    {
      title: "Scheduled Date",
      value: "Jan 15, 2022",
    },
    {
      title: "Accepted by",
      value: "Null",
    },
  ],

  newUsers: [
    {
      title: "User ID",
      value: "17288",
    },
    {
      title: "Full Name",
      value: "Temiloluwa George",
    },
    {
      title: "Phone Number",
      value: "08132869444",
    },

    {
      title: "Gender",
      value: "Male",
    },
    {
      title: "LGA/LCDA",
      value: "Alimosho",
    },
    {
      title: "Location Address",
      value: "12, Aje Street, Off Commercial Avenue, Sabo Yaba",
    },

    {
      title: "Total Scheduled Pickup",
      value: 0,
    },
    {
      title: "Pending Pickup",
      value: 0,
    },
    {
      title: "Completed Pickup",
      value: 6,
    },
    {
      title: "Missed Pickup",
      value: 0,
    },
    {
      title: "Total Scheduled Drop-off",
      value: 0,
    },
    {
      title: "Raffle-Draw Won",
      value: 0,
    },
    {
      title: "Wallet Balance",
      value: "#0.00",
    },
    {
      title: "Amount Collected",
      value: "#0.00",
    },
  ],
  newAggregators: [
    {
      title: "Aggregator's ID",
      value: "Null",
    },
    {
      title: "Name",
      value: "Weirdo IcanPro",
    },
    {
      title: "Phone Number",
      value: "08132869444",
    },

    {
      title: "Gender",
      value: "Male",
    },
    {
      title: "Preferred Organization",
      value: "Plastics Solution Ng",
    },
    {
      title: "LGA/LCDA",
      value: "Alimosho",
    },

    {
      title: "Date Created",
      value: "Jan 15, 2022",
    },
    {
      title: "Status",
      value: "Pending",
    },
    {
      title: "Accepted Pickup",
      value: 6,
    },
    {
      title: "Missed Pickup",
      value: 0,
    },
    {
      title: "No of Trips Completed",
      value: 0,
    },
  ],
  newIncident: [
    {
      title: "Report ID",
      value: "20976",
    },
    {
      title: "Report Type",
      value: "Ilegal Dumping",
    },
    {
      title: "Customer Name",
      value: "Oluwafemi Akerele",
    },

    {
      title: "Recieved By",
      value: "Lasepa Agency",
    },
    {
      title: "Location",
      value: "125, Dayo street, Makoko Lagos State",
    },
    {
      title: "Dispatched To",
      value: "Waste Management Agency",
    },
    {
      title: "Coverage Area",
      value: "Egbeda",
    },
    {
      title: "Description",
      value: "Someone is dumping stuff at Makoko",
    },
    {
      title: "Date Created",
      value: "Jan 15, 2022",
    },
  ],
  newOutstanding: [
    {
      title: "User ID",
      value: "9ae3",
    },

    {
      title: "Customer Name",
      value: "Oluwafemi Akerele",
    },
    {
      title: "Phone Number",
      value: "08132869444",
    },
    {
      title: "Wallet Balance",
      value: "8000",
    },
    {
      title: "Amount(#)",
      value: "5000",
    },
    {
      title: "Schedule ID",
      value: "11OFF",
    },
    {
      title: "Recycler's Name",
      value: "D'Moontgrenee",
    },
    {
      title: "Recycler's ID",
      value: "DMG003",
    },
    {
      title: "Organization Name",
      value: "Mondo for Africa Limited",
    },
    {
      title: "Waste Quantity",
      value: "1-5kg",
    },
    {
      title: "Status",
      value: "Pending",
    },
    {
      title: "Requested Date",
      value: "Jan 15, 2022",
    },
  ],
  newPayout: [
    {
      title: "User ID",
      value: "9ae3",
    },

    {
      title: "Customer Name",
      value: "Oluwafemi Akerele",
    },
    {
      title: "Phone Number",
      value: "08132869444",
    },
    {
      title: "Amount(#)",
      value: "5000",
    },
    {
      title: "Schedule ID",
      value: "11OFF",
    },
    {
      title: "Recycler's Name",
      value: "D'Moontgrenee",
    },
    {
      title: "Recycler's ID",
      value: "DMG003",
    },
    {
      title: "Organization Name",
      value: "Mondo for Africa Limited",
    },
    {
      title: "Waste Quantity",
      value: "1-5kg",
    },
    {
      title: "Status",
      value: "Paid",
    },
    {
      title: "Requested Date",
      value: "Jan 15, 2022",
    },
    {
      title: "Payout Date",
      value: "Jan 17, 2022",
    },
  ],
  newDropOff: [
    {
      title: "User ID",
      value: "9ae3",
    },
    {
      title: "Customer Name",
      value: "Oluwafemi Akerele",
    },
    {
      title: "Phone Number",
      value: "08132869444",
    },
    {
      title: "Recieved By",
      value: "Lasepa Agency",
    },
    {
      title: "Organization Name",
      value: "Mondo for Africa Limited",
    },
    {
      title: "Organization Address",
      value: "125, Dayo street, Makoko Lagos State",
    },
    {
      title: "Waste Category",
      value: ["Can", "Pet bottles", "Carton"],
    },
    {
      title: "Waste Quantity",
      value: "1-5 bags",
    },
    {
      title: "Drop-Off Date",
      value: "Jan 15, 2022",
    },
    {
      title: "Drop-Off Time",
      value: "2:00pm",
    },
  ],
  missedPickup: [
    {
      title: "Schedule ID",
      value: "d8ea7",
    },
    {
      title: "Phone Number",
      value: "08132869444",
    },
    {
      title: "Waste Category",
      value: ["Can", "Pet bottles", "Carton"],
    },

    {
      title: "Waste Quantity",
      value: "1-5 bags",
    },
    {
      title: "Pickup Date",
      value: "Jan 15, 2022",
    },
    {
      title: "Pickup Location",
      value: "1 Segun Sodiya Dr, Ajah 106104, Lagos, Nigeria",
    },

    {
      title: "Status",
      value: "Missed",
    },
    {
      title: "Missed by",
      value: "Procycle Cleaning Services",
    },
    {
      title: "Reasons",
      value: "Unavailable",
    },
    {
      title: "Missed Date",
      value: "Jan 15, 2022",
    },
  ],
  cancelledPickup: [
    {
      title: "Schedule ID",
      value: "d8ea7",
    },
    {
      title: "Phone Number",
      value: "08132869444",
    },
    {
      title: "Waste Category",
      value: ["Can", "Pet bottles", "Carton"],
    },

    {
      title: "Waste Quantity",
      value: "1-5 bags",
    },
    {
      title: "Pickup Date",
      value: "Jan 15, 2022",
    },
    {
      title: "Pickup Location",
      value: "1 Segun Sodiya Dr, Ajah 106104, Lagos, Nigeria",
    },

    {
      title: "Status",
      value: "Cancelled",
    },
    {
      title: "Cancelled by",
      value: "Procycle Cleaning Services",
    },
    {
      title: "Reasons",
      value: "Unavailable",
    },
    {
      title: "Cancelled Date",
      value: "Jan 15, 2022",
    },
  ],
};
