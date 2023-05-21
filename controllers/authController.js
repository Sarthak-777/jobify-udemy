import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import UnAuthenticatedError from "../middleware/unauthenticated.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("please provide all values");
  }
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  console.log(token);
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastname: user.lastName,
      name: user.name,
      location: user.location,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Creds");
  }
  console.log(user);
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Creds");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
  res.send("login user");
};

const updateUser = async (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };
