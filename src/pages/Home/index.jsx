// import logo from "./logo.svg";
import "../../App.css";
import "../Home/style.css";
import Swal from "sweetalert2";
import {
  FaBeer,
  FaAddressCard,
  FaUserPlus,
  FaPlus,
  FaTrashAlt,
  FaRegEdit,
} from "react-icons/fa";
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from "react-floating-button-menu";
//   import MdAdd from '@material-ui/icons/add';
//   import MdClose from '@material-ui/icons/clear';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Table,
  Col,
  Row,
  Button,
  Container,
  Modal,
  ModalHeader,
  Label,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
} from "reactstrap";
import Header from "../../components/header";
// import { Container, Button, Link } from 'react-floating-action-button'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const Index = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [isIndex, setIsIndex] = useState("");
  let [isOpen, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    let get = JSON.parse(localStorage.getItem("employee"));
    if (get && get.length) {
      setData(get);
    }
   
   
  }, [])

  const toggle = () => {
    setModal(!modal);
    setIsUpdate(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setSalary("");
    setDate("");
  };

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

  const updateEmp = () => {
    
    let dupData = [...data];

    dupData[isIndex].firstName = firstName;
    dupData[isIndex].lastName = lastName;
    dupData[isIndex].Email = email;
    dupData[isIndex].salary = salary;
    dupData[isIndex].date = date;

    setData(dupData);
    localStorage.setItem('employee',JSON.stringify(dupData));

    setModal(false);
 
  };

  const editEmp = (edit) => {
    setModal(true);
    setIsUpdate(true);
    setIsIndex(edit);
    setFirstName(data[edit].firstName);
    setLastName(data[edit].lastName);
    setEmail(data[edit].Email);
    setSalary(data[edit].salary);
    setDate(data[edit].date);
  };
  // console.log(isIndex);

  const dltEmp = (e) => {
    // console.log(e);
    data.map((per, index) => {
      // console.log(index);
      if (e == index) {
        console.log("Matched !" + index + " &  " + e);
        // let updatedData = data.splice(e, 1);
        let dupdata = [...data];
        dupdata.splice(e,1);
        setData(dupdata);
        localStorage.setItem('employee',JSON.stringify(dupdata))
      }
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "User deleted",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const addEmp = () => {
    let obj = {
      firstName: firstName,
      lastName: lastName,
      Email: email,
      salary: salary,
      date: date,
    };

    // console.log(firstName);
    let get = JSON.parse(localStorage.getItem("employee"));
    if (get && get.length) {
      let dupdata = [...data];
      dupdata.push(obj);
      setData(dupdata);
      localStorage.setItem("employee", JSON.stringify(dupdata));
    } else {
      localStorage.setItem("employee", JSON.stringify([obj]));
    }
    // setData([...data, obj]);
    setModal(false);
  };
  // console.log(data);
  let count = 0;
  return (
    <div className="App">
      <Header />
      <Container className="mt-4">
        <Table>
          <thead className="table-header">
            <tr>
              <th>S No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Joining Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((per, index) => (
              <tr key={index}>
                <td>{++count}</td>
                <td>{per.firstName}</td>
                <td>{per.lastName}</td>
                <td>{per.Email}</td>
                <td>{per.salary}</td>
                <td>{per.date}</td>
                <td>
                  {
                    <Button
                      color="outline-danger"
                      onClick={() => dltEmp(index)}
                    >
                      <FaTrashAlt />
                    </Button>
                  }
                  {
                    <Button
                      className="ms-3"
                      color="outline-success"
                      onClick={() => editEmp(index)}
                    >
                      <FaRegEdit />
                    </Button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button className="btn-add-user" onClick={toggle}>
          <FaUserPlus />
        </Button>{" "}
      </Container>

      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} close={closeBtn}>
            Modal title
          </ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col md={6}>
                  <InputGroup>
                    <Input
                      onChange={(event) => setFirstName(event.target.value)}
                      value={firstName}
                      placeholder="FirstName"
                    />
                  </InputGroup>
                </Col>

                <Col md={6}>
                  <InputGroup>
                    <Input
                      onChange={(event) => setLastName(event.target.value)}
                      placeholder="LastName"
                      value={lastName}
                    />
                  </InputGroup>
                </Col>
              </Row>

              <Row className="py-4">
                <Col>
                  {" "}
                  <InputGroup>
                    <InputGroupText>@</InputGroupText>

                    <Input
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Email"
                      type="email"
                      value={email}
                    />
                  </InputGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Input
                    type="number"
                    placeholder="Salary"
                    min={1000}
                    onChange={(event) => setSalary(event.target.value)}
                    value={salary}
                  />
                </Col>

                <Col md={6}>
                  <Input
                    type="date"
                    onChange={(event) => setDate(event.target.value)}
                    value={date}
                  />
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            {!isUpdate ? (
              <Button color="primary" onClick={addEmp}>
                Add Employee <FaPlus />
              </Button>
            ) : (
              <Button color="primary" onClick={updateEmp}>
                Update <FaPlus />
              </Button>
            )}
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Index;
