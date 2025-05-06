import React from "react";
import "./searchBar.css";
import UserButton from "../userButton/UserButton";

const searchBar = () => {
  return (
    <div className="searchBar">
      <div className="left">
        <img src="/general/search.svg" alt="search-input" />
        <input type="text" placeholder="Search" />
      </div>
      <div className="right">
        <UserButton />
      </div>
    </div>
  );
};

export default searchBar;
