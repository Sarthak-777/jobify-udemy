import UnAuthenticatedError from "../middleware/unauthenticated.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default auth;
