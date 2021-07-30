import React from "react";
import styled, { css } from "styled-components";

const SelectorBlock = styled.div<{ isValid: boolean }>`
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
  ${({ isValid, theme }) =>
    isValid
      ? css`
          select {
            border-color: ${theme.palette.gray_eb};
            background-color: white;
          }
        `
      : css`
          select {
            border-color: ${theme.palette.tawny} !important;
            background-color: ${theme.palette.snow};
          }
        `}
`;

type SelectorProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  isValid?: boolean;
};

const Selector: React.FC<SelectorProps> = ({
  options = [],
  disabledOptions = [],
  value,
  isValid = true,
  ...rest
}) => {
  return (
    <SelectorBlock isValid={isValid}>
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
    </SelectorBlock>
  );
};

export default React.memo(Selector);
