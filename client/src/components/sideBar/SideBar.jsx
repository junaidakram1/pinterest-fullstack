import React from "react";
import "./sideBar.css";
import { Link } from "react-router";
import Image from "../image/image";

const sideBar = () => {
  return (
    <div className="sideBar">
      <div className="top">
        <Link to="/" className="menuIcon">
          <Image path="/general/logo.png" alt="" className="logo" />
        </Link>
        <Link to="/" className="menuIcon">
          <Image path="/general/home.svg" alt="" />
        </Link>
        <Link to="/create" className="menuIcon">
          <Image path="/general/create.svg" alt="" />
        </Link>
        <Link to="/" className="menuIcon">
          <Image path="/general/updates.svg" alt="" />
        </Link>
        <Link to="/" className="menuIcon">
          <Image path="/general/messages.svg" alt="" />
        </Link>
      </div>
      <div className="bottom">
        <Link to="/" className="menuIcon">
          <Image path="/general/settings.svg" alt="" />
        </Link>
      </div>
    </div>
  );
};

export default sideBar;
