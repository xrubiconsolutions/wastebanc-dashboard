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
} from "../../store/actions";
import moment from "moment";
import { useHistory, useLocation } from "react-router";
import StyledButton from "../../components/UI/btn";

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
  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const columns = [
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
      render: (text, record) => (
        <Space size="middle">
          <StyledButton
            type=""
            buttonStyle="btn--primary--outline"
            buttonSize="btn--small"
            onClick={() => {
              setRowInfo(record);
              setShowModal(true);

              // console.log(record, "record");
            }}
          >
            See More
          </StyledButton>
          {/* <a>See More</a> */}
        </Space>
      ),
    },
  ];

  // console.log(rowInfo, "info")

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

  // useEffect(() => {
  //   if (!currentMonthClient) {
  //     const payload = {
  //       page: currentPage,
  //       currentMonth,
  //     };
  //     dispatch(currentMonthUser(payload));
  //   } else {
  //     setBodyData(currentMonthClient?.users);
  //   }
  // }, []);
  // useEffect(() => {
  //   if (!allUser) dispatch(totalUser());
  // }, []);

  // useEffect(() => {
  //   setBodyData(currentMonthClient?.users);
  //   setTotalPages(currentMonthClient?.totalResult);
  // }, [currentMonthClient]);
  // console.log(currentMonthClient, 'currentMonthClient')

  useEffect(() => {
    if (!allUser) dispatch(totalUser());
  }, []);

  const totalUserCopy = TotalCardUser.map((el) => {
    return { ...el };
  });

  totalUserCopy[0].user = allUser?.male;
  totalUserCopy[1].user = allUser?.female;
  totalUserCopy[2].user = allUser && allUser?.female + allUser?.male;
  // console.log(totalUserCopy);

  // useEffect(() => {
  //   const payload = {
  //     page: currentPage,
  //     currentMonth,
  //   };
  //   dispatch(currentMonthUser(payload));
  // }, [currentPage]);

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

  const onRefresh = () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <InfoModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={rowInfo}
        userData={rowInfo}
      />
      <div className="flex flex-col gap-3">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 container ">
          {totalUserCopy?.map((el, i) => {
            return (
              <ContentCard
                ImgUrl={el.icon}
                title={el.title}
                // amount={Result[el.key]}
                amount={el.user}
                style={{ color: colors[i] }}
                key={i}
              />
            );
          })}
        </div>
        <DataTable
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
        />
      </div>
    </>
  );
};

export default TotalUser;
