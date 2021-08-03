import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { conveniencesList } from "../../lib/staticData";
import { useSelector } from "../../store";
import { setConveniences } from "../../store/register.room";
import CheckboxGroup from "../common/CheckboxGroup";
import RegisterRoomFooter from "./RegisterRoomFooter";

const RegisterConveniencesBlock = styled.div`
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
  .register-room-conveniences-checkbox-group-wrapper {
    width: 290px;
    margin-bottom: 32px;
  }
`;

const RegisterConveniences: React.FC = () => {
  const dispatch = useDispatch();
  const { conveniences } = useSelector((state) => ({
    conveniences: state.registerRoom.conveniences,
  }));

  const onChangeConveniences = (selected: string[]) => {
    dispatch(setConveniences(selected));
  };
  return (
    <RegisterConveniencesBlock>
      <h2>어떤 편의 공간을 제공하시나요?</h2>
      <h3>6단계</h3>
      <p className="register-room-step-info">
        등록하고자 하는 숙소에서 게스트가 이용 가능한 공용공간을 선택하세요.
      </p>
      <div className="register-room-conveniences-checkbox-group-wrapper">
        <CheckboxGroup
          value={conveniences}
          onChange={onChangeConveniences}
          options={conveniencesList}
        />
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/amenities"
        nextHref="/room/register/photos"
        isValid
      />
    </RegisterConveniencesBlock>
  );
};

export default RegisterConveniences;
