import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import RoleCard from "../../components/role/RoleCard";
import RolesModal from "../../components/roles&claims/rolesModal";
import StyledButton from "../../components/UI/btn";
import { useSelector, useDispatch } from "react-redux";
import { getClaims, getRoles } from "../../store/actions";
import { claimPermissions } from "../../utils/constants";

const RolesContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 20px;
`;
const RolesHeader = styled.div`
  ${tw`flex self-end justify-self-end`}
`;
const Roles = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const {
    role: { roles, claims },
    auth: {
      userInfo: { claims: accountClaims },
    },
  } = useSelector((state) => state);

  const rolePermissions = accountClaims?.claims?.find(
    (claim) => claim.claimId.title === claimPermissions.ROLES.title
  );
  /****************************
   *
   * handlers and utils functions
   *
   ****************************/

  /****************************
   *
   * lifecycle hooks
   *
   ****************************/
  useEffect(() => {
    if (!roles) dispatch(getRoles());
    if (!claims) dispatch(getClaims());
  }, []);
  return (
    <>
      <RolesModal showModal={showModal} setShowModal={setShowModal} />
      <RolesContainer>
        <RolesHeader>
          {rolePermissions?.create && (
            <StyledButton
              buttonStyle="btn--primary--outline"
              buttonSize="btn--medium"
              className="flex justify-between items-center"
              onClick={() => setShowModal(true)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Create Roles
            </StyledButton>
          )}
        </RolesHeader>

        {roles?.map(({ title, claims, _id }) => (
          <RoleCard
            title={title}
            claims={claims}
            id={_id}
            key={_id}
            showDeleteButton={rolePermissions?.delete}
            showModifyButton={true || rolePermissions?.edit}
          />
        ))}
      </RolesContainer>
    </>
  );
};

export default Roles;
