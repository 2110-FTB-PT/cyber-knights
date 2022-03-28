import { useState } from 'react';
import { register } from '../axios-services';
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
            const { token } = await register(username, password);
            setToken(token);
            localStorage.setItem("token", token);
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
      <FloatingLabel controlId="username" label="Username">
        <Form.Control type="text" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}}></Form.Control>
      </FloatingLabel>
      <FloatingLabel controlId="password" label="Password">
        <Form.Control type="password" placeholder="Password" minLength="8" onChange={(event) => {setPassword(event.target.value)}}></Form.Control>
      </FloatingLabel>
    <Button variant="success" type="submit">
      Register
    </Button>
  </Form>
  )
  
  }

export default Register;