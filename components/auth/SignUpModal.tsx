import React from "react";
import styled from "styled-components";

const SignUpModalBlock = styled.div`
  width: 568px;
  height: 614px;
  background-color: white;
  z-index: 11;
`;

const SignUpModal: React.FC = () => {
  return <SignUpModalBlock>Sign Up</SignUpModalBlock>;
};

export default SignUpModal;
