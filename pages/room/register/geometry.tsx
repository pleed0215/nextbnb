import React from "react";
import dynamic from "next/dynamic";

const RegisterGeometry = dynamic(
  import("../../../components/register/RegisterGeometry"),
  { ssr: false }
);

const geometry: React.FC = () => {
  return <RegisterGeometry />;
};

export default geometry;
