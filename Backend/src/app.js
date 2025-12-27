import express from "express";
import { userRouter } from "./routes/user.routes.js";
import { postRouter } from "./routes/post.routes.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/api/v1/post", postRouter);
app.use("/api/v1/user", userRouter);

export { app };
