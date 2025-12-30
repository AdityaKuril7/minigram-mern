import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (users.length === 0) {
      return res.send({
        success: false,
        message: "No User found",
      });
    }
    res.send({ users });
  } catch (error) {
    return res.send({
      success: false,
      message: "Fetching Error",
      error: error,
    });
  }
};

export const addUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const result = await User.create({ username, email, password, role });
    res.send({ result });
  } catch (err) {
    return res.send({
      success: false,
      message: "Fetching Error in addUser",
      error: err.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) return res.send({ success: false, message: "User not found" });
    res.send({ user });
  } catch (error) {
    return res.send({
      success: false,
      message: "Fetching Error in addUser",
      error: err.message,
    });
  }
};

//Login controller
export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.send({ success: false, message: "Email Not Found" });
    const finalResult = await bcrypt.compare(password, user.password);
    if (!finalResult)
      return res.send({ success: false, message: "Invalid password" });
    return res.send({
      success: true,
      message: "Login Successfully !",
      id: user._id,
      username: user.username,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const user = await User.findByIdAndUpdate(id, updates);
    if (!user) return res.send({ success: false, message: "User not found" });
    res.send({ success: true, message: "Updated !" });
  } catch (error) {
    return res.send({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) res.send({ success: false, message: "User not found" });
    res.send({ success: true, message: "Deleted !" });
  } catch (error) {
    return res.send({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};


