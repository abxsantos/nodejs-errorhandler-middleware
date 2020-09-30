const { default: BadRequestError } = require('../errors/bad-request-error');
const { default: CustomError } = require('../errors/custom-error');
const { default: NotFoundError } = require('../errors/not-found-error');
const { default: errorHandler } = require('./error-handler');

class MockResponse {
  constructor() {
    this.res = {};
  }
  status = jest
    .fn()
    .mockReturnThis()
    .mockImplementationOnce((code) => {
      this.res.code = code;
      return this;
    });
  send = jest
    .fn()
    .mockReturnThis()
    .mockImplementationOnce((message) => {
      this.res.message = message;
      return this;
    });
}
const next = jest.fn();

const makeSUT = (error, message) => {
  const err = new error(message);
  const req = {};
  const res = new MockResponse();
  const sut = errorHandler(err, req, res, next);
  return sut;
};

it('must return a 400, when a BadRequestError is thrown', () => {
  const sut = makeSUT(BadRequestError, 'bad request');
  expect(next).not.toHaveBeenCalled();
  expect(sut.status).toHaveBeenCalledWith(400);
  expect(sut.send).toHaveBeenCalledWith({
    errors: [{ message: 'bad request' }],
  });
});
it('must return a 404, when a NotFoundError is thrown', () => {
  const sut = makeSUT(NotFoundError, '');
  expect(next).not.toHaveBeenCalled();
  expect(sut.status).toHaveBeenCalledWith(404);
  expect(sut.send).toHaveBeenCalledWith({ errors: [{ message: 'Not Found' }] });
});

it('must return a custom status code, with a custom message when CustomError is thrown', async () => {
  let err = new CustomError('my custom error');
  err.statusCode = 418;
  const req = {};
  let next = jest.fn();
  let res = new MockResponse();

  const sut = await errorHandler(err, req, res, next);
  expect(next).not.toHaveBeenCalled();
  expect(sut.status).toHaveBeenCalledWith(418);
  expect(sut.send).toHaveBeenCalledWith({
    errors: [{ message: 'my custom error' }],
  });
});
