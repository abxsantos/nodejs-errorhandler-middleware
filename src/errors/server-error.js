import CustomError from "./custom-error";

class ServerError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 500;

    Object.setPrototypeOf(this, ServerError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default ServerError