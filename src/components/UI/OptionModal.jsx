import React, { useState } from "react";
import styled from "styled-components";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import DeleteModal from "../../components/common/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrganisation,
  getOrganisations,
  enableOrganisation,
  disableOrganisation,
} from "../../store/actions";
import moment from "moment";
import { useHistory } from "react-router";
import { claimPermissions } from "../../utils/constants";
import Modal from "./modal";
import { PayoutOptionModal } from "../../views/TotalUser/PayoutOptionModal";
import { setModalOpening, setPayout } from "../../store/reducers/appSlice";

const ModalBackground = styled.div`
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
const OverlayBackground = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
  --tw-bg-opacity: 1;
  background-color: rgba(31, 41, 55, var(--tw-bg-opacity));
  opacity: 0.7;
  z-index: 10;
`;

function OptionModal({
  setModalOpen,
  selectedOrganisation,
  optiondata,
  message,
}) {
  const [showDeleteModal, setDeleteModal] = useState(false);
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

  const {
    userInfo: { claims },
  } = useSelector((state) => state.auth);

  const orgPermissions = claims?.claims?.find(
    (claim) => claim.claimId.title === claimPermissions.ORGANISATION.title
  );

  const { error, modal } = useSelector((state) => state.app);

  const deleteHandler = () => {
    dispatch(deleteOrganisation(selectedOrganisation._id))
      .unwrap()
      .then(() => {
        dispatch(getOrganisations(currentMonth));
        history.push("/admin/total_organizations");
      });
  };

  const [showPostAction, setPostAction] = useState(false);
  const [pay, setPay] = useState([]);
  const [modaltoggler, setModalToggler] = useState(true);

  const handleModalToggler = () => {
    setModalToggler(!modaltoggler);
  };

  return (
    <>
      <Modal
        show={showPostAction}
        close={() => {
          setPostAction(false);
        }}
        type="postAction"
      >
        <p>{!error ? message : error}</p>
      </Modal>

      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setDeleteModal}
        handleDelete={deleteHandler}
        type="account"
        title="Delete"
        name={selectedOrganisation.companyName}
      />

      <div className="modalContainer">
        <ModalBackground>
          <Menu>
            {optiondata?.map(
              (
                { pathname, title, deleteflag, handler, payoutroutes },
                index
              ) => {
                return (
                  <>
                    <Menu.Item key={index}>
                      <Link
                        style={{ color: `${deleteflag && "red"}` }}
                        to={{
                          pathname: `${
                            pathname
                              ? `${pathname}${
                                  selectedOrganisation._id ||
                                  selectedOrganisation
                                }`
                              : `${
                                  selectedOrganisation._id ||
                                  selectedOrganisation
                                }`
                          }`,
                          state: { selectedOrganisation },
                        }}
                        onClick={() => {
                          if (deleteflag) {
                            setDeleteModal(true);
                            // setPostAction(true);
                          } else if (payoutroutes) {
                            handleModalToggler();
                            setPay(payoutroutes);
                            dispatch(setPayout(payoutroutes));
                            dispatch(setModalOpening(modaltoggler));
                          } else if (handler) {
                            handler();
                            setPostAction(true);
                          } else;
                        }}
                      >
                        {title}
                      </Link>
                    </Menu.Item>
                    <Menu.Divider />
                  </>
                );
              }
            )}

            {/* {orgPermissions?.delete && (
              <Menu.Item key="7">
                <Link
                  to="#"
                  style={{ color: "red" }}
                  onClick={() => setDeleteModal(true)}
                >
                  Delete Organization
                </Link>
              </Menu.Item>
            )} */}
          </Menu>
        </ModalBackground>
        <OverlayBackground
          onClick={() => {
            setModalOpen(false);
            dispatch(setModalOpening(false));
          }}
        ></OverlayBackground>

        <PayoutOptionModal
          pay={pay}
          selectedOrganisation={selectedOrganisation}
        />
      </div>
    </>
  );
}

export default OptionModal;
