import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { mainUrl } from "../../MainUrl/mainUrl";
import axios from "axios";
import Loading from "../../Components/Loading";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const BookPage = () => {
  const [book, setBook] = useState({
    image: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [endTime, setEndTime] = useState(new Date(Date.now()).getTime());

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const onDateChange = (date) => {
    setEndTime(new Date(date).getTime());
  };
  const params = useParams();

  useEffect(() => {
    axios.get(mainUrl + "/api/books/" + params.id).then((res) => {
      setBook(res.data.data);
      setIsLoading(false);
    });
  }, [params.id]);

  const onSendOrder = async () => {
    await axios
      .post(
        mainUrl + "/api/user/order",
        {
          book,
          endDate: endTime,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        res.status === 201 &&
          toast.success("Buyurtma qo'shildi", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        setShow(false);
        window.onload();
      })
      .catch((err) => {
        if (err.response.status && err.response.status > 400)
          navigate("/login");
      });
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <ToastContainer />
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Buyurtma vaqtini kiritish</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="publishedDate">
                  <Form.Label>Vaqtni kiriting</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="nashw qilingan sanani kiriting"
                    min={
                      new Date(Date.now()).getFullYear() +
                      "-" +
                      (new Date(Date.now()).getMonth() + 1 + "").padStart(
                        2,
                        "0"
                      ) +
                      "-" +
                      (new Date(Date.now()).getDate() + "").padStart(2, "0")
                    }
                    max={
                      new Date(Date.now() + 2592000000).getFullYear() +
                      "-" +
                      (
                        new Date(Date.now() + 2592000000).getMonth() +
                        1 +
                        ""
                      ).padStart(2, "0") +
                      "-" +
                      (
                        new Date(Date.now() + 2592000000).getDate() + ""
                      ).padStart(2, "0")
                    }
                    value={
                      new Date(endTime).getFullYear() +
                      "-" +
                      (new Date(endTime).getMonth() + 1 + "").padStart(2, "0") +
                      "-" +
                      (new Date(endTime).getDate() + "").padStart(2, "0")
                    }
                    onChange={(event) => onDateChange(event.target.value)}
                  />
                  <Form.Text
                    className={
                      endTime - Date.now() < 2592000000 ? "" : "text-danger"
                    }
                  >
                    * Buyurtmaning eng uzoq muddati 30 kun
                  </Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Bekor qilish
              </Button>
              <Button variant="primary" onClick={onSendOrder}>
                Buyurtma berish
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="row">
            <div className="col-md-4 d-flex align-items-center">
              <img
                src={mainUrl + "/" + book.image}
                alt={book.title}
                className="img-fluid"
              />
            </div>
            <div className="col-md-8">
              <h1>{book.title}</h1>
              <h2>{book.author}</h2>
              <p>{book.description}</p>
              <ul>
                <li>
                  <strong>ISBN:</strong> {book.ISBN}
                </li>
                <li>
                  <strong>Nashriyot nomi:</strong> {book.publisher}
                </li>
                <li>
                  <strong>Muqova turi:</strong> {book.typeOfCover}
                </li>
                <li>
                  <strong>Alifbosi:</strong> {book.alphabet}
                </li>
                <li>
                  <strong>Chop etilgan sana:</strong>{" "}
                  {new Date(book.dateOfPrint)
                    .toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\//g, "/")}
                </li>
                <li>
                  <strong>Muqovasi:</strong> {book.typeOfCover}
                </li>
                <li>
                  <strong>Sahifalar soni:</strong> {book.numberOfPages}
                </li>
              </ul>
              {localStorage.getItem("loged") &&
              localStorage.getItem("rol") === "user" ? (
                <button className="btn btn-success" onClick={handleShow}>
                  Buyurtma berish
                </button>
              ) : localStorage.getItem("loged") &&
                localStorage.getItem("rol") === "teacher" &&
                localStorage.getItem("id") === book.createdUser ? (
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/update/" + params.id)}
                >
                  O'zgartirsh
                </button>
              ) : localStorage.getItem("loged") &&
                localStorage.getItem("rol") === "admin" ? (
                ""
              ) : localStorage.getItem("loged") &&
                localStorage.getItem("rol") === "teacher" &&
                localStorage.getItem("id") !== book.createdUser ? (
                ""
              ) : (
                <Link to={"/login"}>Buyurtma berish uchun tizimga kiring</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPage;
