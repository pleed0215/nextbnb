import React from "react";
import styled from "styled-components";
import { useSelector } from "../../store";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

type AuthModalProp = {
  closeModal: () => void;
};
const AuthModal: React.FC<AuthModalProp> = ({ closeModal }) => {
  const { authMode } = useSelector((state) => state.authMode);
  return (
    <div style={{ zIndex: 11 }}>
      {authMode === "signup" && <SignUpModal close={closeModal} />}
      {authMode === "login" && <LoginModal close={closeModal} />}
    </div>
  );
};

export default AuthModal;
