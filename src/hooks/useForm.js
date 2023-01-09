import { useEffect, useState } from "react";

//laxRules tells the form validity system about the flexxibility of then rules in this entry
//setting it to false means the entry value validity would be handled duely

const useForm = (entries, matchFields = [], precheck = false) => {
  // stores all form input values
  const formKeys = {};
  const initFormValues = {};

  Object.keys(entries).forEach((k) => {
    formKeys[k] = "";

    if (entries[k].type === "select") {
      //handle dropdownselect values
      initFormValues[k] =
        entries[k].options && ![null, undefined].includes(entries[k].optionIdx)
          ? entries[k].options[entries[k].optionIdx]?.value
          : "";
    } else if (entries[k].type === "multiselect") {
      //handle dropdown multiselect values
      initFormValues[k] =
        entries[k].options && entries[k].optionIdxs
          ? entries[k].optionIdxs.map((idx) => entries[k].options[idx]?.value)
          : "";
    }
    //handle others like text, password, etc
    else initFormValues[k] = entries[k].value || ""; //handle others like text, password, etc
  });

  const [_formValues, setFormValues] = useState(initFormValues);
  // spread the form keys with empty values into objects
  const [errorMsgs, setErrorMsgs] = useState(formKeys);
  const [isValid, toggleValid] = useState(false);

  const checkErr = (input) => {
    if (!entries[input].rules) return;
    let msg;
    // check for and set error message for input fields
    for (let rule of entries[input].rules) {
      msg = rule(_formValues[input]);
      if (typeof msg === "string") {
        errorMsgs[input] = msg;
        setErrorMsgs({ ...errorMsgs });
        return;
      }
    }
    errorMsgs[input] = msg;
    setErrorMsgs({ ...errorMsgs });
  };

  // updates the form values state based on changes in entries values
  // this helps with async form entries values
  useEffect(() => {
    // setErrorMsgs(formKeys);
    Object.keys(entries).forEach((k) => {
      formKeys[k] = "";
      if (entries[k].type === "select") {
        //handle dropdownselect values
        initFormValues[k] =
          entries[k].options &&
          ![null, undefined].includes(entries[k].optionIdx)
            ? entries[k].options[entries[k].optionIdx]?.value
            : "";
      } else if (entries[k].type === "multiselect") {
        //handle dropdown multiselect values
        initFormValues[k] =
          entries[k].options && entries[k].optionIdxs
            ? entries[k].optionIdxs.map((idx) => entries[k].options[idx]?.value)
            : "";
      }
      //handle others like text, password, etc
      else initFormValues[k] = entries[k].value || ""; //handle others like text, password, etc
    });
    setFormValues(initFormValues);
  }, [entries]);

  useEffect(() => {
    if (precheck) {
      Object.keys(_formValues).forEach((input) => {
        checkErr(input);
      });
    }
  }, [_formValues]);

  //updates form input values
  const setValue = (input, val) => {
    //set input value into values object
    _formValues[input] = val;
    setFormValues({ ..._formValues });

    checkErr(input);

    // check if input field is in matchFields and set appropriate error msg
    if (input === matchFields[1]) {
      const [input1, input2] = matchFields;
      if (_formValues[input1] !== _formValues[input2]) {
        errorMsgs[input] = "Password mismatch";
        setErrorMsgs({ ...errorMsgs });
      }
    }

    // check for invalid input and set form validity
    const validityResult = !Object.values(errorMsgs).some(
      (k) => !(k === true || k === "")
    );
    toggleValid(validityResult);
  };

  useEffect(() => {
    // check for invalid input and set form validity
    const validityResult = !Object.entries(errorMsgs).some(
      ([k, v]) =>
        !(
          v === true ||
          (v === "" && (!entries[k].rules || entries[k].laxRules))
        )
    );
    toggleValid(validityResult);
  }, [entries, errorMsgs]);

  return {
    setValue,
    errorMsgs,
    formValues: _formValues,
    isValid,
    clearForm: () => {
      setFormValues({ ...initFormValues });
      toggleValid(false);
    },
  };
};

export default useForm;
