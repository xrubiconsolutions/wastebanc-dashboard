import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { deleteCategory, getCategory } from "../../store/actions";
import DeleteModal from "../common/DeleteModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import StyledButton from "../UI/btn";

const WasteCategoryItem = styled.div`
  ${tw`flex items-center justify-between border-b-2 border-gray-200 px-4 py-4`}
`;
const WasteCategoryItemTitle = styled.div`
  ${tw`flex items-center gap-2`}
`;
const WasteCategoryItemTitleBullet = styled.div`
  ${tw`bg-secondary h-5 w-5 rounded-sm`}
`;
const WasteCategoryItemTitleText = styled.div`
  ${tw`capitalize text-base`}
`;
const WasteCategoryItemImg = styled.img`
  ${tw`cursor-pointer`}
`;
const WasteCategoryButtons = styled.div`
  ${tw`flex items-center gap-2`}
`;

const WasteCategoryCard = ({
  name = "",
  id = "",
  wastepicker = "",
  showDelete = true,
}) => {
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    const res = await dispatch(deleteCategory(id));
    if (!res.error) dispatch(getCategory());
  };

  return (
    <>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setDeleteModal}
        handleDelete={deleteHandler}
        type="category"
      />
      <UpdateCategoryModal
        showModal={showModal}
        setShowModal={setShowModal}
        name={name}
        wastepicker={wastepicker}
        id={id}
      />
      <WasteCategoryItem>
        <WasteCategoryItemTitle>
          <WasteCategoryItemTitleBullet />
          <WasteCategoryItemTitleText>{name}</WasteCategoryItemTitleText>
        </WasteCategoryItemTitle>
        <WasteCategoryButtons>
          <StyledButton
            buttonStyle="btn--primary--outline"
            buttonSize="btn--small"
            onClick={() => setShowModal(true)}
          >
            Edit
          </StyledButton>
          {showDelete && (
            <WasteCategoryItemImg
              src="/assets/images/redbin.svg"
              alt="delete-icon"
              onClick={() => {
                setDeleteModal(true);
              }}
            />
          )}
        </WasteCategoryButtons>
      </WasteCategoryItem>
    </>
  );
};

export default WasteCategoryCard;
