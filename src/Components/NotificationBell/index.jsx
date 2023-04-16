import { FaBell } from "react-icons/fa";
import { Badge, Button, OverlayTrigger, Popover } from "react-bootstrap";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NotificationBell = ({ data }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState();
  return (
    <div className="position-relative">
      <OverlayTrigger
        trigger="click"
        show={show}
        key={"bottom"}
        placement={"bottom"}
        rootCloseEvent="mousedown"
        overlay={
          <Popover
            id={`popover-positioned-"bottom"`}
            onMouseLeave={() => setShow(false)}
          >
            <Popover.Header as="h3">Bildirishnomalar</Popover.Header>
            <Popover.Body>
              <div className="d-flex flex-column">
                {data?.map((e, i) => {
                  return (
                    <div
                      key={e._id}
                      className="not-item p-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/book/" + e.book._id)}
                    >
                      <strong>{e.book.title}</strong>{" "}
                      {new Date(e.endDate.split("T")[0]).getTime() > Date.now()
                        ? new Date(
                            new Date(e.endDate.split("T")[0]).getTime() -
                              Date.now()
                          ).getDate()
                        : "0"}{" "}
                      kun qoldi
                    </div>
                  );
                })}
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <Button variant="link" className="p-0 position-relative color-black">
          <FaBell
            onClick={() => setShow(!show)}
            className="mr-2"
            size={"1.5em"}
          />
          {data.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              <Badge pill bg="danger">
                {data.length}
              </Badge>
              <span className="visually-hidden">Bildirishnomalar</span>
            </span>
          )}
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default NotificationBell;
