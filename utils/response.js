// Response
export const response = async (
  req,
  res,
  statusCode,
  success,
  message,
  data
) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};
