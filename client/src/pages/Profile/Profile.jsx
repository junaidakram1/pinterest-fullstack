import React from "react";
import "./Profile.css";
import Image from "../../components/image/image";
import { useState } from "react";
import Gallery from "../../components/gallery/gallery";
import SavedCollections from "../../components/savedCollections/SavedCollections";

const Profile = () => {
  const [type, setType] = useState("created");
  return (
    <div className="profilePage">
      {" "}
      <Image
        className="profileImg"
        w={100}
        h={100}
        path={"/general/noAvatar.png"}
        alt=""
      />
      <h1 className="profileName">Junidepp</h1>
      <span className="profileUsername">@junidepp1234</span>
      <div className="followCounts">50 followers · 23 followings</div>
      <div className="profileInteractions">
        <Image path="/general/share.svg" alt="" />
        <div className="profileButtons">
          <button className="messageBtn">Message</button>
          <button className="saveBtn">Follow</button>
        </div>
        <Image path="/general/more.svg" alt="" />
      </div>
      <div className="profileOptions">
        <span
          onClick={() => setType("created")}
          className={type === "created" ? "active" : ""}
        >
          Created
        </span>
        <span
          onClick={() => setType("saved")}
          className={type === "saved" ? "active" : ""}
        >
          Saved
        </span>
      </div>
      {type === "created" ? <Gallery /> : <SavedCollections />}
    </div>
  );
};

export default Profile;
