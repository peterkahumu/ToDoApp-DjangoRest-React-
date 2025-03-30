import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const Login = ({ login }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        login({ username, password })
        navigate("/") //redirect after login.
    }


    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label> Username</Form.Label>
                    <Form.Control type='text' placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} />

                    <Form.Label> Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant='primary' type='submit'>Login</Button>
            </Form>
        </Container>
    )
};
export default Login;