import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import WarnIcon from "../../public/static/svg/warn.svg";

const RadioGroupBlock = styled.div<{ isValid?: boolean }>`
  .radio-label {
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.theme.palette.gray_76};
    margin-bottom: 32px;
  }
  .radio-list-wrapper {
    &:after {
      display: block;
      content: "";
      clear: both;
    }
  }
  label {
    float: left;
    margin-bottom: 24px;
    font-size: 16px;
    line-height: 1.2;
    cursor: pointer;
    clear: both;

    &:last-child {
      margin-bottom: 0;
    }

    input[type="radio"] {
      width: 16px;
      height: 16px;
      margin: 0;
      position: relative;
      margin: 0;
      margin-right: 12px;
      flex-shrink: 0;
      font-size: 16px;
      -webkit-sppearance: none;
      border: 1px solid ${(props) => props.theme.palette.gray_b0};
      border-radius: 50%;
      outline: none;
      cursor: pointer;

      ${({ isValid, theme }) => {
        if (isValid === undefined) {
          return undefined;
        }
        return !!!isValid
          ? css`
              border-color: ${theme.palette.tawny};
              background-color: ${theme.palette.snow};
            `
          : css`
              border-color: ${theme.palette.dark_cyan};
            `;
      }}
      input[type='radio']:checked {
        background-color: ${(props) => props.theme.palette.dark_cyan};
        border: 0;
      }
      input[type="radio"]:checekd:after {
        content: "";
        width: 6px;
        height: 6px;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        border-radius: 50%;
        display: block;
      }
    }

    .radio-description {
      display: block;
      margin-top: 5px;
      margin-left: 28px;
    }
    .raidio-group-warning {
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
  }
`;
type RadioOptionType = { label: string; value: any; description?: string };
interface RadioGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: any;
  onChange?: (value: any) => void;
  options?: RadioOptionType[];
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  value,
  options = [],
  onChange,
  isValid,
  useValidation = false,
  errorMessage = "옵션을 선택하세요",
}) => {
  return (
    <RadioGroupBlock isValid={isValid}>
      <p className="radio-label">{label}</p>
      <div className="radio-list-wrapper">
        {options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              checked={value == option.value}
              onChange={() => onChange && onChange(option.value)}
            />
            <span>
              {option.label}
              <span className="radio-description">{option.description}</span>
              {useValidation && !!!isValid && (
                <div className="radio-group-warning">
                  <WarnIcon />
                  <p>{errorMessage}</p>
                </div>
              )}
            </span>
          </label>
        ))}
      </div>
    </RadioGroupBlock>
  );
};

export default React.memo(RadioGroup);
