import React from "react";
import classes from "@/components/common/SearchIpt.module.css";

const SearchIpt = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className={`d-flex align-items-center ${classes.searchInputBox}`}>
      <i className={`bi bi-search ${classes.searchIcon}`}></i>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classes.customInput}
      />
    </div>
  );
};

export default SearchIpt;
