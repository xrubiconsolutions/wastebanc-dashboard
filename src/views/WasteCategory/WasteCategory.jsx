import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "../../components/UI/btn";
import NewWasteCategoryModal from "../../components/wasteCategory/NewWasteCategoryModal";
import WasteCategoryCard from "../../components/wasteCategory/wasteCategoryCard";
import { getCategory } from "../../store/actions";
import { claimPermissions } from "../../utils/constants";

const WasteCategoryContainer = styled.div`
  display: grid;
  gap: 20px;
`;
const WasteCategoryHeader = styled.div`
  ${tw`flex self-end justify-self-end`}
`;
const WasteCategoryList = styled.div`
  ${tw`bg-white`}
`;

const WasteCategory = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.wasteCategory);

  const {
    userInfo: { claims },
  } = useSelector((state) => state.auth);

  const wastePermissions = claims?.claims?.find(
    (claim) => claim.claimId.title === claimPermissions.WASTE_CATEGORY.title
  );

  useEffect(() => {
    if (!category) dispatch(getCategory());
  }, []);
  // console.log(category, "category")
  return (
    <>
      <NewWasteCategoryModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <WasteCategoryContainer>
        {wastePermissions?.create && (
          <WasteCategoryHeader>
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
              Create
            </StyledButton>
          </WasteCategoryHeader>
        )}
        <WasteCategoryList>
          {category?.map(({ name, _id, value, wastepicker }, i) => {
            return (
              <WasteCategoryCard
                showDelete={wastePermissions?.delete}
                name={name}
                id={_id}
                key={i}
                value={value}
                wastepicker={wastepicker}
              />
            );
          })}
        </WasteCategoryList>
      </WasteCategoryContainer>
    </>
  );
};

export default WasteCategory;
