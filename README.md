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

## Screenshots
### Home Page
<img width="1337" alt="Home Page" src="https://user-images.githubusercontent.com/68915147/224514152-edfb5a01-f0bf-420e-a426-95210fe83709.png">

### Profile Page
<img width="1337" alt="Profile Page 2023-03-11 at 5 24 20 PM" src="https://user-images.githubusercontent.com/68915147/224514187-1e010b7c-a48c-419a-bafb-c73f96d45df1.png">

### Login Page
<img width="1337" alt="Login Page" src="https://user-images.githubusercontent.com/68915147/224514212-e0f6cd85-5e29-46ce-8c13-f9c90b4ddfc7.png">

### Register Page
<img width="1337" alt="Register Page" src="https://user-images.githubusercontent.com/68915147/224514226-7f91d9eb-b18d-40d2-8c63-2fa0e670acba.png">

### Night Mode
<img width="1337" alt="Night Mode" src="https://user-images.githubusercontent.com/68915147/224514234-5bd41ec6-2bf6-4447-b821-bd4bfe4378b5.png">

### Mobile
<img width="1337" alt="Mobile" src="https://user-images.githubusercontent.com/68915147/224514243-bc87e0f1-dbb0-46ed-ae4d-062bcea2f0e9.png">

