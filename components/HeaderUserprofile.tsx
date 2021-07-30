import React, { useState } from "react";
import styled from "styled-components";
import HamburgIcon from "../public/static/svg/hamburg.svg";
import OutsideClickHandler from "react-outside-click-handler";
import { logoutAPI } from "../lib/api/auth";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/user";
import Image from "next/image";
import { useSelector } from "../store";
import Link from "next/link";

const HeaderUserprofileBlock = styled.div`
  .header-user-profile {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border: 0;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
    &:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    }
    .header-user-profile-image {
      margin-left: 8px;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      border: 1px solid ${(props) => props.theme.palette.gray_48};
    }
    .header-usermenu {
      position: absolute;
      right: 0;
      top: 52px;
      width: 240px;
      padding: 8px 0;
      box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
      border-radius: 8px;
      background-color: white;
      li {
        display: flex;
        align-items: center;
        width: 100%auto;
        height: 42px;
        padding: 0 16px;
        cursor: pointer;
        &:hover {
          background-color: ${(props) => props.theme.palette.gray_f7};
        }
      }
      .header-usermenu-divider {
        width: 100%auto;
        height: 1px;
        margin: 8px 0;
        background-color: ${(props) => props.theme.palette.gray_dd};
      }
    }
    & + div {
      position: relative;
    }
  }
`;

const HeaderUserprofile: React.FC = () => {
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);
  const dispatch = useDispatch();
  const profileImage = useSelector((state) => state.user.profileImage);

  const onOutsideClick = () => {
    if (isUserMenuOpened) {
      setIsUserMenuOpened(false);
    }
  };
  const onClickToggleMenu = () => {
    setIsUserMenuOpened((prev) => !prev);
  };
  const onClickLogout = async () => {
    try {
      setIsUserMenuOpened(false);
      await logoutAPI();
      dispatch(logoutUser());
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <HeaderUserprofileBlock>
      <OutsideClickHandler onOutsideClick={onOutsideClick}>
        <button
          className="header-user-profile"
          type="button"
          onClick={onClickToggleMenu}
        >
          <HamburgIcon />
          <div className="header-user-profile-image">
            <Image
              src={profileImage}
              width={30}
              height={30}
              alt=""
              className="header-user-profile-image"
            />
          </div>
        </button>
        {isUserMenuOpened && (
          <ul className="header-usermenu">
            <li>숙소 관리</li>
            <Link href="/room/register/building">
              <a
                role="presentation"
                onClick={() => {
                  setIsUserMenuOpened(false);
                }}
              >
                <li>숙소 등록하기</li>
              </a>
            </Link>
            <div className="header-usermenu-divider" />
            <li role="presentation" onClick={onClickLogout}>
              로그아웃
            </li>
          </ul>
        )}
      </OutsideClickHandler>
    </HeaderUserprofileBlock>
  );
};

export default HeaderUserprofile;
