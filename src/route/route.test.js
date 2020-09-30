import request from 'supertest';
import server from '../app';

it('must return a 200 with message', async () => {
  const response = await request(server)
    .get('/')
    .send({ hello: 'Hello world' });
  expect(response.status).toEqual(200);
});
it('must return a 400 with message', async () => {
  const response = await request(server).get('/').send({});
  expect(response.status).toEqual(400);
  expect(response.body).toHaveProperty('errors');
});
it('must return validation error messages', async () => {
  const response = await request(server).get('/').send({ hello: 1 });
  expect(response.body).toHaveProperty('errors');
});
