import React, { useState } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import styled from "styled-components";
import tw from "twin.macro";
import { DropdownContainer, OptionItem, SelectSearch } from "../styledElements";
import Checkbox from "./Checkbox";

const InputContainer = styled.div`
  ${tw`relative`}
`;

const Input = styled.input`
  ${tw`border border-secondary w-auto outline-none rounded-md pl-8 pr-2 text-base text-body`}
  height: 40px;
  width: ${(props) => props.width || "150px"};
  + div {
    width: ${(props) => props.width || "150px"};
  }
  ::placeholder {
    font-size: 14px;
    color: #295011;
  }
`;

const SearchInput = ({ availOptions = [], ...props }) => {
  const [showDrop, toggle] = useState();
  return (
    <div className="relative">
      <InputContainer>
        <Input type="search" placeholder="Search" {...props} />
        <FaSearch size="20" className="absolute text-secondary top-3 left-2" />
      </InputContainer>
      {availOptions.length > 0 && (
        <DropdownContainer>
          {availOptions.map((value, idx) => (
            <OptionItem
              key={idx}
              value={value}
              // onClick={() => changeValue({ value, text })}
            >
              {value}
            </OptionItem>
          ))}
        </DropdownContainer>
      )}
    </div>
  );
};

export default SearchInput;
