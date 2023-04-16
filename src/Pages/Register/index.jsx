import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { mainUrl } from "../../MainUrl/mainUrl";

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    axios
      .post(mainUrl + "/api/register", {
        userName,
        password,
        name,
        surname,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => {
        if (error.response.status >= 400) {
          setMessage(
            error.response.data.message.split("users validation failed:")[1]
          );
        }
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col md={6}>
          <h2 className="text-center">Ro'yhatdan o'tish</h2>
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
              <Form.Label>Ismingiz</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingizni kiriting"
              />
            </Form.Group>
            <Form.Group controlId="formBasicUSurname">
              <Form.Label>Familiyangiz</Form.Label>
              <Form.Control
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Familiyangizni kiriting"
              />
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="primary" onClick={handleRegister}>
                Ro'ykatdan o'tish
              </Button>
              <div
                className="btn btn-primary"
                onClick={() => navigate("/login")}
              >
                Kirish
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
