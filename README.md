# AI-Learning-Hub

#  AI Learning Assistant - Full Stack Application

An interactive learning platform that allows users to ask questions and receive instant, AI-generated answers, while organizing their learning journey into categories.

---

##  Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)

---

##  Overview
This project is a Full-Stack (MERN) application designed to help students and self-learners document their studies. Users can submit prompts to an AI assistant, receive structured responses, and save them for future reference. The system includes a comprehensive Admin Dashboard for content and user management.

##  Key Features
* **AI Integration:** Real-time communication with OpenAI's GPT models.
* **Personal Study History:** Users can view, search, and manage their previous AI interactions.
* **Categorization:** Organize prompts by study subjects and categories.
* **Secure Authentication:** User registration and login using **JWT (JSON Web Tokens)** and **Bcrypt** for password encryption.
* **Role-Based Access Control (RBAC):** Distinct interfaces and permissions for regular **Users** and **Administrators**.
* **Admin Panel:** Full CRUD operations for managing study categories, users, and system data.
* **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop views.

##  Tech Stack
* **Frontend:** React.js, React Router, CSS3 / Tailwind CSS.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB with Mongoose ODM.
* **AI Service:** OpenAI API.
* **Authentication:** JWT, LocalStorage, Custom Auth Middlewares.

##  Architecture
The application follows a classic client-server architecture:
- **Client (Frontend):** Handles UI components, state management, and user interaction.
- **Server (Backend):** Manages API routing, business logic, and security middleware.
- **Database (MongoDB):** Stores user profiles, AI prompts, and category structures.

## Admin Access (For Evaluation)
To access the administrative features and the Admin Dashboard, please use the following credentials on the Home Page:

Access Code: 1234

Step 1: Click on "Log in as Admin" on the landing page.

Step 2: Enter the code 1234 when prompted.

Step 3: You will be redirected to the Admin Dashboard to manage categories and users.


---

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd <project-folder-name>
