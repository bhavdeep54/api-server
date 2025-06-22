jest.mock('../../db'); // Uses __mocks__/db.js
const db = require('../../db');

describe('🧪 Unit Test: db.js (mocked)', () => {
  it('should return mocked SELECT data', done => {
    db.query('SELECT * FROM users', [], (err, results) => {
      expect(err).toBeNull();
      expect(results[0].email).toBe('mock@example.com');
      done();
    });
  });

  it('should simulate INSERT', done => {
    db.query('INSERT INTO users (name, email) VALUES (?, ?)', ['Test', 'test@test.com'], (err, result) => {
      expect(result.insertId).toBe(2);
      done();
    });
  });
});
