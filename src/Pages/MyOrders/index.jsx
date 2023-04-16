import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import axios from "axios";
import { mainUrl } from "../../MainUrl/mainUrl";
import { Link, useNavigate } from "react-router-dom";
import ForbiddenError from "../../Components/ForbiddenError";
import { toast, ToastContainer } from "react-toastify";

const MyOrders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(mainUrl + "/api/user/my-orders", {
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
      .delete(mainUrl + "/api/orders/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Buyurtma bekor qilindi", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.href = "/my-orders";
          }, 2000);
        }
        setIsLoading(false);
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
                  <th>Buyurtma muddati</th>
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
                      <td>{e.book.title}</td>
                      <td>{e.endDate.split("T")[0]}</td>
                      <td>{e.book.author}</td>
                      <td>{e.book.dateOfPrint.split("T")[0]}</td>
                      <td>{e.book.numberOfPages}</td>
                      <td>
                        <button
                          className="btn btn-danger m-1"
                          onClick={() => onDeleteOrder(e._id)}
                        >
                          O'chirish
                        </button>
                        <button
                          className="btn btn-primary m-1"
                          onClick={() => navigate("/book/" + e.book._id)}
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

export default MyOrders;
