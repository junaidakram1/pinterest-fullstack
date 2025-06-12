import React from "react";
import "./savedCollections.css";
import Image from "../../components/Image/Image";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import { Link } from "react-router";
import { format } from "timeago.js";

const SavedCollections = ({ userId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["boards", userId],
    queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data), // need to create save route instead of board
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log("savedCollection", data);

  return (
    <div className="collections">
      {data?.map((board) => (
        <Link
          to={`/search?boardId=${board._id}`}
          className="collection"
          key={board._id}
        >
          <Image path={board.firstPin.media} alt="" />
          <div className="collectionInfo">
            <h1>{board.title}</h1>
            <span>
              {board.pinCount} Pins · {format(board.createdAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default SavedCollections;
