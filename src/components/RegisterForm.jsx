import { useState } from 'react';
import { login, register } from '../axios-services';
import { useNavigate } from 'react-router-dom';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

const Register = ({
    setToken
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await register(username, password);
            const { token } = await login(username,password);
            setToken(token);
            setUsername("");
            setPassword("");
            navigate('/');

        } catch(error){
          console.error(error);
        }
    }

  return(
    <Form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      <FloatingLabel controlId="register-username" label="Username">
        <Form.Control type="text" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}}></Form.Control>
      </FloatingLabel>
      <FloatingLabel controlId="register-password" label="Password">
        <Form.Control type="password" placeholder="Password" minLength="8" onChange={(event) => {setPassword(event.target.value)}}></Form.Control>
      </FloatingLabel>
    <Button variant="success" type="submit">
      Register
    </Button>
  </Form>
  )
  
  }

export default Register;