import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const Register = ({ register }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        register({username, password});
        navigate('/');
    };

    return(
        <Container>
            <Form onSubmit={ handleSubmit }>
                <Form.Group className='mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='Enter username' value = {username} onChange={ (event) => setUsername(event.target.value)}/>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value = {password} onChange={ (event) => setPassword(event.target.value)}/>
                </Form.Group>

                <Button variant='primary' type='submit'>Register</Button>

            </Form>
        </Container>
    );
};

export default Register;