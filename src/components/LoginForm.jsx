import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { login } from '../axios-services';

const LoginForm = ({setToken, setUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { token } = await login(username, password);
      setToken(token);
      setPassword("");
      navigate("/");
    } catch (error) {
      console.dir(error);
    }
  }
  
return(
    <Form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
      <h2>Login </h2>
      <FloatingLabel controlId="username" label="Username">
        <Form.Control type="text" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}}></Form.Control>
      </FloatingLabel>
      <FloatingLabel controlId="password" label="Password">
        <Form.Control type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}></Form.Control>
      </FloatingLabel>
    <Button variant="success" type="submit">
      Login
    </Button>
  </Form>
  )
}

export default LoginForm;