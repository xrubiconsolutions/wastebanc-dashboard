import React, { useState } from "react";
import styled from "styled-components";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import DeleteModal from "../../components/common/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrganisation, getOrganisations } from "../../store/actions";
import moment from "moment";
import { useHistory } from "react-router";
import { claimPermissions } from "../../utils/constants";

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

function OptionModal({ setModalOpen, selectedOrganisation }) {
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

  const deleteHandler = () => {
    dispatch(deleteOrganisation(selectedOrganisation._id))
      .unwrap()
      .then(() => {
        dispatch(getOrganisations(currentMonth));
        history.push("/admin/total_organizations");
      });
  };

  return (
    <>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setDeleteModal}
        handleDelete={deleteHandler}
        type="account"
        name={selectedOrganisation.companyName}
      />

      <div className="modalContainer">
        <ModalBackground>
          <Menu>
            <Menu.Item key="0">
              <Link
                to={{
                  pathname: `/admin/total_aggregators_all/${selectedOrganisation._id}`,
                }}
              >
                See Aggregators
              </Link>
            </Menu.Item>
            <Menu.Divider />
            <>
              <Menu.Item key="1">
                <Link
                  to={{
                    pathname: `/admin/total_organizations_wastePicker/${selectedOrganisation._id}`,
                    state: { selectedOrganisation },
                  }}
                >
                  Waste Pickers
                </Link>
              </Menu.Item>
              <Menu.Divider />
            </>
            <>
              <Menu.Item key="2">
                <Link
                  to={{
                    pathname: `/admin/total_organizations_generated_invoices/${selectedOrganisation._id}`,
                    state: { selectedOrganisation },
                  }}
                >
                  Generated Invoices
                </Link>
              </Menu.Item>
              <Menu.Divider />
            </>

            <>
              <Menu.Item key="3">
                <Link
                  to={{
                    pathname: `/admin/total_organizations_completed_schedules/${selectedOrganisation._id}`,
                    state: { selectedOrganisation },
                  }}
                >
                  Completed Schedules
                </Link>
              </Menu.Item>
              <Menu.Divider />
            </>

            {orgPermissions?.edit && (
              <>
                <Menu.Item key="5">
                  <Link
                    to={{
                      pathname: `/admin/total_organizations_modify/${selectedOrganisation._id}`,
                    }}
                  >
                    Modify Organization
                  </Link>
                </Menu.Item>
                <Menu.Divider />
              </>
            )}

            {orgPermissions?.delete && (
              <Menu.Item key="4">
                <Link
                  to="#"
                  style={{ color: "red" }}
                  onClick={() => setDeleteModal(true)}
                >
                  Disable Organization
                </Link>
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
    </>
  );
}

export default OptionModal;
