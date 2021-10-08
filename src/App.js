import logo from "./logo.svg";
import "./App.css";
import Swal from "sweetalert2";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Table,
  Col,
  Row,
  Container,
  Label,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";


function App() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  let history = useHistory();
  const loginUser = () => {
    let username = "admin@domain.com";
    let userPass = "admin";

    if (name == username && pass == userPass) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Logged In",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/index");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "incorrect Username or Password!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div className="App">

      <Container>
        <br/>
        <br/>
          <h1 className="login-h1">LOGIN</h1>
          <Row>
          </Row>
        <div className="login-row m-auto">
          <Row >
            <Col md={12}>
              <Label>Username</Label>
              <InputGroup className="mt-2">
                <Input
                  onChange={(event) => setName(event.target.value)}
                  placeholder="username"
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12}>
              <Label>Password</Label>

              <InputGroup className="mt-2">
                <Input
                  type="password"
                  onChange={(event) => setPass(event.target.value)}
                  placeholder="Password"
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12}>
              <Button color="outline-success" onClick={loginUser}>
                Login
              </Button>{" "}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default App;
