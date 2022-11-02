import React from "react";
import { PaginationTab } from "../styledElements";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function PaginationBars({
  totalResult,
  page,
  resultsPerPage,
  pullData = () => null,
}) {
  const [lowBound, upBound] = [
    totalResult === 0 ? 0 : (page - 1) * resultsPerPage + 1,
    totalResult > page * resultsPerPage ? page * resultsPerPage : totalResult,
  ];
  return (
    <div className="ml-auto flex items-center space-x-2">
      <span className="mr-3">{`${lowBound} - ${upBound} of ${totalResult}`}</span>
      <PaginationTab
        onClick={() => {
          if (lowBound <= 1) return;
          pullData(page - 1);
        }}
        fade={lowBound <= 1}
      >
        <FaAngleLeft size="15" />
      </PaginationTab>
      <PaginationTab
        onClick={() => {
          if (upBound === totalResult) return;
          // console.log("It's fine: ", upBound === totalResult);
          pullData(page + 1);
        }}
        fade={upBound === totalResult}
      >
        <FaAngleRight size="15" />
      </PaginationTab>
    </div>
  );
}

export default PaginationBars;
