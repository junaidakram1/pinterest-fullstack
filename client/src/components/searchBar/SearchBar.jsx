import React from "react";
import "./searchBar.css";
import UserButton from "../userButton/UserButton";
import Image from "../Image/Image";

const searchBar = () => {
  return (
    <div className="searchBar">
      <div className="left">
        <Image path="/general/search.svg" alt="search-input" />
        <input type="text" placeholder="Search" />
      </div>
      <div className="right">
        <UserButton />
      </div>
    </div>
  );
};

export default searchBar;
