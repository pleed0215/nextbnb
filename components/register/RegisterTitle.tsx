import React, { ChangeEventHandler } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "../../store";
import { setTitle } from "../../store/register.room";
import Textarea from "../common/Textarea";
import RegisterRoomFooter from "./RegisterRoomFooter";

const RegisterTitleBlock = styled.div`
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

const RegisterTitle: React.FC = () => {
  const dispatch = useDispatch();
  const { title } = useSelector((state) => ({
    title: state.registerRoom.title,
  }));
  const onChangeTitle: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    dispatch(setTitle(e.target.value));
  };
  return (
    <RegisterTitleBlock>
      <h2>숙소의 제목을 만드세요</h2>
      <h3>9단계</h3>

      <div className="register-room-step-info">
        <p>
          숙소의 특징과 장점을 강조하는 제목으로 게스트의 관심을 끌어보세요.
        </p>
        <Textarea value={title} onChange={onChangeTitle} />
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/description"
        nextHref="/room/register/price"
        isValid
      />
    </RegisterTitleBlock>
  );
};

export default RegisterTitle;
