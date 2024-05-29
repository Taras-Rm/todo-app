import httpStatus from "./httpStatus.js";

class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static getError(err) {
    const error =
      err instanceof ApiError
        ? err
        : new ApiError(httpStatus.SERVER_ERROR, "some server error");

    return error;
  }
}

export default ApiError;
