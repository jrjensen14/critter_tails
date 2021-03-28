import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { validateEmail } from '../utils/helpers';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_PET } from '../utils/mutations';
import Auth from '../utils/auth';

import './pages.css';



function Login () {
  const [formState, setFormState] = useState({ email: '', password: ''})
  const [login, {error}] = useMutation(LOGIN_PET);
  
  function handleChange (event) {
    const { name, value} = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    // console.log(value)
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: {...formState } 
      });
      Auth.login(data.login.token);
      console.log(formState)
    } catch (e) {
      console.error(e)
    }
  };
   return(
     
      <Container className="pb-5">
        <h3>Login</h3>
      <Form onSubmit={handleFormSubmit}>
        <form className="form">
          
        <Form.Group controlId="formEmail">
          <Form.Label>Enter your email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="name@example.com" onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Enter a password that is at least 8 characters</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" onChange={handleChange}/>
        </Form.Group>
        <Button className="button" variant="primary" type="submit">
          Submit
        </Button>
        {error && <div>Login failed</div>}
        </form>
      </Form>
      </Container>
   ) 
}

export default Login;