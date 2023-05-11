import React from "react";
import DataTable from "../../../components/UI/Table";
import BreadCrumb from "../../../components/UI/breadCrumbs";
import { NavBarLeft, UserContainer } from "../UserDetails";

const UserPayout = ({ match }) => {
  const {
    params: { id },
  } = match;
  const pages = [{ name: "Total Users", link: "/admin/total_users" }];
  const previous = [
    { name: "User Details", link: `/admin/user_details/${id}` },
  ];

  return (
    <div>
      <UserContainer>
        <NavBarLeft>
          <BreadCrumb pages={pages} current="User Payout" previous={previous} />
        </NavBarLeft>
      </UserContainer>

      <DataTable
        // data={data}
        onSearch=""
        columns=""
        setCurrentPage=""
        totalPages=""
        onFilter=""
        onRefresh=""
        onFetch=""
        paginationData=""
        header
      />
    </div>
  );
};

export default UserPayout;
