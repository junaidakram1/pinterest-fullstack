import Image from "../Image/Image";
import { format } from "timeago.js";

const Comment = ({ comment }) => {
  console.log("User image:", comment.user?.img);

  return (
    <div className="comment">
      <Image
        src={comment.user?.img ? comment.user.img : "/general/noAvatar.png"}
        alt={"/general/noAvatar.png"}
      />
      <div className="commentContent">
        <span className="commentUsername">
          {comment.user?.displayName || "Unknown User"}
        </span>
        <p className="commentText">{comment.description}</p>
        <span className="commentTime">
          {comment.createdAt ? format(comment.createdAt) : ""}
        </span>
      </div>
    </div>
  );
};

export default Comment;
