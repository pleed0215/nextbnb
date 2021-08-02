import React, { ButtonHTMLAttributes } from "react";
import styled, { css, DefaultTheme } from "styled-components";

type PaletteColor = keyof DefaultTheme["palette"];
const getButtonColor = (color: PaletteColor) => {
  return css`
    background-color: ${(props) => props.theme.palette[color]};
  `;
};

const NormalButtonStyle = css`
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
const RegisterButtonStyle = css`
  width: 161px;
  height: 45px;
  border: 1px solid ${(props) => props.theme.palette.gray_c4};
  background-color: white;
  border-radius: 4px;
  color: ${(props) => props.theme.palette.gray_48};
  font-size: 18px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
`;

const ButtonBlock = styled.button<{
  color?: PaletteColor;
  styleType: "normal" | "register";
}>`
  ${({ styleType }) =>
    styleType === "normal" ? NormalButtonStyle : RegisterButtonStyle};
  ${({ color }) => (color ? getButtonColor(color) : undefined)};
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: PaletteColor;
  styleType?: "normal" | "register";
}

const Button: React.FC<ButtonProps> = ({
  children,
  styleType = "normal",
  ...props
}) => {
  return (
    <ButtonBlock {...props} styleType={styleType}>
      {children}
    </ButtonBlock>
  );
};

export default React.memo(Button);
