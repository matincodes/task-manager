
1. **Project overview**  
2. **Setup instructions** for both the **Laravel** backend and **Next.js** frontend  
3. **API route list** (in lieu of a Postman collection)  

---

# Task Manager

A full-stack web application built with **Laravel** (as the backend API) and **Next.js** (as the frontend), using **Redux Toolkit** for state management.


## Overview

This application enables users to register, log in, and manage tasks (create, read, update, delete) with an optional status toggle (e.g., **pending** or **completed**). It demonstrates:

- **RESTful API** design in Laravel (PHP)  
- **Next.js** for a modern React-based frontend  
- **Redux Toolkit** for application state (tasks, auth, etc.)  
- **Authentication** with Laravel (could be Sanctum or personal access tokens)  

---

## Features

1. **User Authentication**:  
   - Register, login, logout  
2. **Tasks**:  
   - Create a new task (title, description, due date)  
   - View paginated tasks  
   - Update a task (title, description, status, etc.)  
   - Toggle completion (e.g., from pending to completed)  
   - Delete a task  
3. **Pagination**:  
   - Server-driven pagination (e.g., Laravel’s `paginate()`)  
4. **Responsive UI**  
   - Styled with Tailwind CSS (optional)

---

## Backend Setup (Laravel)

1. **Clone** or **download** this repository.  
2. Move into the **backend** directory (e.g. `cd task-manager-api`).  
3. **Install dependencies**:  
   ```bash
   composer install
   ```  
4. **Create `.env`** from `.env.example` and update database credentials:  
   ```bash
   cp .env.example .env
   ```  
   In your `.env`, set:
   ```dotenv
   DB_CONNECTION=mysqlite
   DB_HOST=127.0.0.1
   DB_PORT=3306
   ```
    
5. **Generate application key**:  
   ```bash
   php artisan key:generate
   ```  
6. **Migrate** the database (and seed if applicable):  
   ```bash
   php artisan migrate
   ```  
7. **Serve** the app locally:  
   ```bash
   php artisan serve
   ```
   By default runs on [http://127.0.0.1:8000](http://127.0.0.1:8000).

---

## Frontend Setup (Next.js)

1. Navigate to the **frontend** directory (e.g. `cd ../task-manager-frontend`).  
2. **Install** Node dependencies:  
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```  
3. **Configure** environment variables:  
   - Create `.env.local` (or `.env` if you prefer) with:
     ```
     NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
     ```
     Adjust to match your backend’s URL.  
4. **Run** the development server:  
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
   By default runs on [http://localhost:3000](http://localhost:3000).

5. **View** the application in your browser:  
   - Open [http://localhost:3000](http://localhost:3000).

---

## API Routes


### Authentication

| **Method** | **Endpoint**       | **Description**              | **Body**                                                                                                                    |
|------------|--------------------|------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| **POST**   | `/api/register`    | Register a new user          | `name` (string), `email` (string), `password` (string), `password_confirmation` (string)                                   |
| **POST**   | `/api/login`       | Login an existing user       | `email` (string), `password` (string)                                                                                     |
| **POST**   | `/api/logout`      | Logout the authenticated user| *Requires valid session (Sanctum) or token (Bearer)*                                                                       |

### Tasks

| **Method** | **Endpoint**        | **Description**                  | **Body / Query**                                  |
|------------|---------------------|----------------------------------|---------------------------------------------------|
| **GET**    | `/api/tasks`        | Fetch **paginated** tasks        | `page=?`, `per_page=?`                            |
| **POST**   | `/api/tasks`        | Create a new task                | `title`, `description?`, `due_date?`, `status?`   |
| **GET**    | `/api/tasks/{id}`   | Fetch one task by ID             | n/a                                               |
| **PUT**    | `/api/tasks/{id}`   | Update task                      | `title?`, `description?`, `status?`, `due_date?`  |
| **DELETE** | `/api/tasks/{id}`   | Delete the specified task        | n/a                                               |


---

## Using the App

1. **Register** or **log in** at the frontend (`http://localhost:3000`) to create or access your account.  
2. **Create tasks** from the UI form.  
3. **View** existing tasks.  
   - Pagination controls appear if you have multiple pages.  
4. **Toggle** a task’s status by clicking its check circle (switch between `pending`/`completed`).  
5. **Delete** tasks by clicking the “Delete” button.

---
