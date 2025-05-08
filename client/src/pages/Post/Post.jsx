import React from "react";
import Image from "../../components/Image/Image.jsx";
import PostInteractions from "../../components/postInteractions/PostInteractions.jsx";
import { Link } from "react-router";
import Comment from "../../components/comment/Comments.jsx";
import "./Post.css";

const Post = () => {
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
          <Image path="/pins/pin1.jpeg" alt="" w={736} />
        </div>
        <div className="postDetails">
          <PostInteractions />
          <Link to="/junaid" className="postUser">
            <Image path="/general/noAvatar.png" />
            <span>Junidepp</span>
          </Link>
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default Post;
