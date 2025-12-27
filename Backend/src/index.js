import { app } from "./app.js";
import { connectDb } from "./db/index.db.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
