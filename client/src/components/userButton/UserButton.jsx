import React from "react";
import "./userButton.css";
import { useState } from "react";

const UserButton = () => {
  const [open, setOpen] = useState(false);
  const currentUser = true;
  return currentUser ? (
    <div className="userButton">
      <img src="/general/noAvatar.png" alt="avatar" />
      <div className="arrow-container">
        <img
          onClick={() => setOpen((prev) => !prev)}
          src="/general/arrow.svg"
          alt="dropdown"
          className="arrow"
        />
      </div>
      {open && (
        <div className="userOptions">
          <div className="userOption">Profile</div>
          <div className="userOption">Settings</div>
          <div className="userOption">Logout</div>
        </div>
      )}
    </div>
  ) : (
    <a href="/" className="loginLink">
      Login In/Sign Up
    </a>
  );
};

export default UserButton;
