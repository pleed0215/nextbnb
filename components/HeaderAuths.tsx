import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useModal from "../hooks/useModal";
import { setAuthMode } from "../store/auth.mode";
import AuthModal from "./auth/AuthModal";

const HeaderAuthsBlock = styled.div`
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
`;

const HeaderAuths: React.FC = () => {
  const { openModal, ModalPortal, closeModal } = useModal();
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
    <>
      <HeaderAuthsBlock>
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
      </HeaderAuthsBlock>
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </>
  );
};

export default HeaderAuths;
