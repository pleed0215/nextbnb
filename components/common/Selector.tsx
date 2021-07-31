import React from "react";
import styled, { css } from "styled-components";
import WarnIcon from "../../public/static/svg/warn.svg";

const NormalSelectorStyle = css`
  width: 100%;
  height: 46px;

  select {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid ${(props) => props.theme.palette.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    background-image: url("/static/svg/arrow-down.svg");
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;
    &:focus {
      border-color: ${(props) => props.theme.palette.dark_cyan};
    }
  }
`;

const RegisterSelectorStyle = css`
  width: 100%;
  label {
    position: relative;
  }
  span {
    display: block;
    font-size: 16px;
    color: ${(props) => props.theme.palette.gray_76};
    font-weight: 600;
    margin-bottom: 8px;
  }
  select {
    width: 100%;
    height: 56px;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.palette.gray_b0};
    padding: 0 14px 0 12px;
    appearance: none;
    outline: none;
    -webkit-appearance: none;
    background-image: url("/static/svg/arrow-down.svg");
    background-position: right 14px center;
    background-repeat: none;
  }
`;

type SelectorContainerProps = {
  isValid?: boolean;
  type?: "register" | "normal";
};

const SelectorBlock = styled.div<SelectorContainerProps>`
  ${({ type }) => type === "normal" && NormalSelectorStyle};
  ${({ type }) => type === "register" && RegisterSelectorStyle};

  select {
    ${({ isValid, theme }) =>
      isValid
        ? css`
            border-color: ${theme.palette.gray_eb};
            background-color: white;
          `
        : css`
            border-color: ${theme.palette.tawny} !important;
            background-color: ${theme.palette.snow};
          `}
    ${({ theme: { palette } }) => css`
      &:disabled {
        background-image: url("/static/svg/disabled-selector-arrow-down.svg");
        background-color: ${palette.gray_f7};
        border-color: ${palette.gray_e5};
        color: ${palette.gray_e5};
        cursor: not-allowed;
      }
    `}
  }
  .selector-warning {
    margin-top: 8px;
    display: flex;
    align-items: center;
    svg {
      margin-right: 4px;
    }
    p {
      font-size: 12px;
      color: ${(props) => props.theme.palette.davidson_orange};
    }
  }
`;

type SelectorProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  isValid?: boolean;
  type?: "register" | "normal";
  errorMessage?: string;
  useValidation?: boolean;
};

const Selector: React.FC<SelectorProps> = ({
  options = [],
  disabledOptions = [],
  value,
  isValid = true,
  type = "normal",
  errorMessage,
  useValidation = true,
  label,
  ...rest
}) => {
  return (
    <SelectorBlock isValid={!!isValid} type={type}>
      <label>
        {label && <span>{label}</span>}
        <select {...rest}>
          {disabledOptions.map((option, index) => (
            <option key={index} value={option} disabled>
              {option}
            </option>
          ))}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      {!!!isValid && useValidation && errorMessage && (
        <div className="selector-warning">
          <WarnIcon />
          <p>{errorMessage}</p>
        </div>
      )}
    </SelectorBlock>
  );
};

export default React.memo(Selector);
