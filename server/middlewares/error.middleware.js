const errorMiddleware = (err, req, res, next) => {
  // check for the duplicate error
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
