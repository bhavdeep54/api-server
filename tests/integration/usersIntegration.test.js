const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  charset: 'utf8mb4'
});

describe('🔗 Integration Test: MySQL DB', () => {
  let insertedId;

  beforeAll(done => {
    db.connect(err => {
      if (err) {
        console.error('❌ MySQL connection error:', err);
      } else {
        console.log('✅ Connected to MySQL');
      }
      done();
    });
  });

  it('should insert a real user', done => {
    db.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      ['Integration User', 'integration@example.com'],
      (err, result) => {
        expect(err).toBeNull();
        insertedId = result.insertId;
        done();
      }
    );
  });

  it('should read the inserted user', done => {
    db.query('SELECT * FROM users WHERE id = ?', [insertedId], (err, rows) => {
      expect(err).toBeNull();
      expect(rows[0].email).toBe('integration@example.com');
      done();
    });
  });

  it('should delete the inserted user', done => {
    db.query('DELETE FROM users WHERE id = ?', [insertedId], (err, result) => {
      expect(err).toBeNull();
      expect(result.affectedRows).toBe(1);
      done();
    });
  });

  afterAll(done => {
    db.end(() => done());
  });
});
