import ApiError from "../utils/apiError.js";

const errorHandler = (err, req, res, next) => {
  console.log(err);

  const error = ApiError.getError(err);

  res.status(error.code).json({ message: error.message });
};

export default errorHandler;
