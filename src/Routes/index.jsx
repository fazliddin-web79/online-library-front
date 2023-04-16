import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import Layouts from "../Layouts";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import BookPage from "../Pages/ShowBook";
import CreateBook from "../Pages/CreateBook";
import Orderstable from "../Pages/OrdersTable";
import MyOrders from "../Pages/MyOrders";
import ShowUsers from "../Pages/ShowUsers";
import ShowTeachers from "../Pages/ShowTeachers";
import ShowAdmin from "../Pages/ShowAdmin";
import AddTeacher from "../Pages/AddTeacher";
import AddAdmin from "../Pages/AddAdmin";
import ShowMyBooks from "../Pages/ShowMyBooks";
import UpdateBook from "../Pages/UpdateBook";

const RouterComponent = () => {
  return (
    <Routes>
      <Route element={<Layouts />} path="/">
        <Route element={<HomePage />} path="/" />
        <Route element={<BookPage />} path="/book/:id" />
        {localStorage.getItem("rol") === "admin" && (
          <Route element={<ShowTeachers />} path="/all-teachers" />
        )}
        {localStorage.getItem("rol") === "admin" && (
          <Route element={<ShowAdmin />} path="/all-admins" />
        )}
        {localStorage.getItem("rol") === "admin" && (
          <Route element={<AddTeacher />} path="/create-teacher" />
        )}
        {localStorage.getItem("rol") === "admin" && (
          <Route element={<AddAdmin />} path="/create-admin" />
        )}
        {localStorage.getItem("rol") === "admin" && (
          <Route element={<ShowUsers />} path="/all-users" />
        )}
        {localStorage.getItem("rol") === "teacher" && (
          <Route element={<CreateBook />} path="/create-book" />
        )}
        {localStorage.getItem("rol") === "teacher" && (
          <Route element={<ShowMyBooks />} path="/my-add-books" />
        )}
        {localStorage.getItem("rol") === "teacher" && (
          <Route element={<UpdateBook />} path="/update/:id" />
        )}
        {localStorage.getItem("rol") === "teacher" && (
          <Route element={<Orderstable />} path="/all-orders" />
        )}
        {localStorage.getItem("rol") === "user" && (
          <Route element={<MyOrders />} path="/my-orders" />
        )}
      </Route>
      <Route element={<Login />} path="/login" />
      <Route element={<Register />} path="/register" />
    </Routes>
  );
};

export default RouterComponent;
