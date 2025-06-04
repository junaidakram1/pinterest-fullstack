import React from "react";
import "./searchBar.css";
import UserButton from "../userButton/UserButton";
import Image from "../Image/Image";
import { useNavigate } from "react-router";

const searchBar = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?search=${e.target[0].value}`);
  };
  return (
    <div className="searchBar">
      <form onSubmit={handleSubmit} className="left">
        <Image path="/general/search.svg" alt="search-input" />
        <input type="text" placeholder="Search" />
      </form>
      <div className="right">
        <UserButton />
      </div>
    </div>
  );
};

export default searchBar;
