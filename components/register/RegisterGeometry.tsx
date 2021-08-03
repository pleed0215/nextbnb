import React, { useEffect, useRef } from "react";
import throttle from "lodash/throttle";
import styled from "styled-components";
import { useSelector } from "../../store";
import { setLatitude, setLongitude } from "../../store/register.room";
import { useDispatch } from "react-redux";
import RegisterRoomFooter from "./RegisterRoomFooter";

const RegisterGeometryBlock = styled.div`
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
  .register-room-geometry-map-wrapper {
    width: 487px;
    height: 280px;
    margin-top: 24px;
    > div {
      width: 100%;
      height: 100%;
    }
  }

  .gmnoprint .gm-style-mtc {
    display: none;
  }
  .gm-svpc {
    display: none;
  }
  .gm-fullscreen-control {
    display: none;
  }
`;

const loadMapScript = () => {
  return new Promise<void>((resolve) => {
    const script = document.createElement("script");

    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);
    script.onload = () => {
      resolve();
    };
  });
};

declare global {
  interface Window {
    initMap: () => void;
  }
}

const RegisterGeometry: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { latitude, longitude } = useSelector((state) => ({
    latitude: state.registerRoom.latitude,
    longitude: state.registerRoom.longitude,
  }));
  const dispatch = useDispatch();

  const loadMap = async () => {
    await loadMapScript();
  };
  window.initMap = () => {
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: latitude || 37.566,
          lng: longitude || 126.977,
        },
        zoom: 14,
      });
      const marker = new window.google.maps.Marker({
        position: { lat: latitude || 37.566, lng: longitude || 126.977 },
        map,
      });
      map.addListener(
        "center_changed",
        throttle(() => {
          const centerLat = map.getCenter().lat();
          const centerLng = map.getCenter().lng();
          marker.setPosition({ lat: centerLat, lng: centerLng });
          dispatch(setLatitude(centerLat));
          dispatch(setLongitude(centerLng));
        }, 150)
      );
    }
  };

  useEffect(() => {
    loadMap();
  }, []);
  return (
    <RegisterGeometryBlock>
      <h2>핀이 놓인 위치가 정확한가요?</h2>
      <h3>4단계</h3>
      <p>필요한 경우 핀이 정확한 위치에 자리하도록 조정할 수 있어요.</p>
      <div className="register-room-geometry-map-wrapper">
        <div ref={mapRef} id="map"></div>
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/location"
        nextHref="/room/register/amenities"
        isValid
      />
    </RegisterGeometryBlock>
  );
};

export default RegisterGeometry;
