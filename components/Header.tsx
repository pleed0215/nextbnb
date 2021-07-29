import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

import LogoIcon from "../public/static/svg/logo.svg";
import LogoTextIcon from "../public/static/svg/logo-text.svg";
import HamburgIcon from "../public/static/svg/hamburg.svg";

import useModal from "../hooks/useModal";
import { useSelector } from "../store";
import { useDispatch } from "react-redux";
import { setAuthMode } from "../store/auth.mode";
import AuthModal from "./auth/AuthModal";

const HeaderBlock = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  z-index: 10;
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
  }

  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      transition: background-color 0.3s linear;
      &:hover {
        background-color: ${(props) => props.theme.palette.gray_f7};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      transition: box-shadow 0.3s linear;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }
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
  }
`;

const Header: React.FC = () => {
  const { openModal, ModalPortal, closeModal } = useModal();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onClickSignup = () => {
    dispatch(setAuthMode("signup"));
    openModal();
  };

  const onClickLogin = () => {
    dispatch(setAuthMode("login"));
    openModal();
  };

  return (
    <HeaderBlock>
      <Link href="/">
        <a>
          <div className="header-logo-wrapper">
            <LogoIcon className="header-logo" />
            <LogoTextIcon />
          </div>
        </a>
      </Link>
      {!user.isLogged && (
        <div className="header-auth-buttons">
          <button
            type="button"
            className="header-sign-up-button"
            onClick={onClickSignup}
          >
            회원 가입
          </button>
          <button
            type="button"
            className="header-login-button"
            onClick={onClickLogin}
          >
            로그인
          </button>
        </div>
      )}
      {user.isLogged && (
        <button className="header-user-profile" type="button">
          <HamburgIcon />
          <div className="header-user-profile-image">
            <Image
              src={user.profileImage}
              width={30}
              height={30}
              alt=""
              className="header-user-profile-image"
            />
          </div>
        </button>
      )}

      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </HeaderBlock>
  );
};

export default Header;
