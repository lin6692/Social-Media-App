# MERN Social Media Website

## Description

This is a social media website built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js) to deliver a fast, responsive, and intuitive user experience.

## Features

- User registration and login
- Create/Delete/Like posts
- Create/Delete comments
- Add/Remove friends
- Night mode switch
- Error handling for duplicate users and invalid operations
- Responsive to small screens
- File handling (Allow user to upload image)

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- JavaScript

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
   **Server Folder:**

   - Add .env File to the root of the server folder
     - `MONGO_URL = "Replae with your MongoDB access"`
     - `JWT_SECRET = "Replace wth random string at your choice"`
     - `PORT = 3001`
   - Navigate to **server/index.js**, uncomment line 67-68 to load the example data.
     - You only need to load the data once. Please comment these lines out when you done.
   - Run `npm install` to install dependencies.
   - Run `nodemon run` to start the backend server in development mode.

   **Client Folder:**

   - Run `npm install` to install dependencies.
   - Run `npm start` to start the React in development mode.

3. Access the application at http://localhost:3000

4. Register a new account or login with an existing one.
   Then you can start to explore the website from here!

## Credits

Created by **Lin Liu**
