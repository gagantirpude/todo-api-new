import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthentication = async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    //*
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //*
    req.user = await User.findById(decoded._id);

    //*
    next();
  } else {
    return res.status(400).json({
      success: false,
      message: "User Not Login",
      data: req.body,
    });
  }
};
