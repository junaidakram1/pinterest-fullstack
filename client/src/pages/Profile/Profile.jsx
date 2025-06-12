import React from "react";
import "./Profile.css";
import Image from "../../components/image/image";
import { useState } from "react";
import Gallery from "../../components/gallery/gallery";
import SavedCollections from "../../components/savedCollections/SavedCollections";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import apiRequest from "../../utils/apiRequest.js";
import FollowButton from "./FollowButton.jsx";
import authStore from "../../utils/authStore";

const Profile = () => {
  const [type, setType] = useState("created");

  const { username } = useParams();

  const currentUser = authStore((state) => state.currentUser);

  const { isPending, error, data } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "User not found!";
  return (
    <div className="profilePage">
      {" "}
      <Image
        className="profileImg"
        w={100}
        h={100}
        path={data.img || "/general/noAvatar.png"}
        alt=""
      />
      <h1 className="profileName">{data.displayName}</h1>
      <span className="profileUsername">@{data.username}</span>
      <div className="followCounts">
        {" "}
        {data.followerCount} followers · {data.followingCount} followings
      </div>
      <div className="profileInteractions">
        <Image path="/general/share.svg" alt="" />
        <div className="profileButtons">
          <button className="messageBtn">Message</button>
          {currentUser._id !== data._id && (
            <FollowButton
              isFollowing={data.isFollowing}
              username={data.username}
            />
          )}
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
      {type === "created" ? (
        <div className="galleryWrapper">
          <Gallery userId={data._id} />
        </div>
      ) : (
        <SavedCollections userId={data._id} />
      )}
    </div>
  );
};

export default Profile;
