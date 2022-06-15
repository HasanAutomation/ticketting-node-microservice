import request from 'supertest';
import app from '../../app';

it('returns 201 on succesful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@gmail.com',
      password: '1234567',
    })
    .expect(201);
});

it('returns 400 with invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test',
      password: '1234567',
    })
    .expect(400);
});

it('returns 400 with invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@gmail.com',
      password: '123',
    })
    .expect(400);
});

it('returns 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: '',
      password: '1234567',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@gmail.com',
      password: '',
    })
    .expect(400);
});
