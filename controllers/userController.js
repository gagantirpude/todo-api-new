import User from "../models/userModel.js";
import { sendCookie } from "../utils/sendCookie.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../middlewares/error.js";
import { removeCookie } from "../utils/removeCookie.js";

//* Register user
export const register = async (req, res, next) => {
  try {
    // Data From Body
    const { name, email, password } = req.body;

    //find email from Database
    let user = await User.findOne({ email });

    //if user exist
    if (user) {
      return next(new ErrorHandler("User Already Exist", 400));
    } else {
      // HashPassword
      const HashPassword = await bcrypt.hash(password, 10);

      user = await User.create({
        name,
        email,
        password: HashPassword,
      });

      //Response && Token && Cookies
      sendCookie(req, res, user, 201, "User Register Successfully");
    }
  } catch (error) {
    next(error);
  }
};

//* login User
export const login = async (req, res, next) => {
  try {
    //Data From Body
    const { email, password } = req.body;

    //Find User from Database
    let user = await User.findOne({ email }).select("+password");

    //if user not exist
    if (!user) {
      return next(new ErrorHandler("User Not Found", 400));
    } else {
      //Compare Password
      const isMatch = await bcrypt.compare(password, user.password);

      //condition
      if (!isMatch) {
        return next(new ErrorHandler("Invalid User Id & Password", 400));
      } else {
        //Response && Token && Cookies
        sendCookie(req, res, user, 200, "User Login Successfully");
      }
    }
  } catch (error) {
    next(error);
  }
};

//* Logout User
export const logout = async (req, res, next) => {
  try {
    //Remove Cookie
    removeCookie(req, res, req.user, 200, true, "User Logout");
  } catch (error) {
    next(error);
  }
};

//* get Profile
export const getProfile = async (req, res, next) => {
  try {
    //Response
    res.status(200).json({
      success: true,
      message: "User Profile",
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
