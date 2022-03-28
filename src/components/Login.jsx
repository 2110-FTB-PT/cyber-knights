import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Login = ({token, setToken, setUser}) => {

  return (
    <div className="d-flex gap-4 mt-5">
      <LoginForm setToken={setToken} setUser={setUser}/>
      <div className="vr"></div>
      <RegisterForm token={token} setToken={setToken}/>
    </div>
  );
};

export default Login;
