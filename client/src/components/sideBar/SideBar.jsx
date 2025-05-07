import React from "react";
import "./sideBar.css";
import Image from "../image/image";

const sideBar = () => {
  return (
    <div className="sideBar">
      <div className="top">
        <a href="/" className="menuIcon">
          <Image path="/general/logo.png" alt="" className="logo" />
        </a>
        <a href="/" className="menuIcon">
          <Image path="/general/home.svg" alt="" />
        </a>
        <a href="/create" className="menuIcon">
          <Image path="/general/create.svg" alt="" />
        </a>
        <a href="/" className="menuIcon">
          <Image path="/general/updates.svg" alt="" />
        </a>
        <a href="/" className="menuIcon">
          <Image path="/general/messages.svg" alt="" />
        </a>
      </div>
      <div className="bottom">
        <a href="/" className="menuIcon">
          <Image path="/general/settings.svg" alt="" />
        </a>
      </div>
    </div>
  );
};

export default sideBar;
