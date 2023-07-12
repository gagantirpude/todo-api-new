//* Remove Cookie

export const removeCookie = (req, res, user, statusCode, success, message) => {
  res
    .status(statusCode)
    .cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: (process.env.NODE_ENV = "development" ? "lax" : "none"),
      secure: (process.env.NODE_ENV = "development" ? false : true),
    })
    .json({
      success,
      message,
      user,
    });
};
