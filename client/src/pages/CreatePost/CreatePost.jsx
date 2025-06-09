import React from "react";
import "./createPost.css";
import Image from "../../components/image/Image";
import useAuthStore from "../../utils/authStore";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { useMutation, useQuery } from "@tanstack/react-query";

const CreatePost = () => {
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [navigate, currentUser]);

  return (
    <div className="createPage">
      <div className="createTop">
        <h1>Create Pin</h1>
        <button>Publish</button>
      </div>
      <div className="createBottom">
        <label htmlFor="file" className="upload">
          <div className="uploadTitle">
            <Image path="/general/upload.svg" />
          </div>
          <div className="uploadInfo">
            We recommend using high quality .jpeg files in between 20-200 MB.
          </div>
        </label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
          hidden
        />
        <form className="createForm">
          <div className="createFormItem">
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              placeholder="Add a title"
              name="title"
              id="title"
            />
          </div>
          <div className="createFormItem">
            <label htmlFor="Description">Description</label>
            <input
              type="text"
              placeholder="Add a detailed description"
              name="Description"
              id="Description"
            />
          </div>
          <div className="createFormItem">
            <label htmlFor="Link">Link</label>
            <input type="text" placeholder="Add a Link" name="Link" id="Link" />
          </div>
          <div className="createFormItem">
            <label htmlFor="Board">Board</label>
            <select name="board" id="board">
              <option>Choose a board</option>
              <option value="1">Board 1</option>
              <option value="2">Board 2</option>
              <option value="3">Board 3</option>
            </select>
          </div>
          <div className="createFormItem">
            <label htmlFor="tags">Tags</label>
            <input type="text" placeholder="Add a Tag" name="tags" id="tags" />
            <small>Don't worry, people would not see your tags.</small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
