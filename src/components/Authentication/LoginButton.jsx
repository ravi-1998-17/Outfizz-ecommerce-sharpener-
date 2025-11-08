import React from "react";
import classes from "@/components/Authentication/LoginButton.module.css";

const LoginButton = () => {

  return (
    <>
      <button
        className={`border-0 bg-transparent position-relative ${classes.loginButton}`}
      >
        <i className={`bi bi-person ${classes.loginIcon}`}><span className="p-2">Login</span></i>

      </button>
    </>
  );
};

export default LoginButton;
