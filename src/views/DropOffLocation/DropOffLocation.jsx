import React, { useEffect, useState } from "react";
import DataTable from "../../components/UI/Table";
import { Tag, Space } from "antd";
import StyledButton from "../../components/UI/btn";
import InfoModal from "../../components/UI/InfoModal";
import { infoData } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  filterdDropoffLocations,
  getDropoffLocations,
  searchDropoffLocations,
} from "../../store/actions";
import responsiveObserve from "antd/lib/_util/responsiveObserve";

const DropOffLocation = () => {
  const [paginationData, setPaginationData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [rowInfo, setRowInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fetchedDrops, setFetchedDrops] = useState([]);
  const date = new Date();
  const dispatch = useDispatch();

  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      searchDropoffLocations({
        key,
        page,
      })
    );
    if (!res.error) {
      const { drops, ...paginationData } = res.payload.data;
      setFetchedDrops(drops);
      setPaginationData({ ...paginationData, key });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onFilter = async (date, page = 1) => {
    const res = await dispatch(
      filterdDropoffLocations({
        page,
        currentMonth: date,
      })
    );
    if (!res.error) {
      const { drops, ...paginationData } = res.payload.data;

      setFetchedDrops(drops);
      setPaginationData({ ...paginationData, date });
      setTotalPages(paginationData.totalPages);
    }
  };

  const columns = [
    {
      title: "Organization’s Name",
      dataIndex: "organisation",
      key: "organisation",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Organization’s Address",
      dataIndex: "location",
      key: "location",
      render: (location) => <p>{location.address}</p>,
    },
    {
      title: "Customer Phone",
      dataIndex: "phone",
      key: "phone",
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
    //     </Space>
    //   ),
    // },
  ];

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      getDropoffLocations({ page, currentMonth: payload })
    );

    if (!res.error) {
      const { drops, ...paginationData } = res.payload.data;
      setFetchedDrops(drops);
      setPaginationData({ ...paginationData, currentMonth: payload });
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
      {/* <InfoModal
        showModal={showModal}
        setShowModal={setShowModal}
        userData={rowInfo}
      /> */}
      <DataTable
        data={fetchedDrops || []}
        columns={columns}
        header
        onSearch={onSearch}
        onRefresh={onRefresh}
        onFetch={fetchAll}
        onFilter={onFilter}
        setCurrentPage={setCurrentPage}
        paginationData={paginationData}
        totalPages={paginationData?.totalPages}
      />
    </>
  );
};

export default DropOffLocation;
