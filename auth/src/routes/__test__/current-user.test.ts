import request from 'supertest';
import app from '../../app';

it('returns 401 when not authenticated', async () => {
  await signin();

  await request(app).get('/api/users/currentuser').send().expect(401);
});

it('returns a user when authenticated', async () => {
  const cookie = await signin();

  await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
});
