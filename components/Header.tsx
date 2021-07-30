import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

import LogoIcon from "../public/static/svg/logo.svg";
import LogoTextIcon from "../public/static/svg/logo-text.svg";
import { useSelector } from "../store";
import HeaderAuths from "./HeaderAuths";
import HeaderUserprofile from "./HeaderUserprofile";

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

  .header-logo-wrapper + div {
    position: relative;
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
`;

const Header: React.FC = () => {
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);

  const isLogged = useSelector((state) => state.user.isLogged);

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
      {!isLogged && <HeaderAuths />}
      {isLogged && <HeaderUserprofile />}
    </HeaderBlock>
  );
};

export default Header;
