import React, { useEffect, useState } from "react";
import DataTable from "../../components/UI/Table";
import { Tag, Space } from "antd";
import Button from "../../components/UI/button";
import ContentCard from "../../components/UI/ContentCard";
import { colors, TotalCardUser } from "../../utils/data";
import InfoModal from "../../components/UI/InfoModal";
import { infoData } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  currentMonthUser,
  filterUser,
  searchUser,
  totalUser,
  searchUssdUser,
  totalUssdUsers,
  filterUssdUser,
} from "../../store/actions";
import moment from "moment";
import { useHistory, useLocation } from "react-router";
import StyledButton from "../../components/UI/btn";
import Tabcontent from "../../components/UI/TabContent";
import { Link } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

const TotalUser = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [bodyData, setBodyData] = useState();
  const [paginationData, setPaginationData] = useState();
  const dispatch = useDispatch();
  const [ussdPaginationData, setUssdPaginationData] = useState([]);
  const [ussdBodyData, setUssdBodyData] = useState([]);
  const [selectedKey, setSelectedKey] = useState("0");

  const d = new Date();

  d.setDate(d.getDate());
  const payload = {
    start: "2020-01-01",
    end: d,
  };

  // const columns = [
  //   {
  //     title: "Full Name",
  //     dataIndex: "fullname",
  //     key: "fullname",
  //     // render: (text) => <a>{text}</a>,
  //   },
  //   {
  //     title: "LGA/LCDA",
  //     dataIndex: "lcd",
  //   },
  //   {
  //     title: "Customer Phone",
  //     dataIndex: "phone",
  //     key: "phone",
  //   },
  //   {
  //     title: "Gender",
  //     dataIndex: "gender",
  //     key: "gender",
  //   },

  //   {
  //     title: "Action",
  //     dataIndex: "action",
  //     key: "action",
  //     render: (text, record) => (
  //       <Space size="middle">
  //         <StyledButton
  //           type=""
  //           buttonStyle="btn--primary--outline"
  //           buttonSize="btn--small"
  //           onClick={() => {
  //             setRowInfo(record);
  //             setShowModal(true);
  //           }}
  //         >
  //           See More
  //         </StyledButton>
  //         {/* <a>See More</a> */}
  //       </Space>
  //     ),
  //   },
  // ];

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      searchUser({
        key,
        page,
      })
    );
    if (!res.error) {
      const { users, ...paginationData } = res.payload.data;
      setBodyData(users);
      setPaginationData({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onFilter = async (date, page = 1) => {
    const res = await dispatch(
      filterUser({
        page,
        currentMonth: date,
      })
    );

    if (!res.error) {
      const { users, ...paginationData } = res.payload.data;
      setBodyData(users);
      setPaginationData({ ...paginationData, date });
      setTotalPages(paginationData.totalPages);
    }
  };

  const thisMonth = useSelector((state) => state?.user);
  const { currentMonthClient, allUser } = thisMonth;

  useEffect(() => {
    if (!allUser) dispatch(totalUser());
  }, []);

  const totalUserCopy = TotalCardUser.map((el) => {
    return { ...el };
  });

  totalUserCopy[0].user = allUser?.male;
  totalUserCopy[1].user = allUser?.female;
  totalUserCopy[2].user = allUser && allUser?.female + allUser?.male;

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      currentMonthUser({
        page,
        currentMonth: payload,
      })
    );
    if (!res.error) {
      const { users, ...paginationData } = res.payload.data;
      setBodyData(users);
      setPaginationData({ ...paginationData, date: payload });
    }
  };

  const fetchAllUssdUsers = async (page = 1) => {
    const res = await dispatch(totalUssdUsers({ currentMonth: payload, page }));
    if (!res.error) {
      const { users, ...paginationData } = res.payload.data;
      setUssdBodyData(users);
      setUssdPaginationData({ ...paginationData, date: payload });
    }
  };

  const searchUssdUsers = async (key, page = 1) => {
    const res = await dispatch(
      searchUssdUser({
        key,
        page,
      })
    );

    if (!res.error) {
      const { users, ...paginationData } = res.payload.data;
      setUssdBodyData(users);
      setUssdPaginationData({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const filterUssdUsers = async (date, page = 1) => {
    const res = await dispatch(
      filterUssdUser({
        page,
        currentMonth: payload,
      })
    );

    if (!res.error) {
      const { users, ...paginationData } = res.payload.data;
      setUssdBodyData(users);
      setUssdPaginationData({ ...paginationData, date });
      setTotalPages(paginationData.totalPages);
    }
  };

  useEffect(() => {
    fetchAllUssdUsers();
  }, []);

  const onRefresh = () => {
    fetchAll();
    fetchAllUssdUsers();
  };

  const onSwitch = (key) => {
    setSelectedKey(key);
  };

  useEffect(() => {
    onRefresh();
  }, []);
  const data = [
    {
      title: "USSD Users",
      data: ussdBodyData,
      totalPages: ussdPaginationData?.totalPages,
      paginationData: ussdPaginationData,
      filterHandler: filterUssdUsers,
      searchHandler: searchUssdUsers,
      fetch: fetchAllUssdUsers,

      columns: [
        {
          title: "Full Name",
          dataIndex: "fullname",
          key: "fullname",
          // render: (text) => <a>{text}</a>,
        },
        {
          title: "LGA/LCDA",
          dataIndex: "lcd",
        },
        {
          title: "Customer Phone",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Gender",
          dataIndex: "gender",
          key: "gender",
        },

        // {
        //   title: "Action",
        //   dataIndex: "action",
        //   key: "action",
        //   render: (text, record) => (
        //     <Space size="middle">
        //       <StyledButton
        //         type=""
        //         buttonStyle="btn--primary--outline"
        //         buttonSize="btn--small"
        //         onClick={() => {
        //           setRowInfo(record);
        //           setShowModal(true);
        //         }}
        //       >
        //         See More
        //       </StyledButton>
        //       {/* <a>See More</a> */}
        //     </Space>
        //   ),
        // },

        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => {
            return (
              <Space size="middle">
                <Link
                  to={{
                    pathname: `/admin/user_details/${record._id}`,
                    state: { renewal: false },
                    // id: record.key
                  }}
                >
                  <StyledButton
                    type=""
                    buttonStyle="btn--primary--outline"
                    buttonSize="btn--small"
                    onClick={() => {
                      setRowInfo(record);
                      // setShowModal(true);
                    }}
                  >
                    See More
                  </StyledButton>
                  {/* <a>See More</a> */}
                </Link>
              </Space>
            );
          },
        },
      ],
    },
    {
      title: "Mobile Users",
      data: bodyData,
      totalPages: paginationData?.totalPages,
      paginationData: paginationData,
      filterHandler: onFilter,
      searchHandler: onSearch,
      fetch: fetchAll,
      columns: [
        {
          title: "Full Name",
          dataIndex: "fullname",
          key: "fullname",
          // render: (text) => <a>{text}</a>,
        },
        {
          title: "LGA/LCDA",
          dataIndex: "lcd",
        },
        {
          title: "Customer Phone",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Gender",
          dataIndex: "gender",
          key: "gender",
        },

        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => {
            return (
              <Space size="middle">
                <Link
                  to={{
                    pathname: `/admin/user_details/${record._id}`,
                    state: { renewal: false },
                    // id: record.key
                  }}
                >
                  <StyledButton
                    type=""
                    buttonStyle="btn--primary--outline"
                    buttonSize="btn--small"
                    onClick={() => {
                      setRowInfo(record);
                      // setShowModal(true);
                    }}
                  >
                    See More
                  </StyledButton>
                  {/* <a>See More</a> */}
                </Link>
              </Space>
            );
          },
        },
      ],
    },
  ];
  return (
    <>
      <InfoModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={rowInfo}
        userData={rowInfo}
      />
      <div className="flex flex-col gap-3">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 container">
          {totalUserCopy?.map((el, i) => {
            return (
              <ContentCard
                ImgUrl={el.icon}
                title={el.title}
                // amount={Result[el.key]}
                amount={el.user}
                style={{ color: colors[i] }}
                link={el.link}
                key={i}
              />
            );
          })}
        </div>
        <Tabcontent
          data={data}
          totalPages={totalPages}
          onRefresh={onRefresh}
          setCurrentPage={setCurrentPage}
          onSwitch={onSwitch}
        />
        {/* <DataTable
          data={bodyData || []}
          columns={columns}
          header
          onSearch={onSearch}
          onFilter={onFilter}
          onRefresh={onRefresh}
          setCurrentPage={setCurrentPage}
          totalPages={paginationData?.totalPages}
          paginationData={paginationData}
          onFetch={fetchAll}
        /> */}
      </div>
    </>
  );
};

export default TotalUser;
