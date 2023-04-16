import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import UploadImg from "../../Components/UploadImg";
import { Label } from "reactstrap";
import axios from "axios";
import { mainUrl } from "../../MainUrl/mainUrl";
import { toast } from "react-toastify";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [ISBN, setISBN] = useState("");
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [coverImg, setCoverImg] = useState();

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("image", coverImg);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("dateOfPrint", publishedDate);
    formData.append("description", description);
    formData.append("numberOfPages", pages);
    formData.append("ISBN", ISBN);
    formData.append("publisher", publisher);
    formData.append("typeOfCover", "Qattiq");
    formData.append("alphabet", "Lotin");

    axios
      .post(mainUrl + "/api/teacher/book/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        toast.success("Kitob tizimga qo'shildi", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.href = "/create-book";
          setAuthor("");
          setCoverImg("");
          setDescription("");
          setISBN("");
          setPages("");
          setPublishedDate("");
          setPublisher("");
        }, 2000);
      })
      .catch((error) => {
        toast.error("Tizimda xatolik", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      });
    // Here, you can add code to submit the book information to your backend
  };

  return (
    <div className="container">
      <h1>Yangi kitob yaratish</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Kitob Nomi</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the book title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="author">
          <Form.Label>Kitob muallifi</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the book author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="isbn">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="ISBN kiriting"
            value={ISBN}
            onChange={(event) => setISBN(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Qo'shimcha izoh</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter a brief description of the book"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="coverImg">
          <Form.Label>Kitob rasmi</Form.Label>
          <UploadImg
            img={coverImg}
            setImg={setCoverImg}
            defaultImg=""
            altText="Book Cover"
          />
        </Form.Group>
        <Form.Group controlId="publisher">
          <Form.Label>Nashriyot nomi</Form.Label>
          <Form.Control
            type="text"
            placeholder="Kitob chop etilgan nashriyot nomi"
            value={publisher}
            onChange={(event) => setPublisher(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="publishedDate">
          <Form.Label>nashrqilingan sana</Form.Label>
          <Form.Control
            type="date"
            placeholder="nashw qilingan sanani kiriting"
            value={publishedDate}
            onChange={(event) => setPublishedDate(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Label for="pages">Sahifalarsoni</Label>
          <Form.Control
            type="number"
            id="pages"
            placeholder="Kitob sahifalar soni"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-2 mb-3" variant="primary" onClick={handleSubmit}>
          Yaratish
        </Button>
      </Form>
    </div>
  );
}

export default CreateBook;
