import React, { ChangeEventHandler, useMemo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { largeBuildingTypeList } from "../../lib/staticData";
import { useSelector } from "../../store";
import Selector from "../common/Selector";

import {
  RegisterRoomType,
  setBuildingType,
  setIsSetupForGuest,
  setLargeBuildingType,
  setRoomType,
} from "../../store/register.room";
import RadioGroup from "../common/RadioGroup";
import RegisterRoomFooter from "./RegisterRoomFooter";

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

  .register-room-building-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
  .register-room-room-type-radio {
    max-width: 485px;
    margin-bottom: 50px;
  }
`;

const roomTypeRadioOptions = [
  {
    label: "집 전체",
    value: "entire",
    description:
      "게스트가 숙소 전체를 다른 사람과 공유하지 않고 단독으로 이용합니다. 일반적으로 침실, 욕실, 부엌이 포함됩니다.",
  },
  {
    label: "개인실",
    value: "private",
    description:
      "게스트에게 개인 침실이 제공됩니다. 침실 이외의 공간은 공용일 수 있습니다",
  },
  {
    label: "다인실",
    value: "public",
    description:
      "게스트는 개인 공간 없이, 다른 사람과 함께 쓰는 침실이나 공용공간에서 숙박합니다.",
  },
];

const isSetupForGuestOptions = [
  {
    label: "예, 게스트용으로 따로 마련된 숙소입니다.",
    value: true,
  },
  {
    label: "아니오, 제 개인 물건이 숙소에 있습니다.",
    value: false,
  },
];

const disabledLargeBuildingTypeOptions = ["하나를 선택해주세요"];

const RegisterRoomBuilding: React.FC = () => {
  const dispatch = useDispatch();

  const { largeBuildingType, buildingType, roomType, isSetupForGuest } =
    useSelector((state) => ({
      largeBuildingType: state.registerRoom.largeBuildingType,
      buildingType: state.registerRoom.buildingType,
      roomType: state.registerRoom.roomType,
      isSetupForGuest: state.registerRoom.isSetUpForGuest,
    }));

  const onChangeLargeBuildingType: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    dispatch(setLargeBuildingType(e.target.value));
  };
  const onChangeBuildingType: ChangeEventHandler<HTMLSelectElement> = (e) => {
    dispatch(setBuildingType(e.target.value));
  };
  const onChangeRoomType = (value: RegisterRoomType) => {
    dispatch(setRoomType(value));
  };

  const onChangeIsSetupForGuest = (value: boolean) => {
    dispatch(setIsSetupForGuest(value));
  };

  const detailBuildingOptions = useMemo<string[]>(() => {
    switch (largeBuildingType) {
      case "아파트": {
        const { apartmentBuildingTypeList } = require("../../lib/staticData");
        dispatch(setBuildingType(apartmentBuildingTypeList[0]));
        return apartmentBuildingTypeList;
      }
      case "별채": {
        const {
          secondaryUnitBuildingTypeList,
        } = require("../../lib/staticData");
        dispatch(setBuildingType(secondaryUnitBuildingTypeList[0]));
        return secondaryUnitBuildingTypeList;
      }
      case "주택": {
        const { houseBuildingTypeList } = require("../../lib/staticData");
        dispatch(setBuildingType(houseBuildingTypeList[0]));
        return houseBuildingTypeList;
      }
      case "독특한 숙소": {
        const { uniqueSpaceBuildingTypeList } = require("../../lib/staticData");
        dispatch(setBuildingType(uniqueSpaceBuildingTypeList[0]));
        return uniqueSpaceBuildingTypeList;
      }
      case "B&B": {
        const { bnbBuildingTypeList } = require("../../lib/staticData");
        dispatch(setBuildingType(bnbBuildingTypeList[0]));
        return bnbBuildingTypeList;
      }
      case "부티크호텔": {
        const {
          boutiqueHotelBuildingTypeList,
        } = require("../../lib/staticData");
        dispatch(setBuildingType(boutiqueHotelBuildingTypeList[0]));
        return boutiqueHotelBuildingTypeList;
      }
      default:
        return [];
    }
  }, [largeBuildingType, dispatch]);

  return (
    <RegisterRoomBuildingBlock>
      <h2>등록할 숙소의 종류는 무엇인가요?</h2>
      <h3>1단계</h3>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={largeBuildingType || undefined}
          defaultValue={disabledLargeBuildingTypeOptions[0]}
          disabledOptions={disabledLargeBuildingTypeOptions}
          label="우선 범위를 좁혀볼까요?"
          options={largeBuildingTypeList}
          onChange={onChangeLargeBuildingType}
        />
      </div>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={undefined}
          disabled={!largeBuildingType}
          label="건물 유형을 선택하세요"
          options={detailBuildingOptions}
          onChange={onChangeBuildingType}
        />
      </div>
      {buildingType && (
        <div className="register-room-room-type-radio">
          <RadioGroup
            label="게스트가 묵게 될 숙소 유형을 골라주세요."
            value={roomType}
            options={roomTypeRadioOptions}
            onChange={onChangeRoomType}
          />
        </div>
      )}
      {buildingType && (
        <div className="register-room-room-type-radio">
          <RadioGroup
            label="게스트만 사용하도록 만들어진 숙소인가요?"
            value={isSetupForGuest}
            options={isSetupForGuestOptions}
            onChange={onChangeIsSetupForGuest}
          />
        </div>
      )}
      <RegisterRoomFooter
        isValid={Boolean(
          largeBuildingType &&
            buildingType &&
            roomType &&
            isSetupForGuestOptions
        )}
        prevHref="/"
        nextHref="/room/register/bedrooms"
      />
    </RegisterRoomBuildingBlock>
  );
};

export default RegisterRoomBuilding;
