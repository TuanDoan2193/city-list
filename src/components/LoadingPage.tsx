import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const LoadingPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-zinc-900">
      <LoadingSpinner size={80} />
    </div>
  );
};

export default LoadingPage;
