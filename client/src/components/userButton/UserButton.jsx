import React, { useRef } from "react";
import "./userButton.css";
import { useState } from "react";
import Image from "../Image/Image";
import useOutsideClick from "../../hooks/outsideClick";

const UserButton = () => {
  const [open, setOpen] = useState(false);
  const outsideRef = useRef();
  useOutsideClick(outsideRef, () => setOpen(false));

  const currentUser = true;
  return currentUser ? (
    <div className="userButton" ref={outsideRef}>
      <Image path="/general/noAvatar.png" alt="profile" />
      <div className="arrow-container">
        <Image
          onClick={() => setOpen((prev) => !prev)}
          path="/general/arrow.svg"
          alt="arrow"
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
