import "../../App.css";
import "../Home/style.css";
import Swal from "sweetalert2";
import { FaUserPlus, FaPlus, FaTrashAlt, FaRegEdit } from "react-icons/fa";

import {
  InputGroup,
  InputGroupText,
  Input,
  Table,
  Col,
  Row,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Header from "../../components/header";
import firebase, { db } from "../../config/firbase";

import { useState, useEffect } from "react";

const Index = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [isIndex, setIsIndex] = useState("");
  const [modal, setModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    db.collection("employee")
      .get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          let obj = {
            id: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            Email: doc.data().Email,
            salary: doc.data().alary,
            date: doc.data().date,
          };
          arr.push(obj);
        });
        setData(arr);
      });
  }, []);

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

    db.collection("employee")
      .doc(id)
      .update({
        firstName: firstName,
        lastName: lastName,
        Email: email,
        salary: salary,
        date: date,
      })
      .then(() => {
        console.log("Document successfully updated!");
      });
    console.log(dupData);
    dupData[isIndex].firstName = firstName;
    dupData[isIndex].lastName = lastName;
    dupData[isIndex].Email = email;
    dupData[isIndex].salary = salary;
    dupData[isIndex].date = date;
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Employee details updated",
      showConfirmButton: false,
      timer: 1000,
    });

    setModal(false);
  };

  const editEmp = (edit, id) => {
    setModal(true);
    setIsUpdate(true);
    setIsIndex(edit);
    setId(id);
    setFirstName(data[edit].firstName);
    setLastName(data[edit].lastName);
    setEmail(data[edit].Email);
    setSalary(data[edit].salary);
    setDate(data[edit].date);
  };

  const dltEmp = (e) => {
    console.log(e);

    db.collection("employee")
      .doc(e)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
      let dupdata=[...data];
     let updated = dupdata.filter(x => {
        return x.id != e  
      })
      setData(updated)
      // console.log(updated);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "User deleted",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const addEmp = () => {
    if (!email || !firstName || !lastName || !salary || !date) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "All Input must be filled",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }

    db.collection("employee")
      .add({
        firstName: firstName,
        lastName: lastName,
        Email: email,
        salary: salary,
        date: date,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    let obj = {
      firstName: firstName,
      lastName: lastName,
      Email: email,
      salary: salary,
      date: date,
    };
    let dupdata = [...data];
    dupdata.push(obj);
    setData(dupdata);
    setModal(false);
  };

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
            {!data.length ? (
              <tr className="text-center">
                <td>NO DATA</td>
              </tr>
            ) : (
              data.map((per, index) => (
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
                        onClick={() => dltEmp(per.id)}
                      >
                        <FaTrashAlt />
                      </Button>
                    }
                    {
                      <Button
                        className="ms-3"
                        color="outline-success"
                        onClick={() => editEmp(index, per.id)}
                      >
                        <FaRegEdit />
                      </Button>
                    }
                  </td>
                </tr>
              ))
            )}
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
