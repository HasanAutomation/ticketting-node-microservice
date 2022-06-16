import app from '../../app';
import request from 'supertest';

it('returns 400 upon unsuccessful signin', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@gmail.com',
      password: '1234567',
    })
    .expect(400);
});

it('returns 400 with invalid email', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test',
      password: '1234567',
    })
    .expect(400);
});

it('returns 400 with invalid password', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@gmail.com',
      password: '123',
    })
    .expect(400);
});

it('returns 400 with incorrect password', async () => {
  await signin();

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@gmail.com',
      password: '1234',
    })
    .expect(400);
});

it('sets a cookie with a valid user', async () => {
  await signin();
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
