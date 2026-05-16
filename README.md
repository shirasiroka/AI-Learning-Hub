# AI-Learning-Hub

AI Learning Assistant - Full Stack Application

An interactive learning platform that allows users to ask questions and receive instant, AI-generated answers, while organizing their learning journey into categories.

## Table of Contents
* [Overview](#overview)
* [Key Features](#key-features)
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [Admin Access (For Evaluation)](#admin-access-for-evaluation)
* [Environment Variables](#environment-variables)
* [Installation & Setup](#installation--setup)
* [Running with Docker (Recommended)](#running-with-docker-recommended)

---

## Overview
This project is a Full-Stack (MERN) application designed to help students and self-learners document their studies. Users can submit prompts to an AI assistant, receive structured responses, and save them for future reference. The system includes a comprehensive Admin Dashboard for content and user management.

---

## Key Features
* **AI Integration:** Real-time communication with OpenAI's GPT models.
* **Personal Study History:** Users can view, search, and manage their previous AI interactions.
* **Categorization:** Organize prompts by study subjects and categories.
* **Secure Authentication:** User registration and login using JWT (JSON Web Tokens) and Bcryptjs for password encryption.
* **Role-Based Access Control (RBAC):** Distinct interfaces and permissions for regular Users and Administrators.
* **Admin Panel:** Full CRUD operations for managing study categories, users, and system data.
* **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop views.

---

## Tech Stack
* **Frontend:** React.js, React Router, CSS3 / Tailwind CSS.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB with Mongoose ODM.
* **AI Service:** OpenAI API.
* **Authentication:** JWT, LocalStorage, Custom Auth Middlewares.

---

## Architecture
The application follows a classic client-server architecture:
* **Client (Frontend):** Handles UI components, state management, and user interaction.
* **Server (Backend):** Manages API routing, business logic, and security middleware.
* **Database (MongoDB):** Stores user profiles, AI prompts, and category structures.

---

## Admin Access (For Evaluation)
To access the administrative features and the Admin Dashboard, please use the following credentials on the Home Page:
* **Access Code:** 1234
1. **Step 1:** Click on "Log in as Admin" on the landing page.
2. **Step 2:** Enter the code `1234` when prompted.
3. **Step 3:** You will be redirected to the Admin Dashboard to manage categories and users.

---

## Environment Variables
Before running the application (locally or via Docker), you must set up your environment variables. 
Inside the `backend` folder, create a file named `.env` and fill in your credentials:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret_key
```
Installation & Setup
1.Clone the repository:
git clone [https://github.com/shirasiroka/AI-Learning-Hub](https://github.com/shirasiroka/AI-Learning-Hub)
cd AI-Learning-Hub

2.Run Backend:
cd backend
npm install
node --env-file=.env server.js

3.Run Frontend (In a second terminal):
cd frontend
npm install
npm start

Running with Docker (Recommended)
The project is fully dockerized. Docker will automatically build the images, install all dependencies, and link the services together.

1. Build and Launch the Containers
Open your terminal in the root directory (where docker-compose.yml is located) and run:
docker-compose up --build

2. Access the Application
Once the build is complete and the containers are running, open your browser:
Frontend Website: http://localhost:3000
Backend API: http://localhost:5000

3. Stop the Containers
To stop the application, press Ctrl + C in the terminal, or run:
docker-compose down
=======
1. **Clone the repository:**
   ```bash
   git clone <https://github.com/shirasiroka/AI-Learning-Hub>
   cd <AI-Learning-Hub>

