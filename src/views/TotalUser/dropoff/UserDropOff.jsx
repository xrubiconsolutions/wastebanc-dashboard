import React, { useState, useEffect } from "react";
import DataTable from "../../../components/UI/Table";
import BreadCrumb from "../../../components/UI/breadCrumbs";
import { NavBarLeft, UserContainer } from "../UserDetails";
import {
  userDropoffRequest,
  userSearchDropoffRequest,
} from "../../../store/actions";
import { useDispatch } from "react-redux";
import { Tag, Space } from "antd";
import { Popover } from "antd";
import { truncate } from "../../../utils/constants";
import moment from "moment";
import Button from "../../../components/UI/button";

const UserDropOff = ({ match }) => {
  const {
    params: { id },
  } = match;
  const pages = [{ name: "Total Users", link: "/admin/total_users" }];
  const previous = [
    { name: "User Details", link: `/admin/user_details/${id}` },
  ];

  const [bodyData, setBodyData] = useState([]);
  const [paginationData, setPaginationData] = useState();
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();

  // for payload
  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      userSearchDropoffRequest({
        page,
        key: key || "",
        id,
      })
    );

    if (!res.error) {
      const { dropoffs, ...paginationData } = res.payload.data;
      setBodyData(dropoffs);
      setPaginationData({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onFilter = async (date, page = 1) => {
    const res = await dispatch(
      userDropoffRequest({
        currentMonth: date,
        page,
        id,
      })
    );
    if (!res.error) {
      const { dropoffs, ...paginationData } = res.payload.data;
      setBodyData(dropoffs);
      setPaginationData({ ...paginationData, date });
      setTotalPages(paginationData.totalPages);
    }
  };

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      userDropoffRequest({
        currentMonth: payload,
        page,
        id,
      })
    );
    if (!res.error) {
      const { dropoffs, ...paginationData } = res.payload.data;
      setBodyData(dropoffs);
      setPaginationData({ ...paginationData, date: payload });
    }
  };

  const onRefresh = () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const columns = [
    {
      title: "Drop-off Date",
      dataIndex: "dropOffDate",
      key: "dropOffDate",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
    },
    {
      title: "Recycling Organization",
      dataIndex: "organisation",
      key: "organisation",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Waste Category",
      dataIndex: "categories",
      key: "categories",
      render: (categories) => (
        <span>
          {(categories?.slice(0, 3) || [])?.map((waste) => {
            return (
              <Tag key={waste}>
                <Popover content={waste?.name || waste}>
                  {truncate(waste?.name, 10)}
                </Popover>
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "Waste Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  return (
    <div>
      <UserContainer>
        <NavBarLeft>
          <BreadCrumb
            pages={pages}
            current="Drop-Off Request"
            previous={previous}
          />
        </NavBarLeft>
      </UserContainer>

      <DataTable
        data={bodyData}
        columns={columns}
        header
        onFilter={onFilter}
        onSearch={onSearch}
        onRefresh={onRefresh}
        // setCurrentPage={setCurrentPage}
        totalPages={paginationData?.totalPages}
        paginationData={paginationData}
        onFetch={fetchAll}
      />
    </div>
  );
};

export default UserDropOff;
