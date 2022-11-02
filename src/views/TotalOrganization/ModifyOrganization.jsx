import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FlexContainer, FormContainer } from "../../components/styledElements";
import FormInput from "../../components/auth/FormInput";
import MultiSelect from "../../components/UI/multiSelect";
import Select from "../../components/UI/select";
import CategorySelect from "../../components/UI/CategorySelect";
import Button from "../../components/UI/button";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  findOrganisation,
  getAllAreas,
  getCategory,
  updateOrganisation,
  getOrganisations,
  getAllLocations,
  getSubAreas,
  getStateAreas,
} from "../../store/actions";
import useForm from "../../hooks/useForm";
import {
  formatOrgDetails,
  formatSelectOptions,
  valAggregator,
} from "../../utils";
import moment from "moment";

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

const Br = styled.div`
  margin-bottom: 3rem;
`;

let bioFormEntries = {
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

let documentsFormEntries = {
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

const ModifyOrganization = ({ match }) => {
  const [categories, setCategories] = useState([]);
  // The categories inputs depends on this state, changes made
  // from the CategorySelect affect here.
  const [bodyCategories, setBodyCategories] = useState([]);
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [catValues, setCatValues] = useState({});

  const [fetchedData, setFetchedData] = useState({});
  const [lgaIndex, setLgaIndex] = useState([]);
  const [fetchedCovArea, setFetchedCovArea] = useState([]);

  const [fetchedArea, setFetchedArea] = useState([]);
  const [lcds, setLcds] = useState([]);
  const [subAreaOptions, setSubAreaOptions] = useState([]);

  const {
    organisation: { selectedOrganisation },
    wasteCategory: { category },
    location: { locations },
    area: { allAreas },
  } = useSelector((state) => state);

  const categoryIdxs = useRef();
  const date = new Date();
  const currentMonth = {
    start: moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
      "YYYY-MM-DD"
    ),
    end: moment(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
      "YYYY-MM-DD"
    ),
  };

  const dispatch = useDispatch();
  let history = useHistory();

  const { setValue, errorMsgs, formValues } = useForm(bioFormEntries);
  const {
    setValue: setDocVal,
    errorMsgs: docErrMsg,
    formValues: docFormValues,
  } = useForm(documentsFormEntries);
  const {
    setValue: setCatVal,
    errorMsgs: catErrMsg,
    formValues: catFormValues,
  } = useForm(catValues);

  useEffect(() => {
    dispatch(findOrganisation(match?.params?.id));
    // fetch all available categories from server
    if (!category) dispatch(getCategory());
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

  useEffect(() => {
    const categoriesEntries = {};
    const categoriesExistingEntries = {};

    const categoryFullObj = (category) => {
      return fetchedCategories?.find(
        (cat) => cat.name.toLowerCase() === category.toLowerCase()
      );
    };

    if (bodyCategories) {
      /**************************************************************************************
       * since bodyCategories is updated inside categorySelect when new category is selected
       * reconstruct the category form entries in a way that caters for the exisiting price
       * saved in the form entries and also include the new selected category which is
       * yet to get a price.
       **************************************************************************************/
      let obj;
      bodyCategories &&
        bodyCategories.forEach((entry) => {
          obj = categoryFullObj(entry.name || entry.text);
          categoriesExistingEntries[entry.name || entry.text] = {
            label: obj?.name || entry.text,
            value: obj?.price || "",
            placeholder: "Price rate for 1kg",
            type: "number",
            rules: [
              (v) => !!v || "choose some option(s)",
              (v) => /^[0-9]{1,10}$/g.test(v) || "▲ Price must be a number",
            ],
          };
        });
    }

    const combinedEntries = {
      ...categoriesExistingEntries,
      ...categoriesEntries,
    };
    setCatValues(combinedEntries);
  }, [bodyCategories, fetchedCategories]);

  useEffect(() => {
    if (selectedOrganisation) {
      [bioFormEntries, documentsFormEntries] = formatOrgDetails(
        selectedOrganisation,
        lgaIndex,
        fetchedArea,
        lcds,
        locations,
        docFormValues
      );
      setFetchedData(selectedOrganisation);
      // save the organisation categories inside bodyCategories
      setBodyCategories(selectedOrganisation.categories);
    }
  }, [
    selectedOrganisation,
    lcds,
    subAreaOptions,
    lgaIndex,
    subAreaOptions,
    locations,
  ]);

  // updates the lcda options when changes occur in the LGA multiselect component
  useEffect(() => {
    if (!docFormValues.areaAccess) return;

    // gather the street options from available street options
    const streets = subAreaOptions.filter((area) =>
      docFormValues.areaAccess.find((str) => str === area.lga)
    );
    const streetOptions = formatSelectOptions(streets, "lcd", "slug");
    documentsFormEntries.lcda.options = streetOptions;

    // this is to trigger re-render
    setFetchedCovArea(streets);
  }, [docFormValues.areaAccess]);

  // Categories fillers
  useEffect(() => {
    if (fetchedData) setFetchedCategories(fetchedData?.categories);
    // update the available categories state options when changes occur in the
    // fetched organisation data
    if (categories && fetchedData?.categories) {
      categoryIdxs.current = fetchedData.categories.map((cat) =>
        categories.findIndex(
          (c) => c.name.toLowerCase() === cat.name.toLowerCase()
        )
      );
    }
  }, [fetchedData, categories]);

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

  // Populate the lgas
  useEffect(() => {
    let lgaIdx = [];
    if (fetchedArea && fetchedData) {
      lgaIdx = fetchedData?.areaOfAccess
        ? fetchedData?.areaOfAccess?.map((area) =>
            fetchedArea?.findIndex(
              (fd) => fd.text?.toLowerCase() === area?.toLowerCase()
            )
          )
        : null;
    }
    setLgaIndex(lgaIdx);
  }, [fetchedArea, fetchedData]);

  // populate lcda
  useEffect(() => {
    if (subAreaOptions) {
      const cArea = subAreaOptions.map((ca) => ({
        text: ca?.lcd,
        value: ca?.slug,
      }));
      setLcds(cArea);
    }
  }, [subAreaOptions]);

  useEffect(() => {
    if (!locations) dispatch(getAllLocations());
    // return if there's no selected country or locations available
    if (!docFormValues.country) return;

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

  useEffect(() => {
    if (!locations) dispatch(getAllLocations());
    // return if there's no selected country or locations available
    if (!docFormValues.country) return;

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
    if (!locations) dispatch(getAllLocations());
    // return if there's no selected country or locations available
    if (!docFormValues.country) return;

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

  const handleSubmit = () => {
    const orgFormData = {
      companyName: formValues.name,
      email: formValues.email,
      rcNo: docFormValues.RCNumber,
      companyTag: docFormValues.tag,
      phone: formValues.phone,
      areaOfAccess: docFormValues.areaAccess,
      streetOfAccess: docFormValues.lcda,
      location: formValues.address,
      categories:
        Object.entries(catFormValues).map(([key, input]) => ({
          name: key,
          price: +input,
        })) || [],
    };

    const payload = {
      id: match?.params?.id,
      orgFormData,
    };

    dispatch(updateOrganisation(payload))
      .unwrap()
      .then(() => {
        dispatch(getOrganisations(currentMonth));
        history.push("/admin/total_organizations");
      });
  };
  return (
    <SetupOrganizationContainer>
      <InfoContainer>
        <FormTitle>Bio</FormTitle>
        <FormContainer>
          {Object.entries(bioFormEntries).map(([key, input]) => (
            <div className="w-full md:w-[45%] md:gap-x-10">
              <FormInput
                placeholder={input.placeholder}
                type={input.type}
                label={input.label}
                key={input.label}
                changeHandler={(e) => setValue(key, e.target.value)}
                errorMsg={errorMsgs[key]}
                value={formValues[key]}
                extraLink={input.extraLink}
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
            optionIdxs={categoryIdxs.current}
          />
        </FlexContainer>
        <FormContainer>
          {categories?.length > 0 || fetchedCategories?.length > 0 ? (
            <div className="w-full grid md:grid-cols-2 gap-x-10 mt-5">
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
        </FormContainer>
      </WastePricingContainer>

      <div className="mt-20 ">
        <Button
          width=""
          submit
          onClick={() => handleSubmit()}
          disabled={!!valAggregator(errorMsgs, docErrMsg, catErrMsg)}
        >
          Modify Accounts
        </Button>
      </div>
      <Br />
    </SetupOrganizationContainer>
  );
};

export default ModifyOrganization;
