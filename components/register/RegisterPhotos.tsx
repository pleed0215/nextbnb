import { isEmpty } from "lodash";
import React, { ChangeEventHandler } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "../../store";
import Button from "../common/Button";
import UploadIcon from "../../public/static/svg/upload.svg";
import { uploadFileAPI } from "../../lib/api/file";
import { setPhotos } from "../../store/register.room";
import RegisterRoomPhotoCardList from "./RegisterRoomPhotoCardList";

const RegisterPhotosBlock = styled.div`
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
  .register-room-upload-photo-wrapper {
    width: 858px;
    height: 433px;
    margin: auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed ${(props) => props.theme.palette.gray_bb};
    border-radius: 6px;

    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    img {
      width: 100%;
      max-height: 100%;
    }
  }
`;

const RegisterPhotos: React.FC = () => {
  const { photos } = useSelector((state) => ({
    photos: state.registerRoom.photos,
  }));
  const dispatch = useDispatch();

  const onChangePhoto: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const formdata = new FormData();
      formdata.append("file", file);
      try {
        const { data } = await uploadFileAPI(formdata);
        if (data) {
          dispatch(setPhotos([...photos, data]));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <RegisterPhotosBlock>
      <h2>숙소 사진 올리기</h2>
      <h3>7단계</h3>
      <p className="register-room-step-info">
        게스트가 사진을 보고 숙소의 느낌을 생생히 떠올려 볼 수 있도록 해주세요.
        우선 사진 1장을 업로드하고 숙소를 등록한 후에 추가할 수 있습니다.
      </p>
      {isEmpty(photos) && (
        <div className="register-room-upload-photo-wrapper">
          <>
            <input type="file" accept="image/*" onChange={onChangePhoto} />
            <Button icon={<UploadIcon />} color="bittersweet" width="167px">
              사진 업로드
            </Button>
          </>
        </div>
      )}
      {!isEmpty(photos) && <RegisterRoomPhotoCardList photos={photos} />}
    </RegisterPhotosBlock>
  );
};

export default RegisterPhotos;
