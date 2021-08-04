import React from "react";
import styled from "styled-components";
import ReactAutosizeTextarea from "react-autosize-textarea";

const TextareaBlock = styled(ReactAutosizeTextarea)`
  position: relative;
  width: 100%;
  min-height: 216px;
  padding: 11px;
  border: 1px solid ${(props) => props.theme.palette.gray_eb};
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  resize: none;
  font: inherit;
  &::placeholder {
    color: ${(props) => props.theme.palette.gray_76};
  }
  &:focus {
    border-color: ${(props) => props.theme.palette.dark_cyan};
  }
`;

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  ...props
}) => {
  return <TextareaBlock {...props} />;
};

export default React.memo(Textarea);
