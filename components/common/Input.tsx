import React, { InputHTMLAttributes, useEffect } from "react";
import styled, { css } from "styled-components";

import {
  Controller,
  FieldValues,
  Path,
  UseControllerProps,
  FieldPath,
} from "react-hook-form";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  isValid: boolean;
  useValidation: boolean;
  errorMessage?: string;
}

type ControlledInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "value"> &
  UseControllerProps<TFieldValues, TName> & { label?: string } & IProps;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

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
    top: 17px;
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
    isValid &&
    css`
      input:focus {
        border-color: ${theme.palette.dark_cyan};
      }
    `}
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${(props) => props.theme.color.secondary};
  margin-bottom: 4px;
  span {
    display: block;
    margin-bottom: 8px;
  }
`;

type ControlledInputFuncType = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
>(
  props: ControlledInputProps<TFieldValues, TName>
) => JSX.Element;

const Input: ControlledInputFuncType = ({
  control,
  name,
  defaultValue,
  rules,
  label,
  icon,
  useValidation,
  isValid,
  errorMessage,
  ...rest
}) => (
  <Controller
    control={control}
    render={({ field, fieldState }) => (
      <InputWrapper>
        {label && <Label htmlFor={name}>{label}</Label>}
        <InputBlock
          iconExist={!!icon}
          isValid={isValid}
          useValidation={useValidation}
        >
          <input
            {...rest}
            onBlur={field.onBlur}
            onChange={field.onChange}
            value={field.value as string | number}
            ref={field.ref}
          />
          {icon}
          {useValidation && !isValid && errorMessage && (
            <p className="input-error-message">{errorMessage}</p>
          )}
        </InputBlock>
      </InputWrapper>
    )}
    rules={rules}
    name={name}
    defaultValue={defaultValue}
  />
);

export default Input;
