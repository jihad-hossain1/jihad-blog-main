import React from "react";

const NotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-9xl font-bold">404</h2>
        <h2 className="text-3xl font-semibold">Page not found</h2>
        <p>Are you lost?</p>
        <a
          href="/"
          className="text-blue-600 border border-blue-400 px-4 text-sm"
        >
          Go Back
        </a>
      </div>
    </div>
  );
};

export default NotFound;
