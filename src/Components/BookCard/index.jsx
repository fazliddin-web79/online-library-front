import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { mainUrl } from "../../MainUrl/mainUrl";

function BookCard({ data }) {
  const { title, author, description, image, _id } = data;
  const navigate = useNavigate();

  return (
    <Card style={{ width: "15rem", height: "fit-content" }}>
      <Card.Img
        style={{ objectFit: "cover", width: "100%", height: "240px" }}
        variant="top"
        src={mainUrl + "/" + image}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary" onClick={() => navigate("/book/" + _id)}>
          Kitobni korish
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
