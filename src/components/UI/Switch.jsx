import React, { useEffect, useState } from "react";
import { FlexContainer, FormContainer } from "../../components/styledElements";
import FormInput from "../../components/auth/FormInput";
import useForm from "../../hooks/useForm";
import WastePricingCard from "../../components/wasteCategory/wastePricingCard";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "antd";
import styled from "styled-components";
import tw from "twin.macro";

const WasteCategoryList = styled.div`
  ${tw`bg-white`}
`;

const options = [
  {
    label: "YES",
    value: true,
  },
  {
    label: "NO",
    value: false,
  },
];

const Switch = ({ res, setValue3, value3 }) => {
  const onChange3 = ({ target: { value } }) => {
    setValue3(value);
  };

  return (
    <div className="flex item-center flex-col justify-between space-y-6 w-full">
      <div className="flex items-center justify-start space-x-5 ">
        <p className="font-semibold">Do you want a waste picker?</p>
        <Radio.Group
          options={options}
          onChange={onChange3}
          value={value3}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      {value3 === true ? (
        // <FormContainer>
        <>
          <div className="!w-full grid md:grid-cols-3 gap-x-5 items-center">
            {res?.map(({ name, _id, value, wastepicker }, i) => {
              return (
                <WastePricingCard
                  name={name}
                  id={_id}
                  key={i}
                  value={value}
                  wastepicker={wastepicker}
                  disabled={true}
                />
              );
            })}
          </div>
          {/* // </FormContainer> */}
        </>
      ) : null}
      {value3 === false && (
        <p className="text-center text-lg font-bold text-primary pb-4">
          No Waste Picker Selected
        </p>
      )}
    </div>
  );
};

export default Switch;
