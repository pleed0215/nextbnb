import React from "react";
import Image from "next/image";
import styled from "styled-components";
import PencilIcon from "../../public/static/svg/pencil.svg";
import TrashIcon from "../../public/static/svg/trash.svg";
import GrayPlusIcon from "../../public/static/svg/gray-plus.svg";
import { uploadFileAPI } from "../../lib/api/file";
import { useDispatch } from "react-redux";
import { setPhotos } from "../../store/register.room";
import RegisterRoomFooter from "./RegisterRoomFooter";

const RegisterRoomPhotoCardListBlock = styled.div`
  width: 858px;
  margin: auto;
  .register-room-first-photo-wrapper {
    width: 858px;
    height: 433px;
    margin: 0 auto 24px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    overflow: hidden;
    &:hover {
      .register-room-photo-interaction-buttons {
        display: flex;
      }
    }
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
  .register-room-photo-interaction-buttons {
    display: none;
    position: absolute;
    top: 8px;
    right: 8px;
    button {
      width: 48px;
      height: 48px;
      background-color: white;
      border-radius: 50%;
      cursor: pointer;
      border: 0;
      outline: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
      &:first-child {
        margin-right: 8px;
      }
    }
  }

  li:nth-child(3n + 1) {
    margin-right: 0;
  }
  .register-room-photo-card {
    position: relative;
    display: inline-block;
    width: calc((100% - 48px) / 3);
    height: 180px;
    border-radius: 6px;

    overflow: hidden;
    margin-right: 24px;
    margin-bottom: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
    transition: box-shadow 0.3s linear;
    &:hover {
      .register-room-photo-interaction-buttons {
        display: flex;
      }
      box-shadow: 5px 3px 5px rgba(0, 0, 0, 0.18);
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .register-room-add-more-photo-card {
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 2px dashed ${(props) => props.theme.palette.gray_bb};
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    margin-right: 24px;
    margin-bottom: 24px;
    display: flex;
    svg {
      margin-bottom: 12px;
    }
  }
`;

interface IProps {
  photos: string[];
}

const RegisterRoomPhotoCardList: React.FC<IProps> = ({ photos }) => {
  const dispatch = useDispatch();

  const addPhoto = () => {
    const inputEl = document.createElement("input");
    inputEl.type = "file";
    inputEl.accept = "image/*";
    inputEl.onchange = (e) => {
      const { files } = e.target as HTMLInputElement;
      if (files && files.length > 0) {
        const file = files[0];
        const formData = new FormData();
        formData.append("file", file);
        uploadFileAPI(formData)
          .then(({ data }) => {
            dispatch(setPhotos([...photos, data]));
          })
          .catch((e) => console.log(e));
      }
    };
    inputEl.click();
  };
  const deletePhoto = (index: number) => () => {
    const newPhotos = photos.slice(0);
    newPhotos.splice(index, 1);
    dispatch(setPhotos(newPhotos));
  };
  const editPhoto = (index: number) => () => {
    const inputEl = document.createElement("input");
    inputEl.type = "file";
    inputEl.accept = "image/*";
    inputEl.onchange = (e) => {
      const { files } = e.target as HTMLInputElement;
      if (files && files.length > 0) {
        const file = files[0];
        const formData = new FormData();
        formData.append("file", file);
        uploadFileAPI(formData)
          .then(({ data }) => {
            const newPhotos = photos.slice(0);
            newPhotos[index] = data;
            dispatch(setPhotos(newPhotos));
          })
          .catch((e) => console.log(e));
      }
    };
    inputEl.click();
  };

  return (
    <RegisterRoomPhotoCardListBlock>
      {photos.map((photo, index) => (
        <React.Fragment key={index}>
          {index === 0 && (
            <li className="register-room-first-photo-wrapper">
              <img src={photo} alt="" />
              <div className="register-room-photo-interaction-buttons">
                <button type="button" onClick={deletePhoto(index)}>
                  <TrashIcon />
                </button>
                <button type="button" onClick={editPhoto(index)}>
                  <PencilIcon />
                </button>
              </div>
            </li>
          )}
          {index !== 0 && (
            <li className="register-room-photo-card">
              <img src={photo} alt="" />
              <div className="register-room-photo-interaction-buttons">
                <button type="button" onClick={deletePhoto(index)}>
                  <TrashIcon />
                </button>
                <button type="button" onClick={editPhoto(index)}>
                  <PencilIcon />
                </button>
              </div>
            </li>
          )}
        </React.Fragment>
      ))}
      <li
        className="register-room-photo-card"
        role="presentation"
        onClick={addPhoto}
      >
        <div className="register-room-add-more-photo-card">
          <GrayPlusIcon />
          추가하기
        </div>
      </li>
      <RegisterRoomFooter
        prevHref="/room/register/conveniences"
        nextHref="/room/register/description"
        isValid
      />
    </RegisterRoomPhotoCardListBlock>
  );
};

export default RegisterRoomPhotoCardList;
