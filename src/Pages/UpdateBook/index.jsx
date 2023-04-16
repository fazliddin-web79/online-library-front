import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Label } from "reactstrap";
import axios from "axios";
import { mainUrl } from "../../MainUrl/mainUrl";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

function UpdateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [ISBN, setISBN] = useState("");
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishedDate, setPublishedDate] = useState("");

  const params = useParams();

  useEffect(() => {
    axios.get(mainUrl + "/api/books/" + params.id).then((res) => {
      setAuthor(res.data.data.author);
      setTitle(res.data.data.title);
      setDescription(res.data.data.description);
      setISBN(res.data.data.ISBN);
      setPages(res.data.data.numberOfPages);
      setPublisher(res.data.data.publisher);
      setPublishedDate(res.data.data.dateOfPrint.split("T")[0]);
    });
  }, [params.id]);

  const handleSubmit = () => {
    axios
      .put(
        mainUrl + "/api/teacher/book/" + params.id,
        {
          title,
          author,
          dateOfPrint: publishedDate,
          description,
          numberOfPages: pages,
          ISBN,
          publisher,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        toast.success("Kitob o'zgartirildi", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setAuthor("");
        setDescription("");
        setISBN("");
        setPages("");
        setPublishedDate("");
        setPublisher("");
        setTimeout(() => {
          window.location.href = "/";
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
      <ToastContainer />
      <h1>Yangi kitob yaratish</h1>
      <Form>
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
          O'zgartirish
        </Button>
      </Form>
    </div>
  );
}

export default UpdateBook;
