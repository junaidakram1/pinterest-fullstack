import React from "react";
import "./galleryItem.css";
import { Link } from "react-router-dom";
import Image from "../Image/Image";

const GalleryItem = ({ item }) => {
  const optimizedHeight = (372 * item.height) / item.width;
  return (
    <div
      className="galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      {/* <img src={item.media} alt="img" /> */}
      {/* <IKImage
        urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
        path={item.media}
      />  TESTING */}

      <Image path={item.media} w={372} h={optimizedHeight} />
      <Link to={`/pin/${item.id}`} className="overlay"></Link>
      <button className="saveButton">Save</button>
      <div className="overlayIcons">
        <button>
          <Image path="/general/share.svg" alt="share-button" />
        </button>
        <button>
          <Image path="/general/more.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
