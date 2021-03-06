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
      <h2>????????? ????????? ???????????????</h2>
      <h3>4??????</h3>
      <p className="register-room-step-info">
        ????????? ?????? ????????? ???????????? ????????? ????????? ????????? ???????????????.
      </p>
      <div className="register-room-location-button-wrapper">
        <Button
          color="dark_cyan"
          colorReverse
          icon={<NavigationIcon />}
          onClick={onClickGetCurrentLocation}
        >
          ?????? ?????? ??????
        </Button>
      </div>
      <div className="register-room-location-country-selector-wrapper">
        <Selector
          type="register"
          options={countryList}
          useValidation={false}
          value={country}
          defaultValue={"??????/?????? ??????"}
          disabledOptions={["??????/?????? ??????"]}
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
            label="???/???"
            rules={{
              required: { value: true, message: "???/??? ????????? ??????????????????." },
            }}
            placeholder="???/??? ??????"
          />
          <Input
            control={control}
            name="district"
            useValidation
            isValid={!Boolean(formState.errors.district)}
            label="???/???/???"
            rules={{
              required: {
                value: true,
                message: "???/???/??? ????????? ??????????????????.",
              },
            }}
            placeholder="???/???/??? ??????"
          />
        </div>
        <div className="register-room-location-street-address">
          <Input
            control={control}
            name="streetAddress"
            useValidation
            isValid={!Boolean(formState.errors.streetAddress)}
            label="????????? ??????"
            rules={{
              required: { value: true, message: "????????? ????????? ??????????????????." },
            }}
            placeholder="????????? ????????? ??????????????????"
          />
        </div>
        <div className="register-room-location-detail-address">
          <Input
            control={control}
            name="detailAddress"
            useValidation
            isValid={!Boolean(formState.errors.detailAddress)}
            label="?????? ??????"
            placeholder="????????? ????????? ??????????????????(??????)"
          />
        </div>
        <div className="register-room-location-postcode">
          <Input
            control={control}
            name="postcode"
            useValidation
            isValid={!Boolean(formState.errors.postcode)}
            label="?????? ??????"
            rules={{
              required: { value: true, message: "??????????????? ??????????????????." },
            }}
            placeholder="????????????"
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
