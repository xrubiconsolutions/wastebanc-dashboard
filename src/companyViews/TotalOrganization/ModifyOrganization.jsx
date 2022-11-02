import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FlexContainer, FormContainer } from "../../components/styledElements";
import FormInput from "../../components/auth/FormInput";
import MultiSelect from "../../components/UI/multiSelect";
import Select from "../../components/UI/select";
import CategorySelect from "../../components/UI/CategorySelect";
import Button from "../../components/UI/button";
import Switch from "../../components/UI/Switch";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllAreas,
  getOrganisations,
  getCategory,
  updateOrganisationCompany,
  getAllLocations,
  getStateAreas,
  getSubAreas,
  getOrganisationsProfile,
} from "../../store/actions";
import useForm from "../../hooks/useForm";
import { SuccessContainer } from "../../components/styledElements";
import {
  formatOrgDetails,
  formatSelectOptions,
  valAggregator,
} from "../../utils";
import moment from "moment";
import Modal from "../../components/UI/modal";

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

let bioFormEntries = {
  name: {
    label: "Name",
    value: "",
    placeholder: "Organisation Name",
  },
  phone: {
    label: "Contact Line",
    value: "",
    placeholder: "Organisation Contact",
    rules: [
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
    options: null,
    type: "multiselect",
    rules: [(v) => !!v || "choose some option(s)"],
  },
};

const ModifyOrganization = ({ match }) => {
  const [categories, setCategories] = useState([]);
  const [showPostModal, setPostModal] = useState(false);
  // The categories inputs depends on this state, changes made
  // from the CategorySelect affect here.
  const [bodyCategories, setBodyCategories] = useState([]);
  const [wastePicker, setWastePicker] = useState(false);
  const [wastePickerValue, setWastePickerValue] = useState(wastePicker);
  const [catValues, setCatValues] = useState({});
  const [fetchedArea, setFetchedArea] = useState([]);
  const [fetchedCovArea, setFetchedCovArea] = useState([]);
  const [value3, setValue3] = useState();
  const [subAreaOptions, setSubAreaOptions] = useState([]);
  const [fetchedCat, setFetchedCat] = useState([]);
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [lcds, setLcds] = useState([]);
  const [lgaIndex, setLgaIndex] = useState([]);
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

  const categoryIdxs = useRef();
  const {
    app: { error },
    auth: { userInfo },
    wasteCategory: { category },
    location: { locations },
    area: { allAreas },
    organisation: { profileOrganisation },
  } = useSelector((state) => state);

  //how to filter common objects in two arrays and return an array with common objects?

  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    const categoriesEntries = {};
    const categoriesExistingEntries = {};

    const categoryFullObj = (category) => {
      return profileOrganisation?.categories?.find(
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
            label: obj?.catId?.name || entry.text,
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
  }, [bodyCategories, profileOrganisation?.categories]);

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
    let lgaIdx = [];
    if (fetchedArea && userInfo) {
      lgaIdx = userInfo?.areaOfAccess
        ? userInfo?.areaOfAccess?.map((area) =>
            fetchedArea?.findIndex(
              (fd) => fd.text?.toLowerCase() === area?.toLowerCase()
            )
          )
        : null;
    }
    setLgaIndex(lgaIdx);
  }, [fetchedArea, userInfo]);

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

    // remove the currently selected state when another country has been selected
    if (userInfo.country !== docFormValues.country)
      documentsFormEntries.state.optionIdx = null;
  }, [docFormValues.country, locations]);

  useEffect(() => {
    if (!fetchedCat) dispatch(getOrganisationsProfile());
    setFetchedCat(profileOrganisation?.categories);
  }, [fetchedCat]);

  useEffect(() => {
    setValue3(profileOrganisation?.allowPickers);
  }, [profileOrganisation]);

  console.log(
    profileOrganisation?.allowPickers,
    "profileOrganisationprofileOrganisation"
  );

  // documentsFormEntries.areaAccess.options = fetchedArea;
  // documentsFormEntries.lcda.options = lcds;

  const handleSubmit = async () => {
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
      allowPickers: value3,
      categories:
        Object.entries(catFormValues).map(([key, input]) => ({
          name: key,
          price: +input,
        })) || [],
    };
    console.log(orgFormData, "orgFormData");
    const payload = {
      id: match?.params?.id,
      orgFormData,
    };

    const res = await dispatch(updateOrganisationCompany(payload));
    if (!res.error) console.log(res.error);
    setPostModal(true);
    setTimeout(() => setPostModal(false), 2000);
    //   .unwrap()
    //   .then(() => {
    //     history.push("/user");
    //     window.location.reload();
    //   });
  };

  useEffect(() => {
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
    if (userInfo) {
      [bioFormEntries, documentsFormEntries] = formatOrgDetails(
        userInfo,
        lgaIndex,
        fetchedArea,
        lcds,
        locations,
        docFormValues
      );
      // save the organisation categories inside bodyCategories
      setBodyCategories(userInfo.categories);
    }
  }, [userInfo, lcds, subAreaOptions, lgaIndex, subAreaOptions, locations]);

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
    if (userInfo) setFetchedCategories(userInfo?.categories);
    // update the available categories state options when changes occur in the
    // fetched organisation data
    if (categories && userInfo?.categories) {
      categoryIdxs.current = userInfo.categories.map((cat) =>
        categories.findIndex(
          (c) => c.name.toLowerCase() === cat.name.toLowerCase()
        )
      );
    }
  }, [userInfo, categories]);

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

  const res = categories?.filter((x) =>
    fetchedCategories?.some((y) => y.catId === x._id)
  );
  return (
    <>
      <Modal
        color={error ? "red" : "#005700"}
        type="postAction"
        show={showPostModal}
        close={() => setPostModal(false)}
      >
        {!error ? "Organization modified successfully" : error}
      </Modal>

      <SetupOrganizationContainer>
        {/* {error && (
        <SuccessContainer>
          <p>Successfully Modify Organization </p>
        </SuccessContainer>
      )} */}

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
        <InfoContainer>
          <FormTitle>Waste Pickers</FormTitle>
          <FormContainer>
            <Switch
              res={res}
              setValue3={setValue3}
              value3={value3}
              //   onChange={(e) => {
              //     setPostcodeData();
              //     toggleLocationAuto(locationAuto);
              // }}
            />
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
            {categories?.length > 0 ||
            profileOrganisation?.categories?.length > 0 ? (
              <div className="w-full grid md:grid-cols-2 gap-x-10 mt-5">
                {Object.entries(catValues).map(([key, input]) => (
                  <FormInput
                    placeholder={"Price rate for 1kg"}
                    label={input.label}
                    key={key}
                    changeHandler={(e) => setCatVal(key, e.target.value)}
                    errorMsg={catErrMsg[key]}
                    value={catFormValues[key] || ""}
                    disabled={input.disabled}
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

        <div className="mt-20" style={{ marginBottom: "2rem" }}>
          <Button
            width=""
            submit
            onClick={() => handleSubmit()}
            disabled={!!valAggregator(errorMsgs, docErrMsg, catErrMsg)}
          >
            Modify Accounts
          </Button>
          <br />
        </div>
      </SetupOrganizationContainer>
    </>
  );
};

export default ModifyOrganization;
