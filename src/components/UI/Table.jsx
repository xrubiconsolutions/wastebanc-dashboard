import { Table, Tag, Radio, Space, Pagination } from "antd";
import { useState, useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";
import tw from "twin.macro";
import styled from "styled-components";
import { CSVLink } from "react-csv";
import { useLocation } from "react-router";
import SearchBar from "./SearchBar";
import { PageTitle } from "../../utils/data";
import StyledButton from "./btn";
import Filter from "./Filter";
import { FlexContainer } from "../styledElements";
import { FaAngleLeft } from "react-icons/fa";
import PaginationBars from "./Paginationbars";
import { convertToCSV } from "../../utils";
// import Pagination from '../../views/Pagination/Pagination';

const topOptions = [
  { label: "topLeft", value: "topLeft" },
  { label: "topCenter", value: "topCenter" },
  { label: "topRight", value: "topRight" },
  { label: "none", value: "none" },
];

const bottomOptions = [
  { label: "bottomLeft", value: "bottomLeft" },
  { label: "bottomCenter", value: "bottomCenter" },
  { label: "bottomRight", value: "bottomRight" },
  { label: "none", value: "none" },
];

const TableContainer = styled.div`
  ${tw`bg-white h-full`}
  overflow-y: scroll;
`;
const FilterFix = styled.div`
  // margin-left: 36rem;
  display: ${({ raffle }) => (raffle ? "none" : "")};
  // margin-top: 20px;
`;
const RefeshContainer = styled.button`
  ${tw`flex items-center gap-2  text-base`}
  cursor: pointer;
  // position: absolute;
  // top: 10px;
  // margin-bottom: -40px;
`;
const PaginationContainer = styled.div`
  ${tw`flex items-center justify-between w-full  overflow-x-hidden`}
  padding: .5rem 1.5rem;
`;
const FilterCSVHandler = styled.div`
  ${tw`flex items-center md:flex-row flex-col gap-4`}
`;

const DataTable = ({
  data,
  columns,
  loading,
  refreshUrl,
  header,
  onRow,
  raffle,
  onSearch,
  onFilter,
  onFetch,
  onRefresh,
  setCurrentPage,
  totalPages,
  paginationData,
  noFilter,
  nopagination,
  showFilter,
  showSearchBar,
}) => {
  const location = useLocation();
  const getTitle = location.pathname.split("/");
  let getTitleEnum = getTitle[getTitle.length - 1];
  const pageSize = 20;

  const handleRefresh = () => {
    onRefresh();
  };

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const pullData = (page) => {
    // console.log(paginationData, "paginationData");
    if (
      !paginationData.key &&
      !(paginationData.date?.start || paginationData.date?.end)
    ) {
      onFetch(page);
      return;
    }
    paginationData.key
      ? onSearch(paginationData.key, page)
      : onFilter(paginationData.date, page);
  };

  return (
    <TableContainer>
      <div>
        {header ? (
          <>
            <div className="flex justify-between items-center px-5 py-2">
              {!showSearchBar && <SearchBar onSearch={onSearch} />}

              <FilterCSVHandler>
                <FilterFix raffle={raffle} show={noFilter}>
                  {!showFilter && <Filter onFilter={onFilter} />}
                </FilterFix>

                {data && (
                  <StyledButton
                    raffle
                    buttonStyle="btn--primary--outline"
                    buttonSize="btn--small"
                    // className="hidden md:block"
                  >
                    <CSVLink
                      data={data && convertToCSV(data)}
                      filename={PageTitle[getTitleEnum]}
                      className="text-secondary hover:text-white font-semibold"
                    >
                      Export as CSV
                    </CSVLink>
                  </StyledButton>
                )}
              </FilterCSVHandler>
            </div>
            <hr />
          </>
        ) : null}
      </div>
      <>
        <PaginationContainer>
          <RefeshContainer
            // style={{ marginBottom: -40 }}
            onClick={() => handleRefresh()}
          >
            <IoMdRefresh style={{ fontSize: "1.3rem" }} /> Refresh
          </RefeshContainer>

          {!paginationData ? (
            !nopagination ? (
              <Pagination
                simple
                defaultCurrent={1}
                pageSize={pageSize}
                total={totalPages}
                onChange={onChange}
                // defaultPageSize={20}
              />
            ) : null
          ) : (
            <PaginationBars {...paginationData} pullData={pullData} />
          )}
        </PaginationContainer>
        <Table
          loading={loading}
          columns={columns}
          onRow={onRow}
          // pagination={{
          //   position: ["topRight"],
          //   pageSize: pageSize,
          //   total: totalPages,
          //   onChange: onChange,
          // }}
          pagination={false}
          dataSource={data}
          responsive={true}
          scroll={{ x: 800 }}
          sticky={true}
        ></Table>
      </>
    </TableContainer>
  );
};
export default DataTable;
