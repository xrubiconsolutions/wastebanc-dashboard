import { Space } from "antd";
import React, { useEffect, useState } from "react";
import Checkbox from "../../components/UI/Checkbox";
import DataTable from "../../components/UI/Table";
import styled from "styled-components";
import tw from "twin.macro";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getClaims, getRoles, updateRole } from "../../store/actions";
import StyledButton from "../../components/UI/btn";
import Modal from "../../components/UI/modal";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/UI/breadCrumbs";

const UserAgencyContainer = styled.div`
  ${tw`grid gap-3`};
`;

const UserAgency = () => {
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
  const location = useLocation();
  const history = useHistory();
  const [showPostModal, setPostModal] = useState(false);

  // get id from pathname and find the role
  // redirect back to roles page if role with id doesn't exist
  const id = location.pathname.split("/").at(-1);
  const role = roles?.find((role) => role._id === id);
  if (!role) history.push("/admin/roles_permission");
  const [roleClaims, setRoleClaims] = useState(
    roles?.find((role) => role._id === id).claims
  );

  const [claimsData, setClaimsData] = useState();

  const setClaimHandler = (e, type, title) => {
    const claim = roleClaims?.find((claim) => claim.claimId.title === title);
    const key = claims?.find((claim) => claim.title === title)._id;
    let newClaimObj,
      newRoleClaims = roleClaims || [];
    switch (type) {
      case "all":
        if (
          !claim ||
          !claim.create ||
          !claim.edit ||
          !claim.delete ||
          !claim.read
        ) {
          // construct the claim object
          newClaimObj = {
            role: title,
            key,
            claim: {
              claimId: { _id: key, title },
              create: true,
              delete: true,
              edit: true,
              read: true,
            },
          };
          if (!claim) newRoleClaims = [...roleClaims, newClaimObj.claim];
          else
            newRoleClaims = newRoleClaims.reduce(
              (a, b) =>
                b.claimId.title === title
                  ? a.concat(newClaimObj.claim)
                  : a.concat(b),
              []
            );
        } else {
          newClaimObj = {
            role: title,
            key,
            claim: {},
          };

          newRoleClaims = roleClaims.filter(
            (claim) => claim.claimId.title !== title
          );
        }
        break;
      case "create":
        if (!claim || !claim.create) {
          // construct the claim object
          newClaimObj = {
            role: title,
            key,
            claim: {
              claimId: { _id: key, title },
              create: true,
              delete: claim?.delete || false,
              edit: claim?.edit || false,
              read: claim?.read || false,
            },
          };
          if (!claim) newRoleClaims = [...roleClaims, newClaimObj.claim];
          else
            newRoleClaims = newRoleClaims.reduce(
              (a, b) =>
                b.claimId.title === title
                  ? a.concat(newClaimObj.claim)
                  : a.concat(b),
              []
            );
        } else {
          newClaimObj = {
            role: title,
            key,
            claim: {
              ...claim,
              create: false,
            },
          };
          newRoleClaims = newRoleClaims.reduce(
            (a, b) =>
              b.claimId.title === title
                ? a.concat(newClaimObj.claim)
                : a.concat(b),
            []
          );
        }
        break;
      case "edit":
        if (!claim || !claim.edit) {
          // construct the claim object
          newClaimObj = {
            role: title,
            key,
            claim: {
              claimId: { _id: key, title },
              edit: true,
              delete: claim?.delete || false,
              create: claim?.create || false,
              read: claim?.read || false,
            },
          };
          if (!claim) newRoleClaims = [...roleClaims, newClaimObj.claim];
          else
            newRoleClaims = newRoleClaims.reduce(
              (a, b) =>
                b.claimId.title === title
                  ? a.concat(newClaimObj.claim)
                  : a.concat(b),
              []
            );
        } else {
          newClaimObj = {
            role: title,
            key,
            claim: {
              ...claim,
              edit: false,
            },
          };
          newRoleClaims = newRoleClaims.reduce(
            (a, b) =>
              b.claimId.title === title
                ? a.concat(newClaimObj.claim)
                : a.concat(b),
            []
          );
        }
        break;
      case "delete":
        if (!claim || !claim.delete) {
          // construct the claim object
          newClaimObj = {
            role: title,
            key,
            claim: {
              claimId: { _id: key, title },
              delete: true,
              edit: claim?.edit || false,
              create: claim?.create || false,
              read: claim?.read || false,
            },
          };
          if (!claim) newRoleClaims = [...roleClaims, newClaimObj.claim];
          else
            newRoleClaims = newRoleClaims.reduce(
              (a, b) =>
                b.claimId.title === title
                  ? a.concat(newClaimObj.claim)
                  : a.concat(b),
              []
            );
        } else {
          newClaimObj = {
            role: title,
            key,
            claim: {
              ...claim,
              delete: false,
            },
          };
          newRoleClaims = newRoleClaims.reduce(
            (a, b) =>
              b.claimId.title === title
                ? a.concat(newClaimObj.claim)
                : a.concat(b),
            []
          );
        }
        break;
      case "read":
        if (!claim || !claim.read) {
          // construct the claim object
          newClaimObj = {
            role: title,
            key,
            claim: {
              claimId: { _id: key, title },
              read: true,
              delete: claim?.delete || false,
              edit: claim?.edit || false,
              create: claim?.create || false,
            },
          };
          if (!claim) newRoleClaims = [...roleClaims, newClaimObj.claim];
          else
            newRoleClaims = newRoleClaims.reduce(
              (a, b) =>
                b.claimId.title === title
                  ? a.concat(newClaimObj.claim)
                  : a.concat(b),
              []
            );
        } else {
          newClaimObj = {
            role: title,
            key,
            claim: {
              ...claim,
              read: false,
            },
          };
          newRoleClaims = newRoleClaims.reduce(
            (a, b) =>
              b.claimId.title === title
                ? a.concat(newClaimObj.claim)
                : a.concat(b),
            []
          );
        }
        break;
      default:
        break;
    }
    // replace the claim object with a full claim in claimsData
    const newClaims = claimsData.reduce(
      (a, b) => (b.role === title ? a.concat(newClaimObj) : a.concat(b)),
      []
    );
    setRoleClaims(newRoleClaims);
    setClaimsData(newClaims);
  };

  const updateRoleHandler = async () => {
    const data = {
      title: role.title,
      claims: roleClaims.map((claim) => ({
        ...claim,
        claimId: claim.claimId._id,
      })),
    };
    const res = await dispatch(updateRole({ roleId: role._id, data }));
    if (!res.error) {
      await dispatch(getRoles());
      window.location.reload();
    }
    setPostModal(true);
  };

  const columns = [
    {
      title: "Role Claims",
      dataIndex: "role",
      key: "role",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Select All",
      dataIndex: "all",
      key: "all",
      render: (_, record) => {
        const { create = false, read = false, edit = false } = record.claim;
        return (
          <Space size="middle">
            <Checkbox
              key={Math.random()}
              onChange={(e) => setClaimHandler(e, "all", record.role)}
              defaultChecked={create && read && edit && record.claim.delete}
            />
          </Space>
        );
      },
    },
    {
      title: "Create",
      dataIndex: "create",
      key: "create",
      render: (_, record) => {
        const { create = false } = record.claim;
        return (
          <Space size="middle">
            <Checkbox
              key={Math.random()}
              defaultChecked={create}
              onChange={(e) => setClaimHandler(e, "create", record.role)}
            />
          </Space>
        );
      },
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => {
        const { edit = false } = record.claim;
        return (
          <Space size="middle">
            <Checkbox
              key={Math.random()}
              defaultChecked={edit}
              onChange={(e) => setClaimHandler(e, "edit", record.role)}
            />
          </Space>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => (
        <Space size="middle">
          <Checkbox
            key={Math.random()}
            onChange={(e) => setClaimHandler(e, "delete", record.role)}
            defaultChecked={record.claim.delete}
          />
        </Space>
      ),
    },
    {
      title: "Read",
      dataIndex: "read",
      key: "read",
      render: (_, record) => (
        <Space size="middle">
          <Checkbox
            key={Math.random()}
            onChange={(e) => setClaimHandler(e, "read", record.role)}
            defaultChecked={record.claim.read}
          />
        </Space>
      ),
    },
  ];

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
    const claimsData = claims?.map(({ title, _id }) => ({
      role: title,
      key: _id,
      claim: role?.claims?.find((claim) => claim.claimId._id === _id) || {},
    }));
    setClaimsData(claimsData);
  }, [roles, claims]);
  const pages = [{ name: "Home", link: "/admin/roles_permission" }];
  return (
    <>
      <Modal
        color={error ? "red" : "#295011"}
        type="postAction"
        show={showPostModal}
        close={() => setPostModal(false)}
      >
        {!error ? "Role updated successfully" : error}
      </Modal>
      <UserAgencyContainer>
        <BreadCrumb pages={pages} current="Permision" />
        {/* <Breadcrumb separator="<">
          <Breadcrumb.Item className="text-lg">
            <Link to="/admin/roles_permission">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-lg">Permision</Breadcrumb.Item>
        </Breadcrumb> */}
        <div className="flex justify-self-end">
          <StyledButton buttonSize="btn--medium" onClick={updateRoleHandler}>
            Save
          </StyledButton>
        </div>
        <DataTable data={claimsData} columns={columns} />
      </UserAgencyContainer>
    </>
  );
};

export default UserAgency;
