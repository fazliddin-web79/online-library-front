import React, { useEffect, useState } from "react";
import BookCard from "../../Components/BookCard";
import { mainUrl } from "../../MainUrl/mainUrl";
import axios from "axios";
import "./style.css";
import Loading from "../../Components/Loading";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${mainUrl}/api/books/all`)
      .then((res) => {
        setBooks(res.data.books);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="d-flex flex-wrap wrapper-card-books">
          {books.length &&
            books.map((e) => {
              return <BookCard data={e} key={e._id} />;
            })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
