import React, { useState, useEffect, useCallback } from "react";
import TodoDataService from "../services/todos";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import moment from 'moment';

const TodosList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const retrieveTodos = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await TodoDataService.getAll(token);
      setTodos(response.data);
    } catch (error) {
      setErrorMessage("Failed to fetch todos. Please try again.");
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    retrieveTodos();
  }, [retrieveTodos]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await TodoDataService.deleteTodo(id, token);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setSuccessMessage("Todo deleted successfully.");
    } catch (error) {
      setErrorMessage("Failed to delete the todo. Please try again.");
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = async (todo) => {
    
    try {
      await TodoDataService.completeTodo(todo.id, token);
      retrieveTodos();
      setSuccessMessage(todo.completed ? "Todo marked as incomplete." : "Todo completed successfully.");
    } catch (error) {
      setErrorMessage("Could not update the todo status.");
      console.error("Error updating todo status:", error);
    }
  };

  return (
    <Container>
      {!token ? (
        <Alert variant="warning">
          <b>You are not logged in.</b> Please {" "}
          <Link to="/login">log in</Link> to see your todos.
        </Alert>
      ) : (
        <>
          {loading && <Spinner animation="border" />}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          {!loading && !errorMessage && todos.length === 0 && (
            <Alert variant="info">No todos available.</Alert>
          )}

          <div>
            <Link to={'/todos/create/'}>
              <Button variant="outline-info" className="mb-3">Add To-do</Button>
            </Link>
          </div>
          
          {todos.map((todo) => (
            <Card key={todo.id} className={`mb-3 ${todo.completed ? 'bg-light text-muted' : ''}`}>
              <Card.Body>
                <div>
                  <Card.Title>
                    {todo.completed ? "✅ " : ""}{todo.title}
                  </Card.Title>
                  <Card.Text>
                    <b>Memo:</b> {todo.memo}
                  </Card.Text>
                  <Card.Text>
                    <b>Created at:</b> {moment(todo.created).format('Do MMMM YYYY')}
                  </Card.Text>
                </div>
                <Link to={`/todos/${todo.id}`}>
                  <Button variant="outline-info" className="me-2">Edit</Button>
                </Link>
                <Button
                  variant="outline-danger"
                  className="me-2"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </Button>
                <Button 
                  variant={todo.completed ? "outline-secondary" : "outline-success"} 
                  onClick={() => toggleComplete(todo)}
                >
                  {todo.completed ? "Mark as Incomplete" : "Complete"}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
};

export default TodosList;
