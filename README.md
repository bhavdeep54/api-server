API Server with Node.js, Express, and MySQL
This is a full-stack CRUD application built with Node.js, Express.js, MySQL, and EJS. It provides a simple and responsive interface to manage users in a MySQL database, featuring create, read, update, and delete operations. Flash messages offer real-time feedback, and Bootstrap ensures a clean, modern UI.
Features

Create, view, update, and delete users
Responsive frontend with EJS and Bootstrap
Flash messages for success and error notifications
Secure configuration using environment variables
Modular structure for easy scalability

Project Structure
├── index.js              # Main server file
├── .env                  # Environment variables (not in Git)
├── .gitignore            # Excludes node_modules and .env
├── views/                # EJS templates
│   └── index.ejs         # Main user interface
├── public/               # Static files (optional)
├── package.json          # Dependencies and scripts

Getting Started
Follow these steps to set up and run the application locally.
1. Clone the Repository
git clone https://github.com/your-username/api-server.git
cd api-server

2. Install Dependencies
npm install

3. Configure MySQL
Create a database and a users table:
CREATE DATABASE your_database_name;

USE your_database_name;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);

4. Set Up Environment Variables
Create a .env file in the project root with the following:
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=your_database_name

5. Run the Application
nodemon index.js
# or
node index.js

Visit http://localhost:3000 in your browser.
API Endpoints
1. Get All Users

URL: /
Method: GET
Description: Retrieves all users from the database.
Sample Response:[
  {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com"
  }
]



2. Add a New User

URL: /users
Method: POST
Description: Adds a new user to the database.
Request Body:{
  "name": "Charlie",
  "email": "charlie@example.com"
}


Sample Response:{
  "message": "User added successfully"
}



3. Delete a User

URL: /users/:id?_method=DELETE
Method: POST (with method override)
Description: Deletes a user by their ID.
Example: /users/3?_method=DELETE

4. Update a User

URL: /users/:id?_method=PUT
Method: POST (with method override)
Description: Updates a user’s details by their ID.
Request Body:{
  "name": "Updated Charlie",
  "email": "newcharlie@example.com"
}



Security

Sensitive credentials are stored in a .env file.
The .gitignore file ensures that secrets and node_modules are not committed.

Future Enhancements

Implement search and sort functionality
Add input validation for user data
Integrate an ORM like Sequelize or Prisma
Deploy the application on platforms like Render or Railway

Author
Developed by Bhavdeep Singh
