# 📦 Custom API Server with MySQL and Express.js

This is a full-stack CRUD application built using **Node.js**, **Express.js**, **MySQL**, and **EJS**. It allows you to create, view, update, and delete users from a MySQL database with a simple and responsive frontend. Flash messages notify the user of success or errors, and Bootstrap provides a clean UI.

---

## 🔧 Features

- Add, update, delete, and list users
- Clean frontend using EJS and Bootstrap
- Flash messages for real-time user feedback
- Secure config via `.env` (excluded from Git)
- Fully modular and ready for extension

---

## 📁 Project Structure

├── index.js # Main server file
├── .env # Environment variables (NOT committed)
├── .gitignore # node_modules and .env excluded
├── views/ # EJS templates
│ └── index.ejs # Main UI for users
├── public/ # Static files (optional)
├── package.json # Dependencies and scripts

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/api-server.git
cd api-server
2. Install dependencies
bash
Copy
Edit
npm install
3. Configure MySQL
Create a database and a users table:

sql
Copy
Edit
CREATE DATABASE your_database_name;

USE your_database_name;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);
4. Setup environment variables
Create a .env file in the root:

ini
Copy
Edit
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=your_database_name
5. Run the app
bash
Copy
Edit
nodemon index.js
# or
node index.js
Visit: http://localhost:3000

✨ API Endpoints
1. 🔍 Get All Users
URL: /

Method: GET

Description: Fetch all users from the database.

Sample Response:

json
Copy
Edit
[
  {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com"
  }
]
2. ➕ Add a New User
URL: /users

Method: POST

Description: Add a new user.

Request Body:

json
Copy
Edit
{
  "name": "Charlie",
  "email": "charlie@example.com"
}
Sample Response:

json
Copy
Edit
{
  "message": "User added successfully"
}
3. 🗑️ Delete a User
URL: /users/:id?_method=DELETE

Method: POST with method override

Description: Delete a user by ID.

Example: /users/3?_method=DELETE

4. ✏️ Update a User
URL: /users/:id?_method=PUT

Method: POST with method override

Description: Update user by ID.

Request Body:

json
Copy
Edit
{
  "name": "Updated Charlie",
  "email": "newcharlie@example.com"
}
🛡️ Security
.env file used to store sensitive credentials.

.gitignore ensures secrets are never exposed.

💡 Future Enhancements
Add search/sort filters

Add input validations

Use Sequelize or Prisma for ORM

Deploy using Render or Railway

🧑‍💻 Author
Made with 💻 by Bhavdeep Singh
