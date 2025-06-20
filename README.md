# 📦 Custom API Server with MySQL and Express.js

This project is a basic CRUD web application using **Node.js**, **Express.js**, **MySQL**, and **EJS** for the frontend. It includes full Create, Read, Update, and Delete operations, flash message notifications, Bootstrap styling, and uses environment variables for secure database connection.

---

## 🔧 Features

* ✅ Add, update, delete, and list users
* ✅ EJS frontend styled with Bootstrap
* ✅ Flash messages for user feedback
* ✅ Password & DB config secured with `.env`
* ✅ Clean project structure

---

## 📁 Project Structure

```
├── index.js              # Main server file
├── .env                 # Environment variables (NOT committed)
├── .gitignore           # node_modules and .env excluded
├── views/
│   └── index.ejs        # Frontend template
├── public/              # (Optional) static assets (e.g., CSS, JS)
├── package.json         # Project dependencies
```

---

## 🚀 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/custom-api-server.git
cd custom-api-server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up MySQL database

Create a database and a `users` table:

```sql
CREATE DATABASE your_database_name;

USE your_database_name;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);
```

### 4. Configure `.env`

Create a `.env` file in the root:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=your_database_name
```

### 5. Start the server

```bash
nodemon index.js
# or
node index.js
```

Visit: `http://localhost:3000`

---

## ✨ API Endpoints

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | `/`          | List all users |
| POST   | `/users`     | Add a new user |
| DELETE | `/users/:id` | Delete a user  |
| PUT    | `/users/:id` | Update a user  |

All requests handled with form submissions in EJS frontend.

---

## 🛡️ Environment & Security

* Environment secrets stored in `.env`
* `.env` is included in `.gitignore`

---

## 💡 Optional Improvements

* Add search/sort for users
* Add validations
* Use Sequelize or Prisma ORM
* Deploy on Render, Railway, or Vercel

---

## 🧑‍💻 Author

Made by Bhavdeep Singh

---

## 📜 License

MIT License
