import React, { useRef } from "react";
import Image from "../Image/Image";
import "./comments.css";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import useOutsideClick from "../../hooks/outsideClick";
const Comments = () => {
  const [open, setOpen] = useState(false);

  const emojiRef = useRef();

  useOutsideClick(emojiRef, () => setOpen(false));
  return (
    <div className="comments">
      <div className="commentList">
        <span className="commentCount">5 comments</span>

        {/* COMMENT */}
        <div className="comment">
          <Image path="/general/noAvatar.png" alt="" />
          <div className="commentContent">
            <span className="commentUsername">John Doe</span>
            <p className="commentText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <span className="commentTime">1h</span>
          </div>
        </div>

        <div className="comment">
          <Image path="/general/noAvatar.png" alt="" />
          <div className="commentContent">
            <span className="commentUsername">John Doe</span>
            <p className="commentText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <span className="commentTime">1h</span>
          </div>
        </div>

        <div className="comment">
          <Image path="/general/noAvatar.png" alt="" />
          <div className="commentContent">
            <span className="commentUsername">John Doe</span>
            <p className="commentText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <span className="commentTime">1h</span>
          </div>
        </div>

        <div className="comment">
          <Image path="/general/noAvatar.png" alt="" />
          <div className="commentContent">
            <span className="commentUsername">John Doe</span>
            <p className="commentText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <span className="commentTime">1h</span>
          </div>
        </div>

        <div className="comment">
          <Image path="/general/noAvatar.png" alt="" />
          <div className="commentContent">
            <span className="commentUsername">John Doe</span>
            <p className="commentText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <span className="commentTime">1h</span>
          </div>
        </div>
      </div>
      <form className="commentForm">
        <input type="text" placeholder="Add a comment!" name="" id="" />
        <div className="emoji" onClick={() => setOpen((prev) => !prev)}>
          😃
        </div>
        {open && (
          <div className="emojiPicker" ref={emojiRef}>
            <EmojiPicker />
          </div>
        )}
      </form>
    </div>
  );
};

export default Comments;
