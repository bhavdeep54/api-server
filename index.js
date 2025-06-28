const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
require('dotenv').config();

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

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

// Global vars
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MySQL DB Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  charset: 'utf8mb4'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
  } else {
    console.log('✅ Connected to MySQL');
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
app.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('❌ Query Error:', err);
      req.flash('error', 'Failed to load users');
      return res.render('index', { users: [] });
    }
    res.render('index', { users: results });
  });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 */
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    req.flash('error', 'Name and email are required');
    return res.redirect('/');
  }
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err) => {
    if (err) {
      console.error('❌ Insert Error:', err);
      req.flash('error', 'Error adding user');
    } else {
      req.flash('success', 'User added successfully');
    }
    res.redirect('/');
  });
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted
 */
app.delete('/users/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      console.error('❌ Delete Error:', err);
      req.flash('error', 'Error deleting user');
    } else {
      req.flash('success', 'User deleted successfully');
    }
    res.redirect('/');
  });
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 */
app.put('/users/:id', (req, res) => {
  const { name, email } = req.body;
  db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, req.params.id], (err) => {
    if (err) {
      console.error('❌ Update Error:', err);
      req.flash('error', 'Error updating user');
    } else {
      req.flash('success', 'User updated successfully');
    }
    res.redirect('/');
  });
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Raw OpenAPI JSON
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Start server
if (require.main === module) {
  app.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
  });
}

module.exports = app;
