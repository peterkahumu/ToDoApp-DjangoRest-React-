import React, { useDebugValue } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddTodo from './components/add-todo';
import TodosList from './components/todos-list';
import Login from './components/login';
import Register from './components/Register';
import Container from 'react-bootstrap/Navbar';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import TodoDataService from './services/todos';

function App() {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState('');

  async function login(user = null) {
    TodoDataService.login(user)
    .then(response => {
      setToken(response.data.token);
      setUser(user.username);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', user.username);
      setError("");
    })
    .catch(e => {
      console.log('login', e);
      setError(e.toString());
    });
  }

  async function logout() {
    setToken("");
    setUser("");
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
  }

  async function register(user = null) {
    TodoDataService.register(user)
    .then(response => {
      setToken(response.data.token);
      setUser(user.username);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', user.username)
    })
    .catch(e => {
      console.log('register', e);
      setError(e.toString);
    })
  }
  return (
    <div className='App'>
      <Navbar bg='primary' variant='dark'>
        <div className='container-fluid'>
          <Navbar.Brand>Todos-App</Navbar.Brand>
          <Nav className='me-auto'>
            <Container>
              <Link class='nav-link' to={'/todos'}>Todos</Link>
              {
                user ? (
                  <Link class='nav-link' onClick={logout}>Logout ({user})</Link>
                ) : (
                  <>
                    <Link class='nav-link' to={"/login"}>Login</Link>
                    <Link class='nav-link' to={"/Register"}>Register</Link>
                  </>
                )
              }
            </Container>
          </Nav>
        </div>
      </Navbar>

      <div className='container mt-4'>
        <Routes>
          <Route path='/' element={<TodosList token={token} />} />
          <Route path='/todos' element={<TodosList token={token} />} />
          <Route path='/todos/create' element={<AddTodo token={token}/>}/>
          <Route path='/todos/:id/' element={<AddTodo token={token}/>}/>
          <Route path='/login' element={<Login login={login}/>}/>
          <Route path='/register' element={<Register register={register}/>}/>
        </Routes>
      </div>

      <footer className='text-center text-lg-start bg-light text-muted mt-4'>
        <div className='text-center p-4'>
          ©️ Copyright
          <a target='_blank' rel='noopener noreferrer' className='text-reset fw-bold text-decoration-none' href='https://petermuhumuki.netlify.app/'>Peter Muhumuki</a>
        </div>
      </footer>
    </div>
  )
}
export default App