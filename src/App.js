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
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function App() {
  
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  let history = useHistory();
  const loginUser = () => {
      let username = "admin@domain.com"
      let userPass = "admin";

      if(name == username && pass == userPass){

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User Logged In',
          showConfirmButton: false,
          timer: 1500
        })
        history.push("/login");


      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'incorrect Username or Password!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col md={4}>
            <InputGroup>
             
              <Input
                onChange={(event) => setName(event.target.value)}
                placeholder="username"
              />
            </InputGroup>
          </Col>

          <Row>
            <Col md={4}>
              <InputGroup>
               
                <Input type="password"
                  onChange={(event) => setPass(event.target.value)}
                  placeholder="Password"
                />
              </InputGroup>
            </Col>
          </Row>

          <Col>
          <Button color="primary" onClick={loginUser}>Login</Button>{' '}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
