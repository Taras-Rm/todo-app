import { validationResult } from "express-validator";
import ApiError from "../utils/apiError.js";
import httpStatus from "../utils/httpStatus.js";

export const validate = (validations) => {
  return async function (req, _, next) {
    try {
      await Promise.all(validations.map((validation) => validation.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      throw new ApiError(httpStatus.BAD_REQUEST, errors.array()[0].msg);
    } catch (error) {
      next(error);
    }
  };
};

export default validate;
