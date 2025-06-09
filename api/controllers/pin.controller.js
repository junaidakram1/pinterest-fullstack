import Pin from "../models/pin.model.js";
import User from "../models/user.model.js";

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
