import React from "react";
import Image from "../../components/Image/Image.jsx";
import PostInteractions from "../../components/postInteractions/PostInteractions.jsx";
import { Link, useParams } from "react-router";
import Comments from "../../components/comment/Comments.jsx";
import "./Post.css";
import apiRequest from "../../utils/apiRequest.js";
import { useQuery } from "@tanstack/react-query";

const Post = () => {
  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["pin", id],
    queryFn: () => apiRequest.get(`/pins/${id}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "Pin not found!";

  console.log(data);
  return (
    <div className="postPage">
      <svg
        className="svg"
        height="20"
        viewBox="0 0 24 24"
        width="20"
        style={{ cursor: "pointer" }}
      >
        {" "}
        <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
      </svg>
      <div className="postContainer">
        <div className="postImg">
          <Image path={data.media} alt="" w={736} />
        </div>
        <div className="postDetails">
          <PostInteractions />
          <Link to={`/${data.user.username}`} className="postUser">
            <Image path={data.user.img || "/general/noAvatar.png"} />
            <span>{data.user.displayName}</span>
          </Link>
          <Comments id={data._id} />
        </div>
      </div>
    </div>
  );
};

export default Post;
