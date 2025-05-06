import React from "react";
import "./sideBar.css";
// import Image from "../image/image";

const sideBar = () => {
  return (
    <div className="sideBar">
      <div className="top">
        <a href="/" className="menuIcon">
          <img src="/general/logo.png" alt="" className="logo" />
        </a>
        <a href="/" className="menuIcon">
          <img src="/general/home.svg" alt="" />
        </a>
        <a href="/create" className="menuIcon">
          <img src="/general/create.svg" alt="" />
        </a>
        <a href="/" className="menuIcon">
          <img src="/general/updates.svg" alt="" />
        </a>
        <a href="/" className="menuIcon">
          <img src="/general/messages.svg" alt="" />
        </a>
      </div>
      <div className="bottom">
        <a href="/" className="menuIcon">
          <img src="/general/settings.svg" alt="" />
        </a>
      </div>
    </div>
  );
};

export default sideBar;
