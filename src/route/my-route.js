import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
const myRoute = express.Router();

myRoute.get(
  '/',
  [body('hello').isString().withMessage('hello must be provided')],
  validateRequest,
  async (req, res) => {
    res.send({ hello: 'Hello world' }).status(200);
  }
);

export default myRoute;
