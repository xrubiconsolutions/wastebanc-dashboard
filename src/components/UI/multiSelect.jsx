import React, { useEffect, useReducer, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp, FaCaretDown, FaTimes } from "react-icons/fa";
import styled from "styled-components";
import tw from "twin.macro";
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";
import { FlexContainer } from "../styledElements";
import { Label } from "./Checkbox";
import SearchInput from "./searchInput";

const SelectInput = styled.div`
  ${tw`overflow-ellipsis border border-secondary
   w-auto rounded-md cursor-pointer pl-4 pr-2 py-2 bg-transparent text-base text-body`}
  width: ${(props) => props.width || "150px"};
  background-color: ${(props) => props.disabled && "rgba(229, 231, 235)"};
  min-height: ${(props) => props.height || "3.5rem"};
  border-color: ${(props) => (props.plain ? "#bdbdbd" : "#295011")};
  + div {
    width: ${(props) => props.width || "150px"};
  }
`;

const DropdownContainer = styled.div`
  ${tw`rounded-lg z-10 overflow-y-scroll shadow-xl p-5 pl-1 w-56 space-y-3 absolute bg-white`}
  max-height: 20rem;
  ::-webkit-scrollbar {
    width: 0.2rem;
  }
  ::-webkit-scrollbar-track {
    // box-shadow: -2px 2px 2px, 2px -2px 2px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border: 2px solid grey;
  }
`;

const OptionItem = styled.p`
  ${tw`text-sm text-body cursor-pointer hover:bg-gray-200 py-1 pl-2`}
`;
const OptionTitle = styled.p`
  ${tw`text-base text-body pl-2 whitespace-nowrap overflow-hidden`}
`;

const PickedTab = styled.span`
  ${tw`bg-gray-200 rounded-lg mr-4 my-1 text-sm`}
  padding: 2px 10px;
`;

const SelectSearch = styled(SearchInput)`
  ${tw`w-full border-transparent`}
`;

const MultiSelect = ({
  options = [],
  title = "",
  optionIdxs = null,
  label,
  disabled = false,
  changeHandler = () => null,
  ...props
}) => {
  const initialState =
    optionIdxs?.filter((v) => v > -1).map((idx) => options[idx]) || [];
  const [currentVal, setCurrentVal] = useState(initialState);
  const [showDrop, toggle] = useReducer((init, state) => !state, false);
  const [availOptions, setOptions] = useState(options);

  const wrapperRef = useRef();
  useOutsideAlerter(wrapperRef, () => toggle(true));

  const selectAll = () => {
    setCurrentVal(options);
    changeHandler(options.map((v) => v.value));
  };

  const clearAll = () => {
    setCurrentVal([]);
    changeHandler([]);
  };

  const changeValue = (val) => {
    const duplicate = currentVal.findIndex((i) => i.value === val.value);
    if (duplicate > -1) return;
    setCurrentVal([...currentVal, val]);
    changeHandler([...currentVal, val].map((v) => v.value));
  };

  const popCurrentVal = () => {
    const [_, ...items] = currentVal;
    setCurrentVal(items);
    changeHandler(items.map((v) => v.value));
  };

  const removeItem = (id) => {
    const items = currentVal.filter((_, idx) => idx !== id);
    setCurrentVal(items);
    changeHandler(items.map((i) => i.value));
  };

  useEffect(() => {
    setOptions(options);
  }, [options]);

  useEffect(() => {
    let tempIdxs = [];
    if (optionIdxs) tempIdxs = optionIdxs;
    setCurrentVal(
      tempIdxs?.filter((v) => v > -1).map((idx) => options[idx]) || []
    );
  }, [optionIdxs]);

  return (
    <div className="relative mb-8" ref={wrapperRef}>
      {!!label && (
        <Label htmlFor={label}>{label[0].toUpperCase() + label.slice(1)}</Label>
      )}

      <SelectInput disabled={disabled} {...props}>
        {currentVal && currentVal.length > 0 && options?.length > 0 && (
          <FlexContainer className="flex-wrap border-b-2 border-gray-200 py-2 max-h-[350px] overflow-y-scroll">
            {currentVal.map((val, idx) => (
              <PickedTab key={val + idx}>
                {val?.text}
                <FaTimes
                  className="ml-2 inline text-body"
                  size={12}
                  onClick={() => removeItem(idx)}
                />
              </PickedTab>
            ))}
            <FaTimes
              size={20}
              className="text-gray-400 sticky bottom-0 ml-auto"
              onClick={clearAll}
            />
          </FlexContainer>
        )}
        <FlexContainer
          className="justify-between w-full mt-2"
          onClick={() => !disabled && toggle(showDrop)}
        >
          <p
            className={`overflow-ellipsis whitespace-nowrap overflow-hidden text-gray-400`}
          >
            {currentVal?.text || title}
          </p>
          {showDrop ? (
            <FaAngleUp size="12" className="inline ml-3" />
          ) : (
            <FaAngleDown size="12" className="inline ml-3" />
          )}
        </FlexContainer>
      </SelectInput>
      {showDrop && (
        <DropdownContainer {...props}>
          <span className="w-full flex justify-between items-center">
            <OptionTitle>{title}</OptionTitle>
            <FaCaretDown size="15" className="" />
          </span>
          <SelectSearch
            onChange={(e) => {
              const ops = options.filter(
                (op) =>
                  op.text.toUpperCase().indexOf(e.target.value.toUpperCase()) >
                  -1
              );
              setOptions(ops);
            }}
          />
          <OptionItem key={"all"} value="all" onClick={selectAll}>
            Select all
          </OptionItem>
          {availOptions.map(({ value, text }, id) => (
            <OptionItem
              key={value + id}
              value={value}
              onClick={() => changeValue({ value, text })}
            >
              {text}
            </OptionItem>
          ))}
        </DropdownContainer>
      )}
    </div>
  );
};

export default MultiSelect;
