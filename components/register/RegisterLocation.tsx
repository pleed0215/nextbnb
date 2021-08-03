import React, { ChangeEventHandler } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import NavigationIcon from "../../public/static/svg/navigation.svg";
import Selector from "../common/Selector";
import { countryList } from "../../lib/staticData";
import { useSelector } from "../../store";
import { useDispatch } from "react-redux";
import {
  setCity,
  setCountry,
  setDetailAddress,
  setDistrict,
  setLatitude,
  setLongitude,
  setPostcode,
  setStreetAddress,
} from "../../store/register.room";
import { useForm } from "react-hook-form";
import Input from "../common/Input";
import { getLocationInfoAPI } from "../../lib/api/map";
import RegisterRoomFooter from "./RegisterRoomFooter";

const RegisterLocationBlock = styled.div`
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
  .register-room-location-button-wrapper {
    width: 176px;
    margin-bottom: 24px;
  }
  .register-room-location-country-selector-wrapper {
    width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-city-district {
    width: 385px;
    margin-bottom: 8px;
  }
  .register-room-location-street-address {
    width: 385px;
    margin-bottom: 8px;
  }
  .register-room-location-detail-address {
    width: 385px;
    margin-bottom: 8px;
  }
  .register-room-location-postcode {
    width: 385px;
    margin-bottom: 8px;
  }
  form {
    width: 100%;
  }
`;

type RegisterLocationForm = {
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
};

const RegisterLocation: React.FC = () => {
  const { country, longitude, latitude } = useSelector((state) => ({
    country: state.registerRoom.country,
    city: state.registerRoom.city,
    longitude: state.registerRoom.longitude,
    latitude: state.registerRoom.latitude,
  }));
  const dispatch = useDispatch();
  const { control, handleSubmit, formState, setValue } =
    useForm<RegisterLocationForm>({
      mode: "onBlur",
    });

  const onChangeCountrySelector: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    dispatch(setCountry(e.target.value));
  };
  const onValid = (data: RegisterLocationForm) => {
    const { city, district, streetAddress, detailAddress, postcode } = data;
    dispatch(setCity(city));
    dispatch(setDistrict(district));
    dispatch(setStreetAddress(streetAddress));
    dispatch(setDetailAddress(detailAddress));
    dispatch(setPostcode(postcode));
  };
  const onSuccessGetLocation: PositionCallback = async ({ coords }) => {
    const { latitude, longitude } = coords;

    dispatch(setLatitude(latitude));
    dispatch(setLongitude(longitude));
    try {
      const res = await getLocationInfoAPI({ latitude, longitude });
      const { country, city, streetAddress, district, postcode } = res.data;
      dispatch(setCountry(country));
      dispatch(setCity(city));
      dispatch(setStreetAddress(streetAddress));
      dispatch(setDistrict(district));
      dispatch(setPostcode(postcode));
      setValue("city", city);
      setValue("streetAddress", streetAddress);
      setValue("district", district);
      setValue("postcode", postcode);
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  const onClickGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      console.log(e);
      alert(e.message);
    });
  };

  return (
    <RegisterLocationBlock>
      <h2>숙소의 위치를 알려주세요</h2>
      <h3>4단계</h3>
      <p className="register-room-step-info">
        정확한 숙소 주소는 게스트가 예약을 완료한 후에만 공개됩니다.
      </p>
      <div className="register-room-location-button-wrapper">
        <Button
          color="dark_cyan"
          colorReverse
          icon={<NavigationIcon />}
          onClick={onClickGetCurrentLocation}
        >
          현재 위치 사용
        </Button>
      </div>
      <div className="register-room-location-country-selector-wrapper">
        <Selector
          type="register"
          options={countryList}
          useValidation={false}
          value={country}
          defaultValue={"국가/지역 선택"}
          disabledOptions={["국가/지역 선택"]}
          onChange={onChangeCountrySelector}
        />
      </div>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="register-room-location-city-district">
          <Input
            control={control}
            name="city"
            useValidation
            isValid={!Boolean(formState.errors.city)}
            label="시/도"
            rules={{
              required: { value: true, message: "시/군 정보를 입력해주세요." },
            }}
            placeholder="시/도 입력"
          />
          <Input
            control={control}
            name="district"
            useValidation
            isValid={!Boolean(formState.errors.district)}
            label="시/군/구"
            rules={{
              required: {
                value: true,
                message: "시/군/구 정보를 입력해주세요.",
              },
            }}
            placeholder="시/군/구 입력"
          />
        </div>
        <div className="register-room-location-street-address">
          <Input
            control={control}
            name="streetAddress"
            useValidation
            isValid={!Boolean(formState.errors.streetAddress)}
            label="도로명 주소"
            rules={{
              required: { value: true, message: "도로명 주소를 입력해주세요." },
            }}
            placeholder="도로명 주소를 입력해주세요"
          />
        </div>
        <div className="register-room-location-detail-address">
          <Input
            control={control}
            name="detailAddress"
            useValidation
            isValid={!Boolean(formState.errors.detailAddress)}
            label="상세 주소"
            placeholder="나머지 주소를 입력해주세요(선택)"
          />
        </div>
        <div className="register-room-location-postcode">
          <Input
            control={control}
            name="postcode"
            useValidation
            isValid={!Boolean(formState.errors.postcode)}
            label="우편 번호"
            rules={{
              required: { value: true, message: "우편번호를 입력해주세요." },
            }}
            placeholder="우편번호"
          />
        </div>
      </form>
      <RegisterRoomFooter
        prevHref="/room/register/bathroom"
        nextHref="/room/register/geometry"
        isValid
      />
    </RegisterLocationBlock>
  );
};

export default RegisterLocation;
