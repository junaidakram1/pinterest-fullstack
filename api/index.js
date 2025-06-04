import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import userRouter from "./routes/user.route.js";
import pinRouter from "./routes/pin.route.js";
// import commentRouter from "./routes/comment.route.js";
// import boardRouter from "./routes/board.route.js";
import connectDB from "./utils/connectDB.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/users", userRouter);
app.use("/pins", pinRouter);
// app.use("/comments", commentRouter);
// app.use("/boards", boardRouter);

app.listen(3000, () => {
  connectDB();
  console.log("backend is running2!!");
});
