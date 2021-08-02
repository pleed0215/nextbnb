import Link from "next/link";
import React from "react";
import styled from "styled-components";
import BackIcon from "../../public/static/svg/arrow-back.svg";
import Button from "../common/Button";

const RegisterRoomFooterBlock = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${(props) => props.theme.palette.gray_dd};

  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.palette.dark_cyan};
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
`;

interface RegisterRoomFooterProps {
  prevHref?: string;
  nextHref?: string;
  isValid?: boolean;
}

const RegisterRoomFooter: React.FC<RegisterRoomFooterProps> = ({
  prevHref,
  nextHref,
  isValid,
}) => {
  const onClickNext: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!isValid) {
      e.preventDefault();
    }
  };

  return (
    <RegisterRoomFooterBlock>
      <Link href={prevHref || ""}>
        <a className="register-room-footer-back">
          <BackIcon />
          뒤로
        </a>
      </Link>
      <Link href={nextHref || ""}>
        <a>
          <Button color="dark_cyan" onClick={onClickNext}>
            계속
          </Button>
        </a>
      </Link>
    </RegisterRoomFooterBlock>
  );
};

export default RegisterRoomFooter;
