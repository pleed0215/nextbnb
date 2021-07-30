import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const ButtonBlock = styled.button`
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 4px;
  background-color: ${(props) => props.theme.palette.bittersweet};
  color: white;
  font-size: 16px;
  font-weight: 800;
  outline: none;
  cursor: pointer;
`;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <ButtonBlock {...props}>{children}</ButtonBlock>;
};

export default React.memo(Button);
