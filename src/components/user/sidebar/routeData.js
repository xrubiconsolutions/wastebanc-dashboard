// react-icons//
import React from "react";
import * as HiIcons from "react-icons/hi";
import * as FiIcons from "react-icons/fi";
import * as BiIcons from "react-icons/bi";
import * as VsciIcons from "react-icons/vsc";
import * as MdPeopleIcons from "react-icons/md";
import * as IoIcons from "react-icons/io5";
import * as IoIcon from "react-icons/io";

// Ui SidebarComponent data //
const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "/assets/images/dashboardicon.svg",
  },
  {
    title: "Total Schedule",
    path: "/total_schedule",
    icon: "/assets/images/Calendar.svg",
    iconClosed: <IoIcon.IoIosArrowDown />,
    iconOpened: <IoIcon.IoIosArrowUp />,
    // setting subnav Component data //
    subNav: [
      {
        title: "Pending Schedule",
        path: "/total-schedule/pending_schedule",
      },
      {
        title: "Accepted Schedule",
        path: "/total-schedule/accepted_schedule",
      },
      {
        title: "Completed Schedule",
        path: "/total-schedule/completed_schedule",
      },
      {
        title: "Cancelled Schedule",
        path: "/total-schedule/cancelled_schedule",
      },
      {
        title: "Missed Schedule",
        path: "/total-schedule/missed_schedule",
      },
    ],
  },
  {
    title: "Total Drop-off",
    path: "/total_dropoff",
    icon: "/assets/images/dropoff.svg",
  },
  {
    title: "Total Users",
    path: "/total_users",
    icon: "/assets/images/users.svg",
  },
  {
    title: "Total Aggregators",
    path: "/total_aggregators",
    icon: "/assets/images/aggregators.svg",
  },
  {
    title: "Total Organizations",
    path: "/total_organizations",
    icon: "/assets/images/organization.svg",
  },
  // {
  //   title: "Declined Incident",
  //   path: "/declined-incidents",
  //   icon: <FiIcons.FiPhoneMissed />,
  // },
  {
    title: "Drop-off Locations",
    path: "/dropoff_locations",
    icon: "/assets/images/Location-check.svg",
  },
  {
    title: "Manage Areas",
    path: "/manage_areas",
    icon: "/assets/images/Map.svg",
  },
  {
    title: "Recycler Waste",
    path: "/recycler_waste",
    icon: "/assets/images/waste.svg",
  },
  {
    title: "Waste Category",
    path: "/waste_category",
    icon: "/assets/images/bin.svg",
  },
  {
    title: "Waste Picker",
    path: "/waste_picker",
    icon: "/assets/images/waste_picker.svg",
  },
  // {
  //   title: "Incident Log",
  //   path: "/incident_log",
  //   icon: "/assets/images/Folder-open.svg",
  // },
  {
    title: "Raffle Draw",
    path: "/raffle_draw",
    icon: "/assets/images/gift.svg",
  },
  {
    title: "Financials",
    path: "/financials",
    icon: "assets/images/financials.svg",
  },

  // {
  //   title: "Settings",
  //   path: "/settings",
  //   icon: <IoIcons.IoSettingsOutline />,
  //   iconClosed: <IoIcon.IoIosArrowDown />,
  //   iconOpened: <IoIcon.IoIosArrowUp />,
  //   // setting subnav Component data //
  //   subNav: [
  //     {
  //       title: "Users",
  //       path: "/settings/users",
  //       icon: <FiIcons.FiUserPlus />,
  //     },
  //     {
  //       title: "Roles & Permission",
  //       path: "/settings/roles&permission",
  //       icon: <IoIcons.IoBagOutline />,
  //     },
  //     {
  //       title: "Edit Profile",
  //       path: "/settings/users/edit",
  //       icon: <FiIcons.FiUser />,
  //     },
  //   ],
  // },
];

export default SidebarData;
