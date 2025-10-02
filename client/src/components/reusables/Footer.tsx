import React from "react";

const Footer = () => {
  return (
    <footer
      className={
        "flex min-h-32 w-full flex-col justify-end p-4 dark:bg-gray-900"
      }
    >
      <h1 className={"text-center text-sm font-medium text-gray-400"}>
        © {new Date().getFullYear()}{" "}
        <span className={"font-semibold"}>uploadxam.</span> All rights reserved.
      </h1>
    </footer>
  );
};

export default Footer;
