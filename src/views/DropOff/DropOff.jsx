import React, { useEffect, useState } from "react";
import DataTable from "../../components/UI/Table";
import { Tag, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  currentMonthDropoff,
  filterDropoff,
  searchDropoff,
} from "../../store/actions";
import { truncate } from "../../utils/constants";
import { Popover } from "antd";

const DropOff = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationData, setPaginationData] = useState();
  const [bodyData, setBodyData] = useState();
  const dispatch = useDispatch();
  const d = new Date();
  d.setDate(d.getDate());
  const payload = {
    start: "2010-01-01",
    end: d,
  };

  const onSearch = async (key, page = 1) => {
    const res = await dispatch(
      searchDropoff({
        key,
        page,
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
      filterDropoff({
        page,
        currentMonth: date,
      })
    );
    if (!res.error) {
      const { dropoffs, ...paginationData } = res.payload.data;
      setBodyData(dropoffs);
      setPaginationData({ ...paginationData, date });
      setTotalPages(paginationData.totalPages);
    }
  };

  const thisMonth = useSelector((state) => state?.dropOff);
  const { currentMonthTotalDropOff } = thisMonth;

  const fetchAll = async (page = 1) => {
    const res = await dispatch(
      currentMonthDropoff({
        page,
        currentMonth: payload,
      })
    );
    if (!res.error) {
      const { dropoffs, ...paginationData } = res.payload.data;
      setBodyData(dropoffs);
      setPaginationData({ ...paginationData, currentMonth: payload });
    }
  };

  const onRefresh = () => {
    fetchAll();
  };

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    setBodyData(currentMonthTotalDropOff?.dropoffs);
    setTotalPages(currentMonthTotalDropOff?.totalResult);
  }, [currentMonthTotalDropOff]);

  const columns = [
    {
      title: "Organization",
      dataIndex: "organisation",
      key: "organisation",
      // render: (text) => <a>{text}</a>,
    },
    // {
    //   title: "Waste Category",
    //   dataIndex: "categories",
    //   key: "categories",
    //   render: (wastes) => (
    //     <span>
    //       {wastes?.map((waste) => (
    //         <Tag key={waste}>{waste?.name || waste}</Tag>
    //       ))}
    //     </span>
    //   ),
    // },

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
  ];

  return (
    <div>
      <DataTable
        data={bodyData || []}
        columns={columns}
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
  );
};

export default DropOff;
