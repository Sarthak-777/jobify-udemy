import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("please provide all values");
  }
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  console.log(token);
  res
    .status(StatusCodes.OK)
    .json({
      user: {
        email: user.email,
        lastname: user.lastName,
        name: user.name,
        location: user.location,
      },
      token,
    });
};

const login = async (req, res) => {
  res.send("login user");
};

const updateUser = async (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };
