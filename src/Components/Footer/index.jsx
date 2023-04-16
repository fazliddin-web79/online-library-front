import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-light">
      <Container>
        <Row className="align-items-center">
          <Col
            md={4}
            className="justify-content-center d-flex align-items-center text-md-left"
          >
            <p className="m-0">Online Kutubxona</p>
          </Col>
          <Col
            md={4}
            className="justify-content-center d-flex align-items-center"
          >
            <p className="m-0">Git havola</p>
          </Col>
          <Col
            md={4}
            className="justify-content-center d-flex align-items-center text-md-right"
          >
            <p className="m-0">
              Barcha huquqlar himoyalangan &copy; Fazliddin Yakubjonov
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
