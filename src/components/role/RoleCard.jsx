import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Tag } from "antd";
import StyledButton from "../UI/btn";
import RolesModal from "../roles&claims/rolesModal";
import { Link } from "react-router-dom";
import DeleteModal from "../common/DeleteModal";
import { useDispatch } from "react-redux";
import { deleteRole, getRoles } from "../../store/actions";

const RoleContainer = styled.div`
  ${tw`bg-white px-8 py-4 gap-8`}
  display:grid;
  grid-template-columns: 1fr auto;
`;
const RoleCardContainer = styled.div`
  ${tw`flex flex-col items-start gap-6`}
`;
const RolesTag = styled.div`
  ${tw`flex flex-wrap gap-2`}
`;
const RoleTitle = styled.div`
  ${tw`text-secondary font-bold`}
`;
const RoleButtons = styled.div`
  ${tw`flex items-center gap-2`}
`;
const RoleCard = ({
  title = "",
  claims = [],
  id = "",
  showModifyButton = false,
  showDeleteButton = false,
}) => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();

  /****************************
   *
   * utils and handler functions
   *
   ****************************/
  const deleteHandler = async () => {
    const res = await dispatch(deleteRole(id));
    if (!res.error) dispatch(getRoles());
  };

  return (
    <>
      <RolesModal
        showModal={showModal}
        setShowModal={setShowModal}
        mode="update"
      />
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setDeleteModal}
        handleDelete={deleteHandler}
        type="role"
      />
      <RoleContainer>
        <RoleCardContainer>
          <RoleTitle>{title}</RoleTitle>
          <RolesTag>
            {claims?.map(({ claimId: { title, _id } }) => (
              <Tag key={_id}>{title}</Tag>
            ))}
          </RolesTag>
        </RoleCardContainer>
        <RoleButtons>
          {showModifyButton && (
            <Link
              to={{
                pathname: `/admin/user_agency/${id}`,
              }}
            >
              <StyledButton
                buttonStyle="btn--primary--outline"
                buttonSize="btn--small"
                // onClick={() => setShowModal(true)}
              >
                Modify
              </StyledButton>
            </Link>
          )}
          {showDeleteButton && (
            <StyledButton
              buttonStyle="btn--danger--outline"
              buttonSize="btn--small"
              onClick={() => {
                setDeleteModal(true);
              }}
            >
              Delete
            </StyledButton>
          )}
        </RoleButtons>
      </RoleContainer>
    </>
  );
};

export default RoleCard;
