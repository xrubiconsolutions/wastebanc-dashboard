import { adminPermissions, adminRoles, genderOptions } from "./constants";

export const formatTimeInfo = (time) => {
  const info = ((Date.now() - time) / 1000) >> 0;
  if (info > 60 * 60) return (info / 60) >> (0 + " hours ago");
  if (info > 60) return (info / 60) >> (0 + " minutes ago");
  return info > 0 ? info + " seconds ago" : "now";
};

export const capitalize = (word) => word[0].toUpperCase() + word.slice(1);
export const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const getInitials = (name) =>
  name.split(" ").reduce((init, n) => init + n[0], "");

export const formatCamelCase = (word) => {
  if (!word) return "";
  for (let l of word)
    if (l === l.toUpperCase()) return word.split(l).join(" " + l.toLowerCase());
  return word;
};

export const formatAreas = (areas) =>
  areas && areas.length > 0
    ? areas.map((a) => ({
        text: `${a.lga}/${a.lcd}`,
        value: `${a.lga}/${a.lcd}`,
        id: a._id,
      }))
    : [];

export const formatUserInfo = (data) => {
  if (!Object.keys(data).length === 0) return {};
  const [firstName, lastName] = [data.firstName, data.lastName];
  const { email, role, phone, username, gender = "" } = data;

  return {
    firstName: {
      label: "First Name",
      placeholder: "First Name",
      value: firstName,
      rules: [(v) => !!v || "First name cannot be empty"],
    },
    lastName: {
      label: "Last Name",
      placeholder: "Last Name",
      value: lastName,
      rules: [(v) => !!v || "Last name cannot be empty"],
    },
    email: {
      label: "Email Address",
      value: email,
      placeholder: "Email",
      rules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "▲ E-mail must be valid",
      ],
      disabled: true,
      extraLink: "change email address",
    },
    phone: {
      label: "Phone Number",
      value: phone,
      placeholder: "Phone Number",
      rules: [
        (v) =>
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v) ||
          "contact line is invalid",
      ],
    },
    username: {
      label: "Username",
      value: username || "Admin 001",
      placeholder: "Username",
      disabled: true,
    },
    gender: {
      label: "Gender",
      options: genderOptions,
      title: "Select gender",
      value:
        genderOptions[
          genderOptions.findIndex(
            (o) => o.value.toUpperCase() === gender.toUpperCase()
          )
        ]?.value || "prefer_not_to_say",
      optionIdx: genderOptions.findIndex(
        (o) => o.value.toUpperCase() === gender.toUpperCase()
      ),
      type: "select",
    },
    adminRole: {
      label: "Admin Role",
      optionIdx: adminRoles.findIndex((o) => o.value === role),
      type: "select",
      options: adminRoles,
      disabled: true,
    },
    permissions: {
      label: "Roles & Permission",
      disabled: true,
      optionIdx: 0,
      type: "select",
      options: [
        { text: "All", value: "all" },
        ...adminPermissions.map((each) => ({ text: each, value: each })),
      ],
    },
  };
};

export const formatCallerInfo = (report) => {
  if (!report) return {};
  const { name = "", phone = "", address = "", createdAt: date = "" } = report;
  return {
    name: { value: name, label: "Caller name", type: "text" },
    number: { value: phone, label: "Caller number", type: "text" },
    address: {
      value: address,
      label: "Address",
      type: "text",
    },
    date: { value: date.slice(0, 10), label: "Date", type: "text" },
  };
};

export const formatOrganizationInfo = (organizations) => {
  if (!organizations) return [];
  return organizations && organizations.length > 0
    ? organizations.map(
        ({ _id: id, name, address, email, lga, phone, responseType }) => [
          id.slice(0, 5),
          name,
          address,
          phone,
          email,
          lga,
          formatCamelCase(responseType || "noisePollution"),
          id,
        ]
      )
    : [];
};

export const randomPick = (items) => {
  const randomNum = (Math.random() * items.length) >> 0;
  return items[randomNum];
};

export const formDashboardItems = ({
  allIncidents,
  orgs,
  completed,
  assigned,
  admins,
  pending,
  allResponders,
  allReports,
}) => {
  return [
    { title: "Total Incident", count: allIncidents?.length || 0 },
    {
      title: "Total Organization",
      count: orgs?.length || 0,
      viewLink: "/admin/all-organisation",
    },
    {
      title: "Total Respondent",
      count: allResponders?.length || 0,
      viewLink: "/admin/all-respondent",
    },
    {
      title: "Total User",
      count: admins?.length || 0,
      viewLink: "/admin/settings/users",
    },
    {
      title: "Pending Incident",
      count: pending?.length || 0,
      viewLink: "/admin/unassigned-incidents",
    },
    {
      title: "Assigned Incident",
      count: assigned?.length || 0,
      percentage:
        (((assigned?.length || 0) / (allIncidents?.length || 0)) * 100) >> 0,
      viewLink: "/admin/assigned-incidents",
    },
    {
      title: "Completed Incident",
      count: completed?.length || 0,
      percentage: ((completed?.length / allIncidents?.length) * 100) >> 0,
      viewLink: "/admin/completed-incidents",
    },
    {
      title: "Pending Reports",
      count: allReports?.length || 0,
      viewLink: "/admin/pending-incidents",
    },
  ];
};

export const countByCondition = (data = [], prop = "", value) =>
  data?.filter((datum) => datum[prop] === value).length || 0;

export const formUserDashboardItems = ({
  allIncidents,
  completed,
  assigned,
  allReports,
}) => {
  return [
    {
      title: "Pending Reports",
      count: allReports?.length || 0,
      viewLink: "/user/live-incidents",
    },
    {
      title: "Assigned Incident",
      count: assigned?.length || 0,
      percentage:
        (((assigned?.length || 0) / (allIncidents?.length || 0)) * 100) >> 0,
      // viewLink: "/user/assigned-incidents",
    },
    {
      title: "Completed Incident",
      count: completed?.length || 0,
      percentage: ((completed?.length / allIncidents?.length) * 100) >> 0,
      // viewLink: "/user/completed-incidents",
    },
    {
      title: "Pending Incident",
      count: "03",
      viewLink: "/user/unassigned-incidents",
    },
  ];
};

export const pureReverse = (n) => (n ? n.reduce((a, b) => [b, ...a], []) : []);
export const getLoginMode = () => localStorage.getItem("login_mode");

export const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export const formatValue = (value) => new Intl.NumberFormat().format(value);
// dynamically load JavaScript files in our html with callback when finished
export const loadScript = (url, callback) => {
  if (window.google) return;
  let script = document.createElement("script"); // create script tag
  script.type = "text/javascript";

  // when script state is ready and loaded or complete we will call callback
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url; // load by url
  document.getElementsByTagName("head")[0].appendChild(script); // append to head
};

export const formatOrgDetails = (
  selectedOrganisation,
  lgaIndex,
  fetchedArea,
  lcds,
  locations = [],
  formValues
) => {
  const streetOfAccess =
    // formValues.lcda && lcds?.length > 0
    //   ? formValues.lcda
    //   :
    selectedOrganisation.streetOfAccess;

  const country = formValues.country
    ? formValues.country
    : selectedOrganisation.country;

  const state = formValues.country
    ? formValues.state
    : selectedOrganisation.state;

  const streetsIdxs = streetOfAccess?.map((str) =>
    lcds.findIndex((area) => area.text === str || area.value === str)
  );

  // construct the countries and states options
  const countries = formatSelectOptions(locations, "country");
  let states = locations?.find((location) => location.country === country);
  states = states?.states || [];
  states = formatSelectOptions(states);

  // prepare the country and state idx
  const countryIdx = countries.findIndex(
    (_country) => _country.text === country
  );
  const stateIdx = states.findIndex((_state) => _state.text === state);

  const bioFormEntries = {
    name: {
      label: "Name",
      value: selectedOrganisation.companyName,
      placeholder: "Organisation Name",
      rules: [(v) => !!v || "Company Name is required"],
    },
    phone: {
      label: "Contact Line",
      value: selectedOrganisation.phone,
      placeholder: "Organisation Contact",
      rules: [
        (v) => !!v || "Contact Line is required",
        (v) =>
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v) ||
          "contact line is invalid",
      ],
    },
    email: {
      label: "Email Address",
      placeholder: "Email",
      value: selectedOrganisation.email,
      rules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "▲ E-mail must be valid",
      ],
    },
    address: {
      label: "Address",
      value: selectedOrganisation.location,
      placeholder: "address",
      rules: [(v) => !!v || "Company Address is required"],
    },
  };

  const documentsFormEntries = {
    RCNumber: {
      label: "RC Number",
      value: selectedOrganisation.rcNo,
      placeholder: "RC Number",
      disabled: true,
    },
    tag: {
      label: "Assign Tag",
      value: selectedOrganisation.companyTag,
      placeholder: "Organisation Tag",
      disabled: true,
    },
    country: {
      label: "Country",
      optionIdx: countryIdx,
      type: "select",
      options: countries,
      rules: [(v) => !!v || "Country is required"],
    },
    state: {
      label: "State",
      optionIdx: stateIdx,
      type: "select",
      options: states,
      rules: [(v) => !!v || "State is required"],
    },
    areaAccess: {
      label: "Area of Access",
      optionIdxs: lgaIndex,
      type: "multiselect",
      options: fetchedArea || [],
    },
    lcda: {
      label: "Area Under Selected LCDA",
      optionIdxs: streetsIdxs,
      options: lcds,
      type: "multiselect",
      rules: [(v) => !!v || "choose some option(s)"],
    },
  };
  return [bioFormEntries, documentsFormEntries];
};

// format into select component options format i.e {text: [data], value: [value]}
export const formatSelectOptions = (obj, text = "", value = text) => {
  if (!Array.isArray(obj) || obj.length === 0) return [];
  // handles array of objects
  if (text)
    return obj.map((item) => ({
      text: item[text],
      value: item[value],
    }));
  else
    return obj.map((item) => ({
      text: item,
      value: item,
    }));
};

export const valAggregator = (...obj) => {
  let agg = "";
  obj.forEach((o) => {
    agg += Object.values(o).reduce((a, b) => {
      if (b === true) b = "";
      return a + b;
    }, "");
  });
  return agg;
};

export const removeEmptyFields = (obj) => {
  const result = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (!!value) result[key] = value;
  });
  return result;
};

export const convertToCSV = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return "";
  }
  const headers = Object.keys(data[0]);
  let csv = headers.join(",") + "\n";

  data.forEach((item) => {
    let row = headers.map((header) => {
      if (Array.isArray(item[header])) {
        return item[header].map((arrItem) => arrItem?.name).join(" ");
      } else if (typeof item[header] === "object" && item[header] !== null) {
        return Object.values(item[header]).join(" ");
      } else {
        return JSON.stringify(item[header]);
      }
    });
    csv += row.join(",") + "\n";
  });

  return csv;
};
