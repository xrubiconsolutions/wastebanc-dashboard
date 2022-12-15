import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useHistory } from "react-router";

// history back
export const Back = () => {
  const history = useHistory();
  return (
    <div
      className="flex items-center justify-center pt-5 hover:cursor-pointer"
      onClick={() => history.goBack()}
    >
      <IoIosArrowBack /> <span className="pl-2 text-sm">Back</span>
    </div>
  );
};
