import React, { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Checkbox from "./Checkbox";
import { DropdownContainer as DC, OptionTitle as OT } from "../styledElements";
import Button from "./button";
import { FiPlusCircle } from "react-icons/fi";
import SearchInput from "./searchInput";
import StyledButton from "./btn";

const DropdownContainer = styled(DC)`
  ${tw`left-[-90%] space-y-6 p-5 max-h-[auto]`};
  max-height: 100vh;
`;

const OptionTitle = styled(OT)`
  ${tw`font-bold text-black leading-[24px]`}
`;

const Search = styled(SearchInput)`
  ${tw`w-full`}
`;

export const OptionItem = styled.span`
  ${tw`text-sm text-body cursor-pointer py-1 pl-2`}
`;

const initOptions = [];

function CategorySelect({
  options = initOptions,
  categories = [],
  optionIdxs = null,
  label,
  setCategories = () => null,
  ...props
}) {
  const [currentVal, setCurrentVal] = useState(categories);
  const [showDrop, toggle] = useReducer((init, state) => !state, false);
  const [availOptions, setOptions] = useState(options);

  useEffect(() => {
    setOptions(options);
  }, [options]);

  useEffect(() => {
    if (optionIdxs)
      setCurrentVal(
        optionIdxs?.filter((v) => v > -1).map((idx) => options[idx]) || []
      );
  }, [optionIdxs]);

  const changeValue = (e, val) => {
    const newState = !e.target.checked
      ? currentVal.filter((v) => v.value !== val.value)
      : [...currentVal, val];
    setCurrentVal(newState);
  };
  return (
    <div className="relative">
      <Button type="outline" height="40px" onClick={() => toggle(showDrop)}>
        <FiPlusCircle size="22" className="mr-2" />
        Add Category
      </Button>
      {showDrop && (
        <DropdownContainer width="20rem" {...props}>
          <span className="w-full flex justify-between items-center">
            <OptionTitle>Waste Category</OptionTitle>
          </span>
          <Search
            placeholder="Search for categories"
            onChange={(e) => {
              const ops = options.filter(
                (op) =>
                  op.text.toUpperCase().indexOf(e.target.value.toUpperCase()) >
                  -1
              );
              setOptions(ops);
            }}
          />
          {availOptions.map(({ value, text, id }) => (
            <OptionItem key={id || value} value={value}>
              <Checkbox
                key={id}
                label={text}
                textType="light"
                onChange={(e) => changeValue(e, { value, text })}
                defaultChecked={
                  currentVal.findIndex((v) => v.value === value) > -1
                }
              />
            </OptionItem>
          ))}
          <StyledButton
            onClick={() => {
              setCategories(currentVal);
              toggle(showDrop);
            }}
            buttonSize={"btn--medium"}
          >
            confirm
          </StyledButton>
        </DropdownContainer>
      )}
    </div>
  );
}

export default CategorySelect;
