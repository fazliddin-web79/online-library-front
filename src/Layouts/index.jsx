import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";

const Layouts = () => {
  return (
    <div>
      <Navbar />
      <div
        className="d-flex container justify-content-center"
        style={{ minHeight: "calc(100vh - 120px)" }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layouts;
