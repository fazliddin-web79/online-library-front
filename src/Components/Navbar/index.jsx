import React, { useContext, useState } from "react";
import { Navbar, Nav, Container, NavDropdown, NavItem } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import NotificationBell from "../NotificationBell";
import { UserContext } from "../../Context/context";

function NavigationBar() {
  const [expanded, setExpanded] = useState(false);
  const { orders } = useContext(UserContext);
  const { time } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };
  const onLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Navbar className="z-index-5" bg="light" expand="lg" expanded={expanded}>
      <Container>
        <Navbar.Brand href="/">Online Kutubxona</Navbar.Brand>
        <Navbar.Toggle onClick={toggleNavbar} />
        <Navbar.Collapse>
          <Nav className="ms-auto gap-4">
            {orders.length ? (
              <div className="d-flex align-items-center">
                <NotificationBell data={orders} />
              </div>
            ) : (
              ""
            )}
            {localStorage.getItem("rol") === "admin" && (
              <NavLink
                className={"navbar-item d-flex align-items-center"}
                to="/all-users"
                reloadDocument
              >
                Foydalanuvchilar
              </NavLink>
            )}
            {localStorage.getItem("rol") === "admin" && (
              <NavLink
                className={"navbar-item d-flex align-items-center"}
                to="/all-admins"
                reloadDocument
              >
                Adminlar
              </NavLink>
            )}
            {localStorage.getItem("rol") === "admin" && (
              <NavLink
                className={"navbar-item d-flex align-items-center"}
                to="/all-teachers"
                reloadDocument
              >
                Kutubxonachilar
              </NavLink>
            )}
            {localStorage.getItem("rol") === "user" && (
              <NavLink
                className={"navbar-item d-flex align-items-center"}
                to="/my-orders"
                reloadDocument
              >
                Mening Buyurtmalarim
              </NavLink>
            )}
            {localStorage.getItem("rol") === "teacher" && (
              <NavLink
                className={"navbar-item d-flex align-items-center"}
                to="/create-book"
              >
                Kitob qo'shish
              </NavLink>
            )}
            {localStorage.getItem("rol") === "teacher" && (
              <NavLink
                className={"navbar-item d-flex align-items-center"}
                to="/all-orders"
              >
                Buyurtmalar
              </NavLink>
            )}
            {time && (
              <div className="server-time d-flex flex-column align-items-end">
                <span>Server Vaqti</span>
                <div>
                  <span>
                    {String(new Date(time).getDate()).padStart(2, "0") +
                      "." +
                      String(new Date(time).getMonth() + 1).padStart(2, "0") +
                      "." +
                      String(new Date(time).getFullYear())}
                  </span>{" "}
                  |{" "}
                  <span>
                    {" "}
                    {String(new Date(time).getHours()).padStart(2, "0") +
                      "." +
                      String(new Date(time).getMinutes()).padStart(2, "0")}{" "}
                  </span>
                </div>
              </div>
            )}
            {localStorage.getItem("loged") && localStorage.getItem("user") ? (
              <NavDropdown
                style={{ fontWeight: 600, color: "rgba(0,0,0,1)" }}
                title="Fazliddin"
                id="basic-nav-dropdown"
              >
                {localStorage.getItem("rol") === "admin" && (
                  <NavItem onClick={() => navigate("/create-admin")}>
                    Admin qo'shish
                  </NavItem>
                )}
                {localStorage.getItem("rol") === "admin" && (
                  <NavItem onClick={() => navigate("/create-teacher")}>
                    Kutubxonachi
                  </NavItem>
                )}
                {localStorage.getItem("rol") === "teacher" && (
                  <NavItem>Mening Kitoblarim</NavItem>
                )}

                <NavItem>Sozlamalar</NavItem>
                <hr className="m-1" />
                <NavItem onClick={() => onLogout()}>Chiqish</NavItem>
              </NavDropdown>
            ) : (
              <NavLink
                className={"navbar-item d-flex align-items-center"}
                to="/login"
              >
                Kirish
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
