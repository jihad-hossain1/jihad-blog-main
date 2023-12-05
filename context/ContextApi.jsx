import AuthContext from "@/context/AuthContext";
// import { useEffect, useState } from "react";

const ContextApi = ({ children }) => {
  const isData = [
    {
      id: "abc",
    },
  ];
  const value = {
    isData,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default ContextApi;
