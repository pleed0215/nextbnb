import React from "react";
import styled, { css } from "styled-components";

type InputBlockProps = {
  iconExist?: boolean;
  isValid: boolean;
  useValidation?: boolean;
};

const InputBlock = styled.div<InputBlockProps>`
  position: relative;
  input {
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? "0 44px 0 11px" : "0 11px")};
    border: 1px solid ${(props) => props.theme.palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    ::placeholder {
      color: ${(props) => props.theme.palette.gray_76};
    }
  }
  svg {
    position: absolute;
    top: 15px;
    right: 11px;
    height: 46px;
  }

  .input-error-message {
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${(props) => props.theme.palette.tawny};
  }

  ${({ useValidation, isValid, theme }) =>
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${theme.palette.snow};
        border-color: ${theme.palette.orange};
        &:focus {
          border-color: ${theme.palette.orange};
        }
      }
    `}
  ${({ useValidation, isValid, theme }) =>
    useValidation &&
    !isValid &&
    css`
      input {
        border-color: ${theme.palette.dark_cyan};
      }
    `}
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  isValid: boolean;
  validateMode?: boolean;
  useValidation: boolean;
  errorMessage?: string;
}

const Input: React.FC<IProps> = ({
  icon,
  isValid = false,
  validateMode,
  useValidation = true,
  errorMessage,
  ...rest
}) => {
  return (
    <InputBlock
      iconExist={!!icon}
      isValid={isValid}
      useValidation={useValidation && validateMode}
    >
      <input {...rest} />
      {icon}
      {useValidation && validateMode && !isValid && errorMessage && (
        <p className="input-error-message">{errorMessage}</p>
      )}
    </InputBlock>
  );
};

export default Input;
