import React from "react";
import styled from "styled-components";

const RegisterRoomBuildingBlock = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${(props) => props.theme.palette.gray_76};
    margin-bottom: 6px;
  }
`;

const RegisterRoomBuilding: React.FC = () => {
  return (
    <RegisterRoomBuildingBlock>
      <h2>등록할 숙소의 종류는 무엇인가요?</h2>
      <h3>1단계</h3>
    </RegisterRoomBuildingBlock>
  );
};

export default RegisterRoomBuilding;
