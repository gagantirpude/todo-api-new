import jwt from "jsonwebtoken";

// Send Cookies Function
export const sendCookie = async (req, res, user, statusCode, message) => {
  // token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  // Cookies
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: (process.env.NODE_ENV = "development" ? "lax" : "none"),
      secure: (process.env.NODE_ENV = "development" ? false : true),
    })
    .json({
      success: true,
      message,
      user,
    });
};
