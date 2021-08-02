import React from "react";
import styled from "styled-components";

import MinusIcon from "../../public/static/svg/counter-minus.svg";
import PlusIcon from "../../public/static/svg/counter-plus.svg";

const CounterBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .counter-label {
    font-size: 16px;
    color: ${(props) => props.theme.palette.gray_48};
    font-weight: 600;
  }

  .counter-description {
    display: block;
    font-size: 14px;
    color: ${(props) => props.theme.palette.gray_71};
  }
  .counter-contents {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 120px;

    button {
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 1px solid ${(props) => props.theme.palette["dark_cyan"]};
      color: ${(props) => props.theme.palette["dark_cyan"]};
      background-color: white;
      outline: none;
      cursor: pointer;
      font-size: 21px;
      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }
  }
`;

type CounterProps = {
  label?: string;
  description?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
};

const Counter: React.FC<CounterProps> = ({
  label,
  description,
  value = 1,
  min = 0,
  max,
  step = 1,
  onChange,
}) => {
  return (
    <CounterBlock>
      <label className="counter-label">
        {label}
        {description && (
          <span className="counter-description">{description}</span>
        )}
      </label>
      <div className="counter-contents">
        <button
          type="button"
          disabled={value === min}
          onClick={() => onChange && onChange(value - step)}
        >
          <MinusIcon />
        </button>
        <p>{value}</p>
        <button
          type="button"
          disabled={value === max}
          onClick={() => onChange && onChange(value + step)}
        >
          <PlusIcon />
        </button>
      </div>
    </CounterBlock>
  );
};

export default React.memo(Counter);
