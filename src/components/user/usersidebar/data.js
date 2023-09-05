/* eslint-disable no-unused-vars */
// react-icons//
import React from "react";
import * as HiIcons from "react-icons/hi";
import * as FiIcons from "react-icons/fi";
import * as BiIcons from "react-icons/bi";
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
    title: "Total Agents",
    path: "/total_agents",
    icon: "/assets/images/aggregators.svg",
  },
  {
    title: "All Drop-Off",
    path: "/total_dropoff",
    icon: "/assets/images/Location-check.svg",
    // icon: <FiIcons.FiPhoneCall />,
  },
  {
    title: "Manage Drop-off",
    path: "/manage_drop_off",
    icon: "/assets/images/dropoff.svg",
    // icon: <FiIcons.FiPhoneOff />,
  },
  {
    title: "Geo-Fencing",
    path: "/geo_fencing",
    icon: "/assets/images/Map.svg",
    // icon: <BiIcons.BiMessageRoundedDetail />,
  },
  {
    title: "Waste Picker",
    path: "/waste_picker",
    icon: "/assets/images/waste_picker.svg",
  },
  {
    title: "Billing",
    path: "/billing",
    icon: "/assets/images/invoice-bill.svg",
  },
  {
    title: "Evacuation Request",
    path: "/evacuation",
    icon: "/assets/images/Folder.svg",
  },
];

export default SidebarData;
