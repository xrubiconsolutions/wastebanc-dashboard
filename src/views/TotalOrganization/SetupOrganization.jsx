import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FlexContainer, FormContainer } from "../../components/styledElements";
import FormInput from "../../components/auth/FormInput";
// import { adminPermissions } from "../../utils/constants";
import { useHistory } from "react-router-dom";
import MultiSelect from "../../components/UI/multiSelect";
import Select from "../../components/UI/select";
import CategorySelect from "../../components/UI/CategorySelect";
import Button from "../../components/UI/button";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAreas,
  createOrganisation,
  getOrganisations,
  getCategory,
  getAllLocations,
  getStateAreas,
  getSubAreas,
} from "../../store/actions";
import { MessageContainer } from "../../components/styledElements";
import moment from "moment";
import { formatSelectOptions } from "../../utils";

const SetupOrganizationContainer = styled.div`
  ${tw`grid items-center gap-4 w-full`}
`;
const InfoContainer = styled.div`
  ${tw`bg-white pt-4 pb-1 px-10`}
`;
const FormTitle = styled.h1`
  ${tw`text-2xl font-extrabold tracking-wide `}
`;
// const DocumentContainer = styled.div`
//   ${tw`bg-white pt-8 pb-4 px-10`}
// `;
const WastePricingContainer = styled.div`
  ${tw`bg-white pt-8 pb-2 px-10 min-h-[30vh]`}
`;

const bioFormEntries = {
  name: {
    label: "Name",
    value: "",
    placeholder: "Organisation Name",
    rules: [(v) => !!v || "Company Name is required"],
  },
  phone: {
    label: "Contact Line",
    value: "",
    placeholder: "Organisation Contact",
    rules: [
      (v) => !!v || "Contact Line is required",
      (v) =>
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v) ||
        "contact line is invalid",
    ],
  },
  email: {
    label: "Email Address",
    value: "",
    placeholder: "Organisation Email",
    rules: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "▲ E-mail must be valid",
    ],
  },
  address: {
    label: "Address",
    value: "",
    placeholder: "Organization Location",
    rules: [(v) => !!v || "Company Address is required"],
  },
};
const documentsFormEntries = {
  RCNumber: {
    label: "RC Number",
    value: "",
    placeholder: "RC Number",
    rules: [(v) => !!v || "RCNumber is required"],
  },
  tag: {
    label: "Assign Tag",
    value: "",
    placeholder: "Organisation Tag",
    rules: [(v) => !!v || "Organisation Tag is required"],
  },
  country: {
    label: "Country",
    optionIdx: null,
    type: "select",
    options: [],
    rules: [(v) => !!v || "Country is required"],
  },
  state: {
    label: "State",
    optionIdxs: [],
    type: "select",
    options: [],
    rules: [(v) => !!v || "State is required"],
  },
  areaAccess: {
    label: "Area of Access",
    optionIdxs: [],
    type: "multiselect",
    options: [],
    rules: [(v) => !!v || "Areas of Access is required"],
  },
  lcda: {
    label: "Area Under Selected LCDA",
    optionIdxs: [],
    options: [],
    type: "multiselect",
    rules: [(v) => !!v || "choose some option(s)"],
  },
};

const SetupOrganization = () => {
  const [categories, setCategories] = useState([]);

  // The categories inputs depends on this state, changes made
  // from the CategorySelect affect here.
  const [bodyCategories, setBodyCategories] = useState([]);
  const [catValues, setCatValues] = useState({});
  const [fetchedArea, setFetchedArea] = useState([]);

  const [subAreaOptions, setSubAreaOptions] = useState([]);
  const [fetchedCovArea, setFetchedCovArea] = useState([]);
  const [lcds, setLcds] = useState([]);

  const date = new Date();
  const currentMonth = {
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
      "YYYY-MM-DD"
    ),
  };

  const { setValue, errorMsgs, formValues, isValid } = useForm(bioFormEntries);
  const {
    setValue: setDocVal,
    errorMsgs: docErrMsg,
    formValues: docFormValues,
    isValid: isValidDoc,
  } = useForm(documentsFormEntries);
  const {
    setValue: setCatVal,
    errorMsgs: catErrMsg,
    formValues: catFormValues,
    isValid: isValidCat,
  } = useForm(catValues);

  const {
    app: { error },
    wasteCategory: { category },
    area: { allAreas },
    location: { locations },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    const categoriesEntries = {};
    bodyCategories &&
      bodyCategories.forEach(
        (entry) =>
          (categoriesEntries[entry.value] = {
            label: entry.value,
            value: catFormValues[entry.value] || "",
            placeholder: "Price rate for 1kg",
            type: "number",
            rules: [
              (v) => !!v || "choose some option(s)",
              (v) => /^[0-9]{1,10}$/g.test(v) || "▲ Price must be a number",
            ],
          })
      );

    setCatValues(categoriesEntries);
  }, [bodyCategories]);

  useEffect(() => {
    if (!allAreas) dispatch(getAllAreas());
    if (allAreas) {
      const uniqueAreas = allAreas
        ?.map((area) => area.lga)
        .filter((area, idx, lg) => lg.indexOf(area) === idx)
        .map((area) => ({
          text: area,
          value: area,
        }));

      setFetchedArea(uniqueAreas);
    }
  }, [allAreas, dispatch]);

  useEffect(() => {
    let covArea;

    if (docFormValues.areaAccess) {
      covArea = docFormValues?.areaAccess?.map((selArea) =>
        subAreaOptions?.filter((area) => {
          if (area.lga === selArea) return area.lcd;
        })
      );
    }

    const totalCoverageAreas = [].concat.apply([], covArea);
    setFetchedCovArea(totalCoverageAreas);
  }, [docFormValues.areaAccess]);

  useEffect(() => {
    if (fetchedCovArea) {
      const cArea = fetchedCovArea.map((ca) => ({
        text: ca.lcd,
        value: ca.slug,
      }));

      setLcds(cArea);
    }
  }, [fetchedCovArea]);

  useEffect(() => {
    //fills country select with available countries in locations state
    if (!locations) return;
    const countries = formatSelectOptions(locations, "country");
    documentsFormEntries.country.options = countries;
  }, [locations]);

  useEffect(() => {
    // return if there's no selected country or locations available
    if (!docFormValues.country || !locations) return;

    //get the array of states for the selected country
    const availableStates =
      locations.find((location) => location.country === docFormValues.country)
        .states || [];

    // format the states into the select component options format
    const stateOptions = formatSelectOptions(availableStates);

    // set the state options into the state select component
    documentsFormEntries.state.options = stateOptions;
  }, [docFormValues.country, locations]);

  useEffect(() => {
    // return if state isn't selected
    if (!docFormValues.state) return;

    const handleAreaResponse = async (res) => {
      // format the area response into select options format
      const areaOptions = formatSelectOptions(res.data, "lga");

      // set the available lga options to areaOptions
      documentsFormEntries.areaAccess.options = areaOptions;
      setFetchedArea(areaOptions);

      // fetch the subareas available for the state
      const subAreasResult = await dispatch(getSubAreas(docFormValues.state));
      if (!subAreasResult.error) setSubAreaOptions(subAreasResult.payload.data);
    };

    // request for areas(lgas) of selected state and handle response
    dispatch(getStateAreas(docFormValues.state))
      .unwrap()
      .then(handleAreaResponse)
      .catch((err) => console.log(err));
  }, [docFormValues.state]);

  documentsFormEntries.areaAccess.options = fetchedArea;
  documentsFormEntries.lcda.options = lcds;

  const handleSubmit = () => {
    const orgFormData = {
      companyName: formValues.name,
      email: formValues.email,
      rcNo: docFormValues.RCNumber,
      companyTag: docFormValues.tag,
      phone: formValues.phone,
      country: docFormValues.country,
      state: docFormValues.state,
      areaOfAccess: docFormValues.areaAccess,
      streetOfAccess: docFormValues.lcda,
      location: formValues.address,
      categories:
        Object.entries(catFormValues).map(([key, input]) => ({
          name: key,
          price: +input,
        })) || [],
    };
    dispatch(createOrganisation(orgFormData))
      .unwrap()
      .then(() => {
        dispatch(getOrganisations(currentMonth));
        history.push("/admin/total_organizations");
      });
  };

  useEffect(() => {
    // fetch all available categories from server
    if (!category) dispatch(getCategory());
    if (!locations) dispatch(getAllLocations());
  }, []);

  useEffect(() => {
    // format the server-sent categories to as required
    // in category select options
    if (category)
      setCategories(
        category.map((cat) => ({
          ...cat,
          text: cat.name,
        }))
      );
  }, [category]);

  return (
    <SetupOrganizationContainer>
      {error && (
        <MessageContainer>
          <p> {error} </p>
        </MessageContainer>
      )}
      <InfoContainer>
        <FormTitle>Bio</FormTitle>
        <FormContainer>
          {Object.entries(bioFormEntries).map(([key, input]) => (
            <div className="w-full md:w-[45%] md:gap-x-10">
              <FormInput
                placeholder={input.placeholder}
                type={input.type}
                label={input.label}
                key={key}
                changeHandler={(e) => setValue(key, e.target.value)}
                errorMsg={errorMsgs[key]}
                value={formValues[key]}
                disabled={input.disabled}
              />
            </div>
          ))}
        </FormContainer>
      </InfoContainer>
      <InfoContainer>
        <FormTitle>Documents</FormTitle>
        <FormContainer>
          <div className="w-full grid md:grid-cols-2 gap-x-10 mt-5">
            {Object.entries(documentsFormEntries).map(([key, input]) => {
              switch (input.type) {
                case "select":
                  return (
                    <Select
                      key={key}
                      width="100%"
                      height="3.5rem"
                      plain={true}
                      options={input.options}
                      label={input.label}
                      title={input.label}
                      changeHandler={(v) => setDocVal(key, v)}
                      optionIdx={input.optionIdx !== null && input.optionIdx}
                      disabled={input.disabled}
                      checkbox={input.checkbox}
                    />
                  );
                case "multiselect":
                  return (
                    <MultiSelect
                      key={key}
                      width="100%"
                      height="3.5rem"
                      plain={true}
                      options={input.options}
                      label={input.label}
                      title={input.title || input.label}
                      changeHandler={(v) => setDocVal(key, v)}
                      optionIdxs={input.optionIdxs || null}
                      disabled={input.disabled}
                    />
                  );
                default:
                  return (
                    <FormInput
                      placeholder={input.placeholder}
                      type={input.type}
                      label={input.label}
                      key={key}
                      changeHandler={(e) => setDocVal(key, e.target.value)}
                      errorMsg={docErrMsg[key]}
                      value={docFormValues[key]}
                      disabled={input.disabled}
                    />
                  );
              }
            })}
          </div>
        </FormContainer>
      </InfoContainer>
      <WastePricingContainer>
        <FlexContainer className="justify-between">
          <FormTitle>Waste Pricing (&#8358;)</FormTitle>
          <CategorySelect
            setCategories={setBodyCategories}
            options={categories}
          />
        </FlexContainer>
        <FormContainer>
          {Object.keys(catValues)?.length > 0 ? (
            <div className="w-full grid md:grid-cols-2 gap-x-10 mt-5">
              {/* {categories?.map(({ text, value }) => ( */}
              {Object.entries(catValues).map(([key, input]) => (
                <FormInput
                  placeholder={"Price rate for 1kg"}
                  label={input.label}
                  key={key}
                  changeHandler={(e) => setCatVal(key, e.target.value)}
                  errorMsg={catErrMsg[key]}
                  value={catFormValues[key] || ""}
                  disabled={false}
                />
              ))}
            </div>
          ) : (
            <p className="w-full text-center text-lg text-body">
              No category has been added
            </p>
          )}
          {/* <p className="w-full text-center text-lg text-body">
            No category has been added
          </p> */}
        </FormContainer>
      </WastePricingContainer>

      <div className="mt-20">
        <Button
          width=""
          submit
          onClick={() => handleSubmit()}
          disabled={!isValid || !isValidDoc || !isValidCat}
        >
          Create Account
        </Button>
      </div>
    </SetupOrganizationContainer>
  );
};

export default SetupOrganization;
// handleSubmit()
