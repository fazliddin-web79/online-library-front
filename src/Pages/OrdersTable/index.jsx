import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import { mainUrl } from "../../MainUrl/mainUrl";
import axios from "axios";
import { Link } from "react-router-dom";
import ForbiddenError from "../../Components/ForbiddenError";

const Orderstable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .get(mainUrl + "/api/orders", {
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
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          {error ? (
            <ForbiddenError />
          ) : orders.length ? (
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Buyurtmachi</th>
                  <th>Buyurtma muddati</th>
                  <th>Kitob nomi</th>
                  <th>Kitob muallifi</th>
                  <th>Nashr vaqti</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((e, i) => {
                  return (
                    <tr key={i} className="text-center">
                      <td>{i + 1}</td>
                      <td>{e.authorInfo.name + " " + e.authorInfo.surname}</td>
                      <td>{e.endDate && e.endDate.split("T")[0]}</td>
                      <td>{e.book.title}</td>
                      <td>{e.book.author}</td>
                      <td>{e.book.dateOfPrint.split("T")[0]}</td>
                      <td>
                        <button className="btn btn-primary">
                          O'zgartirish
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

export default Orderstable;
