import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { mainUrl } from "../../MainUrl/mainUrl";
import { ToastContainer, toast } from "react-toastify";

function AddTeacher() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [message, setMessage] = useState("");

  // const navigate = useNavigate();

  const handleRegister = () => {
    axios
      .post(
        mainUrl + "/api/admin/create/teacher",
        {
          userName,
          password,
          name,
          surname,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        toast.success("Kutubxonachi muvaffaqiyatli qo'shildi", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status >= 400) {
          toast.error(
            error.response.data.message.split("teachers validation failed:")[1],
            {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            }
          );
          setMessage(
            error.response.data.message.split("teachers validation failed:")[1]
          );
        }
      });
  };

  return (
    <Container>
      <ToastContainer />
      <Row className="justify-content-md-center mt-4">
        <Col md={6}>
          <h2 className="text-center">Yangi Kutubxonachi qo'shish</h2>
          {message && <h6 className="text-danger text-center">{message}</h6>}

          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Foydalanuvchi nomi</Form.Label>
              <Form.Control
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Parol</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Kutubxonachi Ismi</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingizni kiriting"
              />
            </Form.Group>
            <Form.Group controlId="formBasicUSurname">
              <Form.Label>Kutubxonachi Familiyasi</Form.Label>
              <Form.Control
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Familiyangizni kiriting"
              />
            </Form.Group>

            <div className=" mt-4">
              <Button variant="primary" onClick={handleRegister}>
                Qo'shish
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddTeacher;
