const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session & Flash
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Set global vars
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  charset: 'utf8mb4' // ✅ Fixes cesu8 encoding issue
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
  } else {
    console.log('✅ Connected to MySQL');
  }
});

// Home - List users
app.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      req.flash('error', 'Failed to load users');
      return res.render('index', { users: [] });
    }
    res.render('index', { users: results });
  });
});

// Add user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err) => {
    if (err) {
      req.flash('error', 'Error adding user');
    } else {
      req.flash('success', 'User added successfully');
    }
    res.redirect('/');
  });
});

// Delete user
app.delete('/users/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      req.flash('error', 'Error deleting user');
    } else {
      req.flash('success', 'User deleted successfully');
    }
    res.redirect('/');
  });
});

// Update user
app.put('/users/:id', (req, res) => {
  const { name, email } = req.body;
  db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, req.params.id], (err) => {
    if (err) {
      req.flash('error', 'Error updating user');
    } else {
      req.flash('success', 'User updated successfully');
    }
    res.redirect('/');
  });
});

// ✅ Only start server if this file is run directly (not imported in tests)
if (require.main === module) {
  app.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
  });
}

// ✅ Export app for Supertest (API tests)
module.exports = app;
