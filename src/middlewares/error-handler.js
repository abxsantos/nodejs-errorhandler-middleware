import CustomError from '../errors/custom-error';

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const response = res
      .status(err.statusCode)
      .send({ errors: err.serializeErrors() });
    return response;
  }

  return res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};

export default errorHandler;
