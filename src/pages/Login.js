import { useState } from "react";
import {
  Button,
  Container,
  ContainerWrapper,
  Label,
  Input,
  Header,
} from "../styles/pages/Login.styles";
import loginApi from "../utils/loginApi";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const history = useHistory();

  const login = () => {
    loginApi(userName, password)
      .then((response) => {
        localStorage.setItem("username", userName);
        localStorage.setItem("password", password);
        history.push("/products");
      })
      .catch((error) => setLoginError("Invalid credentials"));
  };

  return (
    <Container>
      <Header>Welcome to the WizeStore!</Header>
      <div>
        <Label htmlFor="username">
          <b>Username</b>
        </Label>
        <br />
        <Input
          type="text"
          placeholder="Enter Username"
          name="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <Label htmlFor="password">
          <b>Password</b>
        </Label>
        <br />
        <Input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => login()}>Login</Button>
        {loginError && loginError}
      </div>
    </Container>
  );
};
