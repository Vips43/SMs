function errorMiddleware(error, req, res, next) {
  const status = error.status || error.statusCode || 500;
  const msg = error.msg || error.message || "Internal server error";

  return res.status(status).json({ success: false, status, msg });
}

export const createError = (msg, status) => {
  const error = new Error(msg);
  error.msg = msg;
  error.status = status;

  return error;
};

export default errorMiddleware;
