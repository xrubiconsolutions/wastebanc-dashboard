import React, { useState } from "react";
import Modal from "../UI/modal";
import { PageTitle, ModalText } from "../styledElements";
import CustomButton from "../UI/button";
import { capitalize } from "../../utils";
import { useSelector } from "react-redux";

const PromptModal = ({
  showModal,
  setShowModal,
  type = "",
  name = "",
  successMessage = "",
  promptMessage = "",
  handler = () => null,
  buttonText = "",
  title = "",
}) => {
  const [showPostAction, setPostAction] = useState(false);
  const promptHandler = async () => {
    setShowModal(false);
    await handler();
    setPostAction(true);
  };
  const { error } = useSelector((state) => state.app);

  return (
    <>
      <Modal
        color={error ? "red" : "#295011"}
        type="postAction"
        show={showPostAction}
        close={() => {
          setPostAction(false);
        }}
      >
        {!error ? successMessage : error}
      </Modal>
      <Modal show={showModal} close={() => setShowModal(false)}>
        <PageTitle>{title || "Confirm"}</PageTitle>
        <ModalText>{promptMessage}</ModalText>
        <div className="flex space-x-8 mt-4">
          <CustomButton
            text="Cancel"
            type="outlined"
            onClick={() => setShowModal(false)}
          />
          <CustomButton
            text={buttonText}
            color="#295011"
            onClick={promptHandler}
          />
        </div>
      </Modal>
    </>
  );
};

export default PromptModal;
