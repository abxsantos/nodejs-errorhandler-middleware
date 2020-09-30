import CustomError from './custom-error';

class NotFoundError extends CustomError {
  constructor() {
    super('Not found');
    this.statusCode = 404;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not Found' }];
  }
}

export default NotFoundError;
