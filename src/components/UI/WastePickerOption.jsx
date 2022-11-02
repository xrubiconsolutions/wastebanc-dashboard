import { Menu } from "antd";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import tw from "twin.macro";
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";
import { toggleStatusAggregator, unassignPicker } from "../../store/actions";
import PromptModal from "../common/PromptModal";
import Backdrop from "./backdrop";
// import OptionModal from "./OptionModal";

const FilterButton = styled.div`
  ${tw``}
  width: 90px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #ccc;
  float: right;
  margin-right: 20px;
  margin-bottom: 20px;
  color: green;

  &:hover {
    background-color: green;
    color: #fff;
  }
  button {
    padding-left: 14px;
    margin-top: 5px;
    font-size: 18px;
  }

  .iconStyle1 {
    display: inline-block;
    margin-left: 10px;
  }
`;

const OverlayBackground = styled.div`
  position:fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); 
  cursor: pointer;
}
`;

// const DropdownWrapper = styled(Menu)`
//   ${tw` mt-2 text-left w-[200px]`};

//   > * {
//     ${tw`px-10 `}
//   }
// `;

const Item = styled(Menu.Item)`
  ${tw`px-10 py-3`}
`;

const DropdownWrapper = styled.div`
  width: 200px;
  height: auto;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  position: absolute;
  border-radius: 10px;
  right: 20px;
  margin-top: 8px;
  padding-bottom: 10px;
  z-index: 999;

  a:hover {
    color: green;
  }
  modalContainer {
    position: fixed;
  }
  h6 {
    margin-top: 15px;
  }
  .iconStyle {
    display: inline-block;
    margin-left: 190px;
  }
  hr {
    margin-top: 5px;
  }
`;

const OptionModal = ({ pickerId, isAssigned = true, status: _status }) => {
  const [showPrompt, setPrompt] = useState(false);
  const [promptDetails, setPromptDetails] = useState(false);
  const [showPostModal, setPostModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  // console.log("Prev status: ", _status);
  const status =
    _status === "enable" || _status === "active" ? "disable" : "enable";
  // console.log("the new status is: ", status);
  // console.log("The id: ", pickerId);

  const unassignHandler = async () => {
    setPrompt(false);
    const payload = {
      pickerId,
    };

    const res = await dispatch(unassignPicker(payload));
    if (!res.error) {
      setTimeout(() => history.push("/admin/waste_picker"), 2000);
    }
    setPostModal(true);
  };

  const statusHandler = async () => {
    const payload = {
      status,
      collectorId: pickerId,
    };
    // console.log("The payload: ", payload);
    const res = await dispatch(toggleStatusAggregator(payload));
    if (!res.error) {
      setTimeout(() => {
        history.push("/admin/waste_picker");
        window.location.reload();
      }, 2000);
    }
  };

  const assignedOptions = [
    {
      title: "Unssign",
      handler: () => {
        // console.log("unassign clicked");
        setPromptDetails({
          successMessage: `Unassigned waste picker successfully`,
          promptMessage: `Are you sure you want to unassign this waste picker?`,
          handler: unassignHandler,
          buttonText: "unassign",
        });
        setPrompt(true);
      },
    },
    {
      title: status,
      handler: () => {
        setPromptDetails({
          successMessage: `waste picker ${status}d successfully`,
          promptMessage: `Are you sure you want to ${status} this waste picker?`,
          handler: statusHandler,
          buttonText: status,
        });
        setPrompt(true);
      },
    },
  ];

  const unassignedOptions = [
    {
      title: "assign",
      handler: () => history.push(`/admin/waste_picker_assign/${pickerId}`),
    },
    {
      title: status,
      handler: () => {
        setPromptDetails({
          successMessage: `waste picker ${status}d successfully`,
          promptMessage: `Are you sure you want to ${status} this waste picker?`,
          handler: statusHandler,
          buttonText: status,
        });
        setPrompt(true);
      },
    },
  ];

  const options = isAssigned ? assignedOptions : unassignedOptions;
  return (
    <>
      <PromptModal
        handler={unassignHandler}
        showModal={showPrompt}
        setShowModal={setPrompt}
        successMessage="Waste picker unassigned successfully!"
        promptMessage="Are youn sure you want to unassign this waste picker?"
        buttonText="Unassign"
        {...promptDetails}
      />
      <DropdownWrapper>
        <Menu>
          {options.map(({ title, handler }) => (
            <>
              <Item onClick={handler}>{title}</Item>
              <Menu.Divider />
            </>
          ))}
        </Menu>
      </DropdownWrapper>
    </>
  );
};

function WastePickerOptions({ pickerData, isAssigned = true }) {
  const ref = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  useOutsideAlerter(ref, () => setModalOpen(false));
  return (
    <FilterButton ref={ref}>
      <button
        onClick={() => {
          setModalOpen(!modalOpen);
        }}
      >
        Option
      </button>

      {modalOpen && (
        <OptionModal
          setModalOpen={setModalOpen}
          pickerId={pickerData._id}
          isAssigned={isAssigned}
          status={pickerData.status}
        />
      )}
    </FilterButton>
  );
}

export default WastePickerOptions;
