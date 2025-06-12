import Pin from "../models/pin.model.js";
import User from "../models/user.model.js";
// import Like from "../models/like.model.js";
// import Save from "../models/save.model.js";
import Board from "../models/board.model.js";
import Imagekit from "imagekit";
import jwt from "jsonwebtoken";
import sharp from "sharp";

export const getPins = async (req, res) => {
  const pageNumber = Number(req.query.cursor) || 0;
  const search = req.query.search;
  const userId = req.query.userId;
  const boardId = req.query.boardId;

  const LIMIT = 21;

  const filter = search
    ? {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { tags: { $in: [search] } },
        ],
      }
    : userId
    ? { user: userId }
    : boardId
    ? { board: boardId }
    : {};

  try {
    const pins = await Pin.find(filter)
      .limit(LIMIT)
      .skip(pageNumber * LIMIT);

    const hasNextPage = pins.length === LIMIT;

    res
      .status(200)
      .json({ pins, nextCursor: hasNextPage ? pageNumber + 1 : null });
  } catch (error) {
    console.error("Error fetching pins:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPin = async (req, res) => {
  const { id } = req.params;
  const pin = await Pin.findById(id).populate(
    "user",
    "username img displayName"
  );
  console.log("Pin", pin);
  res.status(200).json(pin);
};

export const createPin = async (req, res) => {
  const {
    title,
    description,
    link,
    board,
    tags,
    textOptions,
    canvasOptions,
    newBoard,
  } = req.body;

  const media = req.files.media;

  if (!title || !description || !media) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const parsedTextOptions = JSON.parse(textOptions || "{}");
  const parsedCanvasOptions = JSON.parse(canvasOptions || "{}");

  const metadata = await sharp(media.data).metadata();

  const originalOrientation =
    metadata.width < metadata.height ? "portrait" : "landscape";
  const originalAspectRatio = metadata.width / metadata.height;

  let clientAspectRatio = 1;
  let width = metadata.width;
  let height = metadata.height;

  if (parsedCanvasOptions.size !== "original") {
    const [wRatio, hRatio] = parsedCanvasOptions.size.split(":").map(Number);

    if (!isNaN(wRatio) && !isNaN(hRatio) && hRatio !== 0) {
      clientAspectRatio = wRatio / hRatio;
      height = Math.round(metadata.width / clientAspectRatio);
    }
  } else {
    if (
      parsedCanvasOptions.orientation &&
      parsedCanvasOptions.orientation !== originalOrientation
    ) {
      clientAspectRatio = 1 / originalAspectRatio;
      height = Math.round(metadata.width / clientAspectRatio);
    } else {
      height = metadata.height;
    }
  }

  const imagekit = new Imagekit({
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY,
    urlEndpoint: process.env.IK_URL_ENDPOINT,
  });

  const canvasHeight = parsedCanvasOptions.height || 375;

  const textLeftPosition =
    Math.round((parsedTextOptions.left * width) / 375) || 0;
  const textTopPosition =
    Math.round((parsedTextOptions.top * height) / canvasHeight) || 0;

  let croppingStrategy = "";

  if (parsedCanvasOptions.size !== "original") {
    if (originalAspectRatio > clientAspectRatio) {
      croppingStrategy = ",cm-pad_resize";
    }
  } else {
    if (
      originalOrientation === "landscape" &&
      parsedCanvasOptions.orientation === "portrait"
    ) {
      croppingStrategy = ",cm-pad_resize";
    }
  }

  const transformationString = `w-${width},h-${height}${croppingStrategy},bg-${(
    parsedCanvasOptions.backgroundColor || "#ffffff"
  ).substring(1)}${
    parsedTextOptions.text
      ? `,l-text,i-${parsedTextOptions.text},fs-${
          (parsedTextOptions.fontSize || 48) * 2.1
        },lx-${textLeftPosition},ly-${textTopPosition},co-${(
          parsedTextOptions.color || "#000000"
        ).substring(1)},l-end`
      : ""
  }`;

  imagekit
    .upload({
      file: media.data,
      fileName: media.name,
      folder: "test",
      transformation: {
        pre: transformationString,
      },
    })
    .then(async (response) => {
      let newBoardId;

      if (newBoard) {
        const res = await Board.create({
          title: newBoard,
          user: req.userId,
        });
        newBoardId = res._id;
      }

      const newPin = await Pin.create({
        user: req.userId,
        title,
        description,
        link: link || null,
        board: newBoardId || board || null,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        media: response.filePath,
        width: response.width,
        height: response.height,
      });

      return res.status(201).json(newPin);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json(err);
    });
};
