import React from "react";
import Image from "../Image/Image";
import "./postInteractions.css";

const PostInteractions = () => {
  return (
    <div className="postInteractions">
      <div className="left">
        <Image path="/general/react.svg" className="react" />
        <Image path="/general/share.svg" />
        <Image path="/general/more.svg" />
      </div>
      <div className="right">
        <button className="saveButtonPost">Save</button>
      </div>
    </div>
  );
};

export default PostInteractions;
