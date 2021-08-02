import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { bedroomCountList } from "../../lib/staticData";
import { getNumber } from "../../lib/utils";
import { useSelector } from "../../store";
import {
  setBedCount,
  setBedroomCount,
  setMaximumGuestCount,
} from "../../store/register.room";

import Counter from "../common/Counter";
import Selector from "../common/Selector";
import RegisterRoomBedList from "./RegisterRoomBedList";
import RegisterRoomFooter from "./RegisterRoomFooter";
import RegisterRoomPublicBedTypes from "./RegisterRoomPublicBedTypes";

const RegisterRoomBedroomsBlock = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 600;
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
    word-break: keep-all;
  }
  .register-room-maximum-guest-count-wrapper {
    width: 320px;
    margin-top: 24px;
    margin-bottom: 32px;
  }
  .register-room-bedroom-count-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
  .register-room-bed-count-wrapper {
    width: 320px;
    margin-bottom: 57px;
  }
  .register-room-bed-type-info {
    margin-top: 6px;
    margin-bottom: 20px;
    max-width: 400px;
    word-break: keep-all;
  }

  .register-room-bed-type-list-wrapper {
    width: 548px;
  }
`;

const RegisterRoomBedrooms: React.FC = () => {
  const { maximumGuestCount, bedroomCount, bedCount } = useSelector(
    (state) => ({
      maximumGuestCount: state.registerRoom.maximumGuestCount,
      bedroomCount: state.registerRoom.bedroomCount,
      bedCount: state.registerRoom.bedCount,
    })
  );
  const dispatch = useDispatch();

  const onChangeMaximumGuestCount = (value: number) => {
    dispatch(setMaximumGuestCount(value));
  };
  const onChangeBedCount = (value: number) => {
    dispatch(setBedCount(value));
  };

  const onChangeBedroomCount: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    dispatch(setBedroomCount(getNumber(e.target.value) || 0));
  };

  return (
    <RegisterRoomBedroomsBlock>
      <h2>숙소에 얼마나 많은 인원이 숙박할 수 있나요?</h2>
      <h3>2단계</h3>
      <p className="room-register-step-info">
        모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지
        확인하세요
      </p>
      <div className="register-room-maximum-guest-count-wrapper">
        <Counter
          label="최대 숙박 인원"
          value={maximumGuestCount}
          onChange={onChangeMaximumGuestCount}
        />
      </div>
      <div className="register-room-bedroom-count-wrapper">
        <Selector
          type="register"
          value={`침실 ${bedroomCount}`}
          onChange={onChangeBedroomCount}
          label="게스트가 사용할 수 있는 침실은 몇 개인가요?"
          options={bedroomCountList}
        />
      </div>
      <div className="register-room-bed-count-wrapper">
        <Counter label="침대" value={bedCount} onChange={onChangeBedCount} />
      </div>
      <h4>침대 유형</h4>
      <p className="register-room-bed-type-info">
        각 침실에 놓인 침대 유형을 명시하면 숙소에 침대가 어떻게 구비되어 있는지
        게스트가 잘 파악할 수 있습니다.
      </p>
      <RegisterRoomBedList />
      <div className="register-room-bed-type-list-wrapper">
        <RegisterRoomPublicBedTypes />
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/building"
        nextHref="/room/register/bathroom"
        isValid={!!bedroomCount}
      />
    </RegisterRoomBedroomsBlock>
  );
};

export default RegisterRoomBedrooms;
