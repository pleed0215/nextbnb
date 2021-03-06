import React, { ChangeEventHandler } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "../../store";
import { setDescription } from "../../store/register.room";
import Textarea from "../common/Textarea";
import RegisterRoomFooter from "./RegisterRoomFooter";

const RegisterDescriptionBlock = styled.div`
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
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
`;

const RegisterDescription: React.FC = () => {
  const dispatch = useDispatch();
  const { description } = useSelector((state) => ({
    description: state.registerRoom.description,
  }));

  const onChangeDescription: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    dispatch(setDescription(e.target.value));
  };

  return (
    <RegisterDescriptionBlock>
      <h2>게스트에게 숙소에 대해 설명해주세요.</h2>
      <h3>8단계</h3>
      <p className="register-room-step-info">
        숙소의 장점, 특별한 편의(예: 빠른 와이파이 또는 주차 시설)과 주변 지역의
        매력을 소개해주세요.
      </p>
      <Textarea value={description} onChange={onChangeDescription} />
      <RegisterRoomFooter
        prevHref="/room/register/photos"
        nextHref="/room/register/title"
        isValid
      />
    </RegisterDescriptionBlock>
  );
};

export default RegisterDescription;
