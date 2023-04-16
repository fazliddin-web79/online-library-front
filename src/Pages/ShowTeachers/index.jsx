import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import { mainUrl } from "../../MainUrl/mainUrl";
import axios from "axios";
import { Link } from "react-router-dom";
import ForbiddenError from "../../Components/ForbiddenError";
import { Button } from "react-bootstrap";
import { FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const ShowTeachers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(mainUrl + "/api/admin/teachers/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setOrders(res.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  const onShowPassword = (i) => {
    const input = document.getElementById("user_password_" + i);
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };
  const onDeleteUser = (id) => {
    axios
      .delete(mainUrl + "/api/admin/teacher/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        toast.success("Kutubxonachi tizimdan o'chirildi", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.href = "/all-teachers";
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
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
    <div>
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
                  <th>Ismi</th>
                  <th>Familiyasi</th>
                  <th>Foydalanuchi nomi</th>
                  <th>Parol</th>
                  <th>Buyruq</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((e, i) => {
                  return (
                    <tr key={i} className="text-center">
                      <td>{i + 1}</td>
                      <td>{e.name}</td>
                      <td>{e.surname}</td>
                      <td>{e.userName}</td>
                      <td>
                        <div>
                          <div
                            className="input-group"
                            style={{ width: "150px" }}
                          >
                            <input
                              className="form-control"
                              value={e.password}
                              disabled
                              id={"user_password_" + i}
                              type="password"
                              placeholder="Enter password"
                            />

                            <Button
                              className="btn-group d-flex align-items-center"
                              variant="outline-secondary"
                              onClick={() => {
                                onShowPassword(i);
                              }}
                            >
                              <FaEyeSlash />
                            </Button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => onDeleteUser(e._id)}
                        >
                          O'chirish
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
                      Sizda buyurtmalar mavjud emas. Buyurtma qilish uchun{" "}
                      <Link
                        className="text-primary text-decoration-none"
                        style={{ fontWeight: 700 }}
                        to={"/"}
                      >
                        Asosiy
                      </Link>{" "}
                      sahifaga o'ting
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

export default ShowTeachers;
