import { message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { deleteResources, getResources } from "../../../store/actions";
import DeleteModal from "../../common/DeleteModal";
import StyledButton from "../../UI/btn";
import UpdateResourceModal from "../Resources/UpdateResourceModal";

const ResourcesItem = styled.div`
  ${tw`bg-white px-8 py-4 gap-8 border-b-2 border-gray-200 px-4 py-4`}
  display:grid;
  grid-template-columns: 1fr auto;
`;
const ResourcesItemTitle = styled.div`
  ${tw`flex items-center gap-3`}
`;
const ResourcesItemTitleBullet = styled.div`
  ${tw`bg-secondary h-5 w-5 rounded-sm`}
`;
const ResourceListContainer = styled.div`
  ${tw`flex flex-col`}
`;
const ResourcesItemTitleText = styled.h3`
  ${tw`uppercase text-sm font-bold`}
`;
const ResourcesItemTitleLink = styled.a`
  ${tw` text-xs text-secondary`}
`;
const ResourcesItemImg = styled.img`
  ${tw`cursor-pointer`}
`;

const ResourceButtons = styled.div`
  ${tw`flex items-center gap-2`}
`;

const ResourcesCard = ({
  title = "",
  url = "",
  id = "",
  message = "",
  showDelete = true,
  fetchAll = () => null,
  resource = "",
}) => {
  // console.log(
  //   "update info",
  //   "title",
  //   title,
  //   "url",
  //   url,
  //   "id",
  //   id,
  //   "message",
  //   message
  // );
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    const res = await dispatch(deleteResources(id));
    if (!res.error) {
      // dispatch(getResources());
      fetchAll();
    }
  };

  return (
    <>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setDeleteModal}
        handleDelete={deleteHandler}
        type="resource"
        title={title}
      />
      <UpdateResourceModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={title}
        url={url}
        id={id}
        message={message}
        fetchAll={fetchAll}
      />

      <ResourcesItem>
        <ResourcesItemTitle>
          <ResourcesItemTitleBullet />
          {/* <ResourcesItemTitleText>{name}</ResourcesItemTitleText> */}
          <ResourceListContainer>
            <ResourcesItemTitleText>{title}</ResourcesItemTitleText>
            <ResourcesItemTitleLink>{url}</ResourcesItemTitleLink>
          </ResourceListContainer>
          {/* <ResourcesItemTitleText>{message.slice(0,40)}</ResourcesItemTitleText> */}
        </ResourcesItemTitle>
        <ResourceButtons>
          <StyledButton
            buttonStyle="btn--primary--outline"
            buttonSize="btn--small"
            onClick={() => setShowModal(true)}
          >
            Update
          </StyledButton>

          {showDelete && (
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
        </ResourceButtons>
      </ResourcesItem>
    </>
  );
};

export default ResourcesCard;
