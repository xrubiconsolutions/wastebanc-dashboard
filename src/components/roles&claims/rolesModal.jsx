import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createRole, getClaims, getRoles } from "../../store/actions";
import { FiPlusCircle } from "react-icons/fi";
import styled from "styled-components";
import tw from "twin.macro";
import FormInput from "../auth/FormInput";
import { FlexContainer, TitleText } from "../styledElements";
import StyledButton from "../UI/btn";
import Checkbox from "../UI/Checkbox";
import modal from "../UI/modal";

const Modal = styled(modal)`
  ${tw``};
  //   input {
  //     transform: scaleY(0.7);
  //   }
`;

const initData = {
  category: {
    label: "Role Title",
    placeholder: "Admin Role",
    // options: [
    //   { text: "Admin 001", value: "admin_001" },
    //   { text: "Admin 002", value: "admin_002" },
    //   { text: "Admin 003", value: "admin_003" },
    // ],
  },
};

const RolesModal = ({
  data = initData,
  showModal = false,
  setShowModal = {},
  mode = "create",
}) => {
  const texts = {
    title: { create: "Create", update: "Modify" }[mode],
    buttionText: { create: "Add Role", update: "Update" }[mode],
  };

  /****************************
   *
   * states and hooks
   *
   ****************************/
  const dispatch = useDispatch();
  const {
    role: { roles, claims },
    app: { error },
  } = useSelector((state) => state);

  const initAdminClaims =
    claims?.map((claim) => ({
      text: claim.title,
      id: claim._id,
    })) || [];

  const [showPostModal, setPostModal] = useState(false);
  const [roleTitle, setRoleTitle] = useState("");
  const [selectedClaims, setSelectedClaims] = useState([...initAdminClaims]);

  /****************************
   *
   * handlers and utils functions
   *
   ****************************/

  const toggleClaim = (e, id) => {
    const claim = claims.find((c) => c._id === id);
    const newClaims = e.target.checked
      ? [...selectedClaims, { text: claim.text, id: claim._id }]
      : selectedClaims?.filter((claim) => claim.id !== id);
    setSelectedClaims(newClaims);
  };

  const createRoleHandler = async () => {
    setShowModal(false);
    const data = {
      title: roleTitle,
      claims: selectedClaims.map((claim) => ({
        claimId: claim.id,
        create: true,
        edit: true,
        delete: true,
        read: true,
      })),
    };
    setRoleTitle("");
    const res = await dispatch(createRole(data));
    if (!res.error) dispatch(getRoles());
    setPostModal(true);
  };

  /****************************
   *
   * lifecycle hooks
   *
   ****************************/
  useEffect(() => {
    if (!roles) dispatch(getRoles());
    if (!claims) dispatch(getClaims());
  }, []);

  useEffect(() => {
    const c =
      claims?.map((claim) => ({
        text: claim.title,
        id: claim._id,
      })) || [];
    setSelectedClaims(c);
  }, [claims]);

  return (
    <>
      <Modal
        color={error ? "red" : "#295011"}
        type="postAction"
        show={showPostModal}
        close={() => setPostModal(false)}
      >
        {!error ? "Role created successfully" : error}
      </Modal>
      <Modal show={showModal} close={() => setShowModal(false)} width="30rem">
        <FlexContainer className="justify-between mb-4">
          <TitleText>{texts.title} Role</TitleText>
          <StyledButton
            buttonSize="btn--medium"
            onClick={() => setShowModal(false)}
          >
            close
          </StyledButton>
        </FlexContainer>
        <div className="flex flex-col">
          {Object.entries(data).map(([key, input]) => (
            <FormInput
              placeholder={input.placeholder}
              type={input.type}
              label={input.label}
              key={input.label}
              height="3.0rem"
              changeHandler={(e) => setRoleTitle(e.target.value)}
              // errorMsg={errorMsgs[key]}
              value={roleTitle}
              disabled={input.disabled}
            />
          ))}
          <div>
            <TitleText>Claims</TitleText>
            <FlexContainer className="flex-wrap w-full justify-between gap-y-5 mb-7">
              {initAdminClaims.map((claim, idx) => (
                <div className="w-1/2" key={Math.random() + idx}>
                  <Checkbox
                    label={claim.text}
                    defaultChecked={selectedClaims.some(
                      (cl) => cl.id === claim.id
                    )}
                    onChange={(e) => toggleClaim(e, claim.id)}
                  />
                </div>
              ))}
            </FlexContainer>
          </div>
          <div className="max-w-content">
            <StyledButton
              buttonSize="btn--medium"
              buttonStyle="btn--primary--outline"
              onClick={createRoleHandler}
              disabled={!roleTitle || selectedClaims.length === 0}
            >
              {mode === "create" && <FiPlusCircle size={"20"} />}
              {texts.buttionText}
            </StyledButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RolesModal;
