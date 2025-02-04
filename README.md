# Task Management Application
## Overview
This Task Management Application is designed to help users efficiently manage their recurring tasks. Built with Next.js, TypeScript, Zustand for state management, and PostgreSQL as the database, this application allows users to add, edit, and delete tasks with customizable recurrence options.

## Features
Add Tasks: Users can create tasks with a title, recurrence frequency (daily, weekly, monthly, or yearly), start date, and end date.
Edit Tasks: Users can update task details such as title, recurrence, and dates.
Delete Tasks: Users can remove tasks they no longer need.
View Tasks: Displays all tasks in a list, showcasing recurrence frequency and dates.
## Tech Stack
### Frontend
Next.js: Server-side rendering and static site generation
TypeScript: Type safety and enhanced developer experience
Tailwind CSS: Styling framework for responsive and modern UI
### Backend
Next.js API Routes: Handles CRUD operations for tasks
PostgreSQL: Relational database for persistent data storage
State Management
Zustand: Lightweight state management for managing task data and UI state
## API Route
CRUD operations are managed with Next.js API routes for seamless integration with the front end.

GET /api/task: Retrieves all tasks from the database.
POST /api/task: Adds a new task to the database.
PUT /api/task: Updates an existing task by ID.
DELETE /api/task: Deletes a task by ID.
## Components
### TaskForm.tsx
A form component to handle both task creation and updates. This form includes fields for:

Title: Task title input.
Recurrence: Dropdown for recurrence frequency.
Start Date and End Date: Date pickers to set task duration.
![image](https://github.com/santhosh2003-bit/Task_Management_Application/blob/main/Screenshot%202024-10-28%20194316.png)
TaskList.tsx
This component displays a list of tasks and includes:

Edit Button: Populates the form with task data for easy updates.
Delete Button: Removes the task from the database and updates the UI.
![image](https://github.com/santhosh2003-bit/Task_Management_Application/blob/main/Screenshot%202024-10-28%20194331.png)
![image](https://github.com/santhosh2003-bit/Task_Management_Application/blob/main/Screenshot%202024-10-28%20194339.png)
# Getting Started
## Prerequisites
Node.js
PostgreSQL
## Setup Instructions
### Clone the Repository
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
### Install Dependencies
npm install
### Set Up the Database
Create a PostgreSQL database and update the DATABASE Data in the .env file.
### Run the Development Server
npm run dev
# Future Improvements
### Some potential enhancements to consider:

Search and Filter: Add search and filter options for better task organization.
Notifications: Implement notifications for upcoming tasks.
User Authentication: Add user login to secure tasks and personalize the experience.

# Conclusion
This Task Management Application provides a practical solution for managing recurring tasks. By leveraging the power of Next.js, Zustand, and PostgreSQL, this application demonstrates a full-stack approach to web development with a focus on maintainability, performance, and scalability.
