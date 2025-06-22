const request = require('supertest');
const app = require('../../index'); // Your main Express app

describe('🌐 API Test: /users endpoints', () => {
  it('GET / should return homepage HTML', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/<html/);
  });

  it('POST /users should create user and redirect', async () => {
    const res = await request(app)
      .post('/users')
      .send('name=Charlie&email=charlie@example.com')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(res.statusCode).toBe(302); // Redirect to homepage
    expect(res.headers.location).toBe('/');
  });
});
