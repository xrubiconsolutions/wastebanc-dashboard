import React, { useState, useEffect } from "react";
import { Radio, Space } from "antd";
import styled from "styled-components";
import RadioDate from "./RadioDate";
import moment from "moment";
import tw from "twin.macro";
import { useDispatch, useSelector } from "react-redux";
import { getUserLocations, updateUserLocations } from "../../store/actions";

const SpaceStyle = styled.div`
  margin-left: 8px;
  font-size: 20px;

  .group {
    ${tw`min-h-[40vh]`}
  }
`;

const LocationButton = ({ onFilter }) => {
  const [value, setValue] = useState();
  const dispatch = useDispatch();

  const onChange = async (e) => {
    setValue(e.target.value);
    const res = await dispatch(updateUserLocations(e.target.value));
    if (!res.error) {
      await dispatch(getUserLocations());
      window.location.reload();
    }
  };

  const { getAllLocation } = useSelector((state) => state?.userAgencyLocation);

  useEffect(() => {
    if (!getAllLocation) dispatch(getUserLocations());
  }, []);

  useEffect(() => {
    if (getAllLocation) {
      const currentVal = getAllLocation.find((el) => el.default).name;
      setValue(currentVal);
    }
  }, [getAllLocation]);

  return (
    <div className="group">
      <Radio.Group onChange={onChange} value={value}>
        <SpaceStyle>
          <Space direction="vertical">
            {getAllLocation &&
              getAllLocation?.map((el, id) => (
                <Radio value={el.name}>{el.name}</Radio>
              ))}
            {/* <Radio value="lagos">Lagos</Radio>
            <Radio value="ogun">Ogun</Radio>
            <Radio value="osun">Osun</Radio>
            <Radio value="Ondo">Ondo</Radio> */}
          </Space>
        </SpaceStyle>
      </Radio.Group>
    </div>
  );
};

export default LocationButton;
