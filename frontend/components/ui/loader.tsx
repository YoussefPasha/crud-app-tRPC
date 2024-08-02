"use client";

import React from "react";
import { ImSpinner2 } from "react-icons/im";

const Loader = () => {
  return (
    <div className="flex items-center justify-center mt-10 w-full h-full">
      <ImSpinner2 className="animate-spin h-12 w-12" />
    </div>
  );
};

export default Loader;
