import { Menu } from "antd";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { modifyUserAgency, deleteUserAgency } from "../../store/actions";
import { useEffect, useState } from "react";

const ModalBackground = styled.div`
  width: 150px;
  height: auto;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  position: fixed;
  border-radius: 10px;
  right: 20px;
  margin-top: 2rem;
  padding-bottom: 10px;
  z-index: 1;

  a:hover {
    color: green;
  }
  modalContainer {
    position: relative;
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
const OverlayBackground = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
  --tw-bg-opacity: 1;
  /* background-color: rgba(31,41,55,var(--tw-bg-opacity));
opacity: 0.7;
z-index: 10; */
`;

function UserOptionModal({
  setModalOpen,
  setShowModal,
  setShowInfoModal,
  userData,
  onRefresh,
  showDeleteButton = false,
  showModifyButton = false,
}) {
  const [currentStatus, setCurrentStatus] = useState("Disable");
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData?.status === "active") setCurrentStatus("Disable");

    if (userData?.status === "disable") setCurrentStatus("Enable");
  }, [userData?.status]);

  const handleDisable = (status) => {
    const myValues = {
      id: userData.key,
      payload: {
        status: status === "active" ? "disable" : "active",
      },
    };

    dispatch(modifyUserAgency(myValues))
      .unwrap()
      .then(() => {
        onRefresh();
      });
  };

  const handleDelete = () => {
    dispatch(deleteUserAgency(userData.key))
      .unwrap()
      .then(() => {
        onRefresh();
      });
  };

  return (
    <div className="modalContainer">
      <ModalBackground>
        <Menu>
          <Menu.Item key="0">
            <a
              href="#"
              onClick={() => {
                setShowInfoModal(true);
              }}
            >
              See More
            </a>
          </Menu.Item>
          {showModifyButton && (
            <>
              <Menu.Item key="1">
                <a
                  href="#"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Modify
                </a>
              </Menu.Item>

              <Menu.Item key="2">
                <a href="#" onClick={() => handleDisable(userData?.status)}>
                  {" "}
                  {currentStatus}
                </a>
              </Menu.Item>
            </>
          )}
          {showDeleteButton && (
            <Menu.Item key="3">
              <a href="#" onClick={() => handleDelete()}>
                Delete
              </a>
            </Menu.Item>
          )}
        </Menu>
      </ModalBackground>
      <OverlayBackground
        onClick={() => {
          setModalOpen(false);
        }}
      ></OverlayBackground>
    </div>
  );
}

export default UserOptionModal;
