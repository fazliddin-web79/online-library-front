import React from "react";
import { Link } from "react-router-dom";

const ForbiddenError = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <p className="text m-0 text-center">
                Sizda ro'yhatdan o'tishda xatolik yuz berdi. Iltimos qaytadan{" "}
                <Link
                  to={"/login"}
                  className="text-denger text-decoration-none"
                  style={{ fontWeight: 700 }}
                >
                  {" "}
                  tizimga kiring{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenError;
