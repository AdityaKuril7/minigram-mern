import express from "express";
import {
  addUser,
  deleteUserById,
  getUserById,
  getUsers,
  Login,
  updateUserById,
} from "../controllers/user.controllers.js";
const userRouter = express.Router();

//create user update user delete user and get user

userRouter.route("/getUsers").get(getUsers); // get all users
userRouter.route("/getUser/:id").get(getUserById); // get specific user
userRouter.route("/addUser").post(addUser); // req.body;
userRouter.route("/updateUser/:id").put(updateUserById); // req.params;
userRouter.route("/deleteUser/:id").delete(deleteUserById); // req.params;
userRouter.route("/loginUser").post(Login);
export { userRouter };
