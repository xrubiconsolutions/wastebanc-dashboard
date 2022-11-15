import React, { useEffect, useState } from "react";
import DataTable from "../../components/UI/Table";
import { Tag, Space } from "antd";
import StyledButton from "../../components/UI/btn";
import Modal from "../../components/UI/modal";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  companySearchDropoff,
  filterCompanyDropoff,
  getCompanyDropoff,
} from "../../store/actions/dropOffAction";
const DropOff = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPostAction, setPostAction] = useState(false);
  const dispatch = useDispatch();
  const [bodyData, setBodyData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationData, setPaginationData] = useState();

  const date = new Date();
  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };
  const approveHandler = async () => {
    setShowModal(false);
    setPostAction(true);
  };

  const { error } = useSelector((state) => state.app);

  const thisMonth = useSelector((state) => state?.dropOff);
  const { companyTotalDropOff } = thisMonth;

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      companySearchDropoff({
        key: key || "",
        page,
      })
    );
    if (!res.error) {
      const { dropoffs, ...paginationData } = res.payload.data;
      setBodyData(dropoffs);
      setPaginationData({ ...paginationData });
      setTotalPages(paginationData.totalPages);
    }
  };

  const onFilter = async (date, page = 1) => {
    const res = await dispatch(
      filterCompanyDropoff({
        currentMonth: payload,
        page,
      })
    );
    if (!res.error) {
      const { dropoffs, ...paginationData } = res.payload.data;
      setBodyData(dropoffs);
      setPaginationData({ ...paginationData });
      setTotalPages(paginationData.totalPages);
    }
  };

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      getCompanyDropoff({ currentMonth: payload, page })
    );
    console.log("Fetching all", res);
    if (!res.error) {
      const { dropoffs, ...paginationData } = res.payload.data;
      setBodyData(dropoffs);
      setPaginationData({ ...paginationData });
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
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Waste Category",
      dataIndex: "categories",
      key: "categories",
      render: (wastes) => (
        <span>
          {(wastes.slice(0, 3) || []).map((waste) => {
            return <Tag key={waste}>{waste?.name || waste}</Tag>;
          })}
        </span>
      ),
    },
    {
      title: "Customer Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Waste Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => (
        <p className="space-x-2 ">
          {text}
          <span>Kg</span>
        </p>
      ),
    },
    {
      title: "Date",
      dataIndex: "dropOffDate",
      key: "dropOffDate",
      render: (text) => <p>{moment(text).format("YYYY-MM-DD")}</p>,
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
    //         onClick={approveHandler}
    //       >
    //         Accept
    //       </StyledButton>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <>
      <Modal
        show={showPostAction}
        close={() => {
          setPostAction(false);
        }}
        type="postAction"
        color={error && "#F5000F"}
      >
        <p>{!error ? `Drop-Off Request Accepted` : error}</p>
      </Modal>

      <div>
        <DataTable
          data={bodyData || []}
          columns={columns}
          refreshUrl="drop-off"
          header
          onSearch={onSearch}
          onFilter={onFilter}
          onRefresh={onRefresh}
          setCurrentPage={setCurrentPage}
          paginationData={paginationData}
          totalPages={paginationData?.totalPages}
          onFetch={fetchAll}
        />
      </div>
    </>
  );
};

export default DropOff;
