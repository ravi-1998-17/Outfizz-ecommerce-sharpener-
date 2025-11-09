import React from "react";
import classes from "@/components/Authentication/LoginButton.module.css";

const LoginButton = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className={`border-0 bg-transparent position-relative ${classes.loginButton}`}
    >
      <i className={`bi bi-person ${classes.loginIcon}`}>
        <span className="p-2">Logout</span>
      </i>
    </button>
  );
};

export default LoginButton;
