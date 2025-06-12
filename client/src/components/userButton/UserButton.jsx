import React, { useRef } from "react";
import "./userButton.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import Image from "../Image/Image";
import useOutsideClick from "../../hooks/outsideClick";
import apiRequest from "../../utils/apiRequest";
import useAuthStore from "../../utils/authStore";
import { Link } from "react-router";
const UserButton = () => {
  const [open, setOpen] = useState(false);
  const outsideRef = useRef();
  useOutsideClick(outsideRef, () => setOpen(false));

  const navigate = useNavigate();

  const { currentUser, removeCurrentUser } = useAuthStore();

  console.log("cuurent", currentUser);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/users/auth/logout", {});
      removeCurrentUser();
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };

  return currentUser ? (
    <div className="userButton" ref={outsideRef}>
      <Image path={currentUser.img || "/general/noAvatar.png"} alt="profile" />
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
          <Link to={`/${currentUser.username}`} className="userOption">
            Profile
          </Link>
          <div className="userOption">Settings</div>
          <div className="userOption" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  ) : (
    <Link to="/auth" className="loginLink">
      Login In/Sign Up
    </Link>
  );
};

export default UserButton;
