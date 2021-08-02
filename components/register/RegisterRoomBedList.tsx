import React from "react";
import styled from "styled-components";
import { useSelector } from "../../store";
import RegisterRoomBedTypes from "./RegisterRoomBedTypes";

const RegisterRoomBedList: React.FC = () => {
  const bedList = useSelector((state) => state.registerRoom.bedList);
  return (
    <ul className="register-room-bed-type-list-wrapper">
      {bedList.map((bedroom) => (
        <RegisterRoomBedTypes bedroom={bedroom} key={bedroom.id} />
      ))}
    </ul>
  );
};

export default RegisterRoomBedList;
