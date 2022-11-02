import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import StyledButton from "../../components/UI/btn";
import ResourcesCard from "../../components/UI/Resources/ResourcesCard";
import { getResources } from "../../store/actions";
import UploadResourceModal from "../../components/UI/Resources/UploadResourceModal";

const ResourceContainer = styled.div`
  display: grid;
  gap: 20px;
`;
const ResourceHeader = styled.div`
  ${tw`flex self-end justify-self-end`}
`;
const ResourceList = styled.div`
  ${tw`bg-white`}
`;

const Resources = () => {
  /****************************
   *
   * states and hooks
   *
   ****************************/
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { allResources } = useSelector((state) => state?.resource);

  useEffect(() => {
    if (!allResources) dispatch(getResources());
  }, []);
  return (
    <>
      <UploadResourceModal showModal={showModal} setShowModal={setShowModal} />
      <ResourceContainer>
        <ResourceHeader>
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
            Upload
          </StyledButton>
        </ResourceHeader>
        <ResourceList>
          {allResources?.map(({ title, url, _id, message }, i) => {
            return (
              <ResourcesCard
                title={title}
                url={url}
                id={_id}
                message={message}
              />
            );
          })}
        </ResourceList>
      </ResourceContainer>
    </>
  );
};

export default Resources;
