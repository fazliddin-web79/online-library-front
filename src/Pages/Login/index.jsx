import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { mainUrl } from "../../MainUrl/mainUrl";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../Context/context";

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [rol, setRol] = useState("user");
  // const [state] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post(mainUrl + "/api/login/" + rol, { userName, password })
      .then((res) => {
        // state.returnTimeObject(res.data.time);
        localStorage.setItem("loged", true);
        localStorage.setItem("rol", res.data.data.rol);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("id", res.data.data.id);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status >= 400) {
          setMessage(error.response.data.message);
        }
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col md={6}>
          <h2 className="text-center">Tizimga kirish</h2>
          {message && <h6 className="text-danger text-center">{message}</h6>}
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Foydalanuvchi nomi</Form.Label>
              <Form.Control
                type="text"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Foydalanuchi nomini kiriting"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Parol</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolni kiriting"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rol uchun</Form.Label>
              <Form.Control
                onChange={(e) => setRol(e.target.value)}
                as="select"
              >
                <option value="user">Oddiy Foydalanuvchi</option>
                <option value="admin">Admin</option>
                <option value="teacher">Kutubxonachi</option>
              </Form.Control>
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="primary" onClick={handleLogin}>
                Kirish
              </Button>
              <div
                className="btn btn-primary"
                onClick={() => navigate("/register")}
              >
                Ro'ykatdan o'tish
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
