import React from "react";
import { useLocation } from "react-router";
import TransationTable from "./Table";
import { UserContainer, NavBarLeft } from "../UserDetails";
import BreadCrumb from "../../../components/UI/breadCrumbs";

export const PayoutBreakdown = () => {
  const location = useLocation();
  const state = location;
  const currentPage = state.state.requestType;
  const id = location.pathname.split("/")[3];

  const pages = [{ name: "Total Users", link: "/admin/total_users" }];
  const previous = [
    { name: "Payout to Bank", link: `/admin/bank_payout/${id}` },
  ];

  return (
    <div>
      <UserContainer>
        <NavBarLeft>
          <BreadCrumb pages={pages} current={currentPage} previous={previous} />
        </NavBarLeft>
      </UserContainer>
      <TransationTable state={state} />
    </div>
  );
};
