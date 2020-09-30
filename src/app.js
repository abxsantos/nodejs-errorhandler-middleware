import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import errorHandler from './middlewares/error-handler';
import myRoute from './route/my-route';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  middlewares() {
    this.server.use(json());
  }

  routes() {
    this.server.use(myRoute);
  }

  errorHandler() {
    this.server.use(errorHandler);
  }
}

export default new App().server;
