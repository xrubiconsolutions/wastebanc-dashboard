import React, { useEffect, useReducer, useRef, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import styled from "styled-components";
import tw from "twin.macro";
import { Label } from "./Checkbox";
import Checkbox from "./Checkbox";
import {
  DropdownContainer,
  OptionItem,
  OptionTitle,
  SelectSearch,
} from "../styledElements";
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";

const SelectInput = styled.div`
  ${tw`overflow-ellipsis border border-secondary w-auto flex justify-between items-center rounded-md cursor-pointer  pl-4 pr-2 bg-transparent text-base text-body`}
  height: ${(props) => props.height || "40px"};
  width: ${(props) => props.width || "180px"};
  border-color: ${(props) => (props.plain ? "#bdbdbd" : "#295011")};
  + div {
    width: ${(props) => props.width || "180px"};
  }
  background-color: ${(props) => props.disabled && "rgba(229, 231, 235)"};
`;

function Select({
  options = [],
  title = "",
  optionIdx = "",
  label,
  changeHandler = () => null,
  disabled = false,
  checkbox = false,
  search = true,
  ...props
}) {
  const [currentVal, setCurrentVal] = useState(options[optionIdx]);
  const [showDrop, toggle] = useReducer((init, state) => !state, false);
  const [availOptions, setOptions] = useState(options);

  const wrapperRef = useRef();
  useOutsideAlerter(wrapperRef, () => toggle(true));

  useEffect(() => {
    options && setCurrentVal(options[optionIdx]);
  }, [optionIdx]);

  useEffect(() => {
    if (!options || (options.length === 0 && availOptions.length === 0)) return;
    setOptions(options);
  }, [options]);

  const changeValue = (val) => {
    setCurrentVal(val);
    changeHandler(val.value);
    !checkbox && toggle(showDrop);
  };

  return (
    <div className="relative mb-8" ref={wrapperRef}>
      {!!label && (
        <Label htmlFor={label}>{label[0].toUpperCase() + label.slice(1)}</Label>
      )}

      <SelectInput
        onClick={() => !disabled && toggle(showDrop)}
        disabled={disabled}
        {...props}
      >
        <p
          className={`overflow-ellipsis whitespace-nowrap overflow-hidden ${
            currentVal ? "text-body" : "text-gray-400"
          }`}
        >
          {currentVal?.text || title}
        </p>
        {showDrop ? (
          <FaCaretUp size="10" className="inline ml-3" />
        ) : (
          <FaCaretDown size="10" className="inline ml-3" />
        )}
      </SelectInput>
      {showDrop && (
        <DropdownContainer {...props}>
          <span className="w-full flex justify-between items-center">
            <OptionTitle>{title}</OptionTitle>
            <FaCaretDown size="15" className="" />
          </span>
          {options?.length >= 15 && (
            <SelectSearch
              onChange={(e) => {
                const ops = options.filter(
                  (op) =>
                    op.text
                      .toUpperCase()
                      .indexOf(e.target.value.toUpperCase()) > -1
                );
                setOptions(ops);
              }}
            />
          )}
          {availOptions.map(({ value, text, id }) => (
            <OptionItem
              key={id || value}
              value={value}
              onClick={() => changeValue({ value, text })}
            >
              {checkbox ? <Checkbox label={text} /> : text}
            </OptionItem>
          ))}
        </DropdownContainer>
      )}
    </div>
  );
}

export default Select;
