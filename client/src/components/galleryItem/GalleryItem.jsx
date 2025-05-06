import React from "react";
import "./galleryItem.css";

const GalleryItem = ({ item }) => {
  return (
    <div
      className="galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      <img src={item.media} alt="img" />
    </div>
  );
};

export default GalleryItem;
