import React, { useState, useEffect } from "react";
import TodoDataService from "../services/todos";
import { Link, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

const AddTodo = ({ token }) => {
    const { id } = useParams();
    const editing = Boolean(id);

    const [title, setTitle] = useState("");
    const [memo, setMemo] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    // Load existing todo when editing
    useEffect(() => {
        if (editing) {
            TodoDataService.getTodo(id, token)
                .then((response) => {
                    setTitle(response.data.title);
                    setMemo(response.data.memo);
                })
                .catch((error) => {
                    console.error("Error fetching todo:", error);
                    setError("Failed to load todo.");
                });
        }
    }, [id, editing, token]);

    const saveTodo = async () => {
        setError(""); // Reset error before submission
        const data = { title, memo, completed: false };

        try {
            if (editing) {
                await TodoDataService.updateTodo(id, data, token);
            } else {
                await TodoDataService.createTodo(data, token);
            }
            setSubmitted(true);
        } catch (error) {
            console.error("Error saving todo:", error);
            setError(editing ? "Error updating todo." : "Failed to create Todo.");
        }
    };

    return (
        <Container>
            {submitted ? (
                <Alert variant="success">
                    <h4>Todo {editing ? "updated" : "added"} successfully!</h4>
                    <Link to="/todos">Back to Todos</Link>
                </Alert>
            ) : (
                <Form>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Group className="mb-3">
                        <Form.Label>{editing ? "Edit" : "Create"} Todo</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            placeholder="e.g. Buy gift tomorrow"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="info" onClick={saveTodo}>
                        {editing ? "Update" : "Add"} Todo
                    </Button>
                </Form>
            )}
        </Container>
    );
};

export default AddTodo;
