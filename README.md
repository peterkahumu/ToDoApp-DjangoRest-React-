# ToDo Application

## Overview

This is a full-stack ToDo application with a React frontend and a Django Rest Framework (DRF) backend. The application allows users to create, update, delete, and manage tasks efficiently.

## Technologies Used

### Frontend

- React
- React Router
- Axios (for API calls)
- React Bootstrap (for styling)

### Backend (ToDoBackend)

- Django Rest Framework (DRF)
- PostgreSQL (Database)
- Django ORM
- Token-Based Authentication
- DRF-YASG (Swagger API Documentation)
- CORS Headers

## Project Structure

```
|-- ToDoApp
    |-- frontend/  # React Frontend
    |-- ToDoBackend/  # Django DRF Backend
    |-- README.md  # Project Documentation
```

## Frontend Structure

```
src/
│-- components/
│   │-- add-todo.js        # Component to add a new todo
│   │-- login.js           # Login component
│   │-- register.js        # Register component
│   │-- todos-list.js      # Component to display todo list
│-- services/
│   │-- todos.js           # API calls for todos
│-- App.js                 # Main application component
│-- index.js               # Entry point of the app
```

## Backend Structure

The backend is divided into two main Django apps:

- **Authentication**: Handles user registration and login.
- **Todos**: Manages todo-related operations.

## Setup Instructions

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app/ToDoBackend
   ```
2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Configure the database:
   - Set up environment variables in a `.env` file:
     ```ini
     DBNAME=your_database_name
     DBUSER=your_database_user
     DBPASSWORD=your_database_password
     DBHOST=your_database_host
     ```
   - Ensure `settings.py` is correctly set up to read environment variables:
     ```python
     import os
     DATABASES = {
         'default': {
             'ENGINE': 'django.db.backends.postgresql',
             'NAME': os.environ.get('DBNAME'),
             'USER': os.environ.get('DBUSER'),
             'PASSWORD': os.environ.get('DBPASSWORD'),
             'HOST': os.environ.get('DBHOST'),
         }
     }
     ```
   - Apply migrations:
     ```sh
     python manage.py migrate
     ```
5. Start the backend server:
   ```sh
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm start
   ```

## API Endpoints (Backend)

| Method | Endpoint                        | Description                                 |
| ------ | ------------------------------- | ------------------------------------------- |
| POST   | `/api/authenticate/login/`      | User login (receives username & password, returns token) |
| POST   | `/api/authenticate/register/`   | User registration (receives username & password) |
| GET    | `/api/todos/`                   | Get all tasks (requires authentication)     |
| POST   | `/api/todos/`                   | Create a new task (requires authentication) |
| PUT    | `/api/todos/complete/{id}/`     | Mark task as complete (requires authentication) |
| PATCH  | `/api/todos/complete/{id}/`     | Partially update task completion status (requires authentication) |
| GET    | `/api/todos/{id}/`              | Get task by ID (requires authentication) |
| PUT    | `/api/todos/{id}/`              | Update a task (requires authentication) |
| PATCH  | `/api/todos/{id}/`              | Partially update a task (requires authentication) |
| DELETE | `/api/todos/{id}/`              | Delete a task (requires authentication) |

## ToDo Model

```json
{
  "id": 1,
  "title": "Sample Task",
  "memo": "This is a sample task description.",
  "created_at": "2025-03-31T12:00:00Z",
  "completed": false
}
```

## Authentication

- The application uses **Token-Based Authentication**.
- Users must obtain a token via login and include it in the headers for authenticated requests.
- Example login request:
  ```sh
  curl -X POST http://localhost:8000/api/authenticate/login/ -d "username=user&password=pass"
  ```
  Response:
  ```json
  {
    "token": "your_generated_token_here"
  }
  ```
- Include this token in API requests:
  ```sh
  curl -H "Authorization: Token your_generated_token_here" http://localhost:8000/api/todos/
  ```

## API Documentation

- The project includes **Swagger UI** for API documentation.
- To view the Swagger UI:
  - Start the backend server and visit:
    ```
    http://localhost:8000/api-documentation/
    ```

## Future Improvements

- JWT-based authentication instead of token-based
- Task categories and priorities
- Deployment to cloud services

---

This is the initial documentation. Feel free to contribute and improve it!

