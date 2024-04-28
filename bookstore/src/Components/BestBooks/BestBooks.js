import React, { useEffect, useState } from "react";
import "./BestBooks.css";
import { Link } from "react-router-dom";
import MyCard from "../MyCard/MyCard";
import axios from "axios";

function BestBooks() {
  const [rating, setRating] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/best-rated-books/`)
      .then((res) => setRating(res.data))
      .catch((err) => setError(err.message));
  }, []);

  console.log(rating);
  return (
    <div>
      <section className="best-selling-books-section mt-5">
        <div className="container">
          <h2 className="section-heading text-center mb-4">
            Best Rating Books
          </h2>
          <div className="row">
            {/* {error && <p className="text-danger">{error}</p>} */}
            {rating.map((book) => (
              <MyCard
                key={book.id}
                imageUrl={`http://127.0.0.1:8000${book.front_img}`}
                title={book.name}
                category={book.category_name}
                path={`viewbook/${book.id}`}
                price={book.price}
              />
            ))}
            <div className="text-center">
              <Link to="/books" className="filled-button">
                Show All Books
              </Link>
            </div>
          </div>
        </div>
      </section>
      <br />
    </div>
  );
}

export default BestBooks;
