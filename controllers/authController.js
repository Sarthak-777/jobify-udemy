import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import UnAuthenticatedError from "../middleware/unauthenticated.js";
import attachCookies from "../utils/attachCookie.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("please provide all values");
  }
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  console.log(token);
  attachCookies({ res, token });

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastname: user.lastName,
      name: user.name,
      location: user.location,
    },

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
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Creds");
  }
  const token = user.createJWT();

  user.password = undefined;
  attachCookies({ res, token });

  res.status(StatusCodes.OK).json({ user, location: user.location });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();
  attachCookies({ res, token });

  res.status(StatusCodes.OK).json({ user, location: user.location });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, location: user.location });
};

export { register, login, updateUser, getCurrentUser };
