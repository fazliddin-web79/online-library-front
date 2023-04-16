import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import axios from "axios";
import { mainUrl } from "../../MainUrl/mainUrl";
import { Link, useNavigate } from "react-router-dom";
import ForbiddenError from "../../Components/ForbiddenError";
import { toast, ToastContainer } from "react-toastify";

const ShowMyBooks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(mainUrl + "/api/teacher/my-books", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setOrders(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  const onDeleteOrder = async (id) => {
    setIsLoading(true);
    await axios
      .delete(mainUrl + "/api/teacher/book/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Kitob tizimdan o'chirildi", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.href = "/my-add-books";
          }, 2000);
        }
        setIsLoading(false);
      })
      .catch((er) => {
        toast.error(er.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      });
  };
  return (
    <div className="w-100 d-flex align-items-center">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <ToastContainer />
          {error ? (
            <ForbiddenError />
          ) : orders.length ? (
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Kitob nomi</th>
                  <th>Nashriyot nomi</th>
                  <th>Kitob muallifi</th>
                  <th>Nashr vaqti</th>
                  <th>Sahofalar soni</th>
                  <th className="text-warning">Buyruqlar</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((e, i) => {
                  return (
                    <tr key={i} className="text-center">
                      <td>{i + 1}</td>
                      <td>{e.title}</td>
                      <td>{e.publisher}</td>
                      <td>{e.author}</td>
                      <td>{e.dateOfPrint.split("T")[0]}</td>
                      <td>{e.numberOfPages}</td>
                      <td>
                        <button
                          className="btn btn-danger m-1"
                          onClick={() => onDeleteOrder(e._id)}
                        >
                          O'chirish
                        </button>
                        <button
                          className="btn btn-primary m-1"
                          onClick={() => navigate("/book/" + e._id)}
                        >
                          Ko'rish
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="row  h-100">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <p className="text-center">
                      Siz kitob yaratmagansiz. Kitob Yaratish uchun{" "}
                      <Link
                        className="text-primary text-decoration-none"
                        style={{ fontWeight: 700 }}
                        to={"/create-book"}
                      >
                        Kitob yaratish
                      </Link>{" "}
                      sahifasiga o'ting
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowMyBooks;
