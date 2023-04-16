import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { mainUrl } from "../MainUrl/mainUrl";

export const UserContext = createContext();

export const Context = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [time, setTime] = useState();

  useEffect(() => {
    axios.get(mainUrl + "/time").then((res) => setTime(res.data.time));
    localStorage.getItem("rol") === "user" &&
      axios
        .get(mainUrl + "/api/user/order-notification", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setOrders(res.data.orders);
        });
  }, []);
  return (
    <UserContext.Provider value={{ orders, setOrders, time, setTime }}>
      {children}
    </UserContext.Provider>
  );
};

export default Context;
