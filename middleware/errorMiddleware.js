function errorMiddleware(error, req, res, next) {
  const status = error.status || error.statusCode || 500;
  const msg = error.msg || error.message || "Internal server error";

  return res.status(status).json({ success: false, status, msg });
}

export const createError = (msg, status) => {
  const error = new Error(msg);
  error.msg = msg;
  error.status = status;
  const RED = "\x1b[31m";
  const YELLOW = "\x1b[33m";
  const RESET = "\x1b[0m";

  if (status >= 400 && status < 500) {
    console.warn(`${YELLOW}!!!! Warning [${status}]: ${msg}${RESET}`);
  } else {
    console.error(`${RED}💥 Error [${status}]: ${msg}${RESET}`);
  }
  return error;
};

export default errorMiddleware;
