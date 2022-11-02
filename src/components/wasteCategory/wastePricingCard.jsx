import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import FormInput from "../auth/FormInput";
import useForm from "../../hooks/useForm";
import { FlexContainer, FormContainer } from "../../components/styledElements";

const WastePickerContainer = styled.div`
  display: grid;
  grid-template-coloumns: auto 1fr;
  gap: 20px;
`;

const WastePricingCard = ({ name, wastepicker }) => {
  const [values, setValues] = useState({
    name: {
      label: name,
      value: wastepicker,
      placeholder: "Type Waste Category",
      rules: [(v) => !!v || "Waste Category is required"],
      disabled: true,
    },
  });
  const { setValue, formValues, errorMsgs } = useForm(values);

  return (
    <>
      <FormContainer>
        {Object.entries(values).map(([key, input], index) => (
          <div className="!w-full grid gap-x-10 mt-5">
            <FormInput
              placeholder={input.placeholder}
              type={input.type}
              label={input.label}
              key={key}
              height="3.5rem"
              changeHandler={(e) => setValue(key, e.target.value)}
              errorMsg={errorMsgs[key]}
              value={formValues[key]}
              disabled={input.disabled}
            />
          </div>
        ))}
      </FormContainer>
    </>
  );
};

export default WastePricingCard;
