import React from "react";
import "./BestBooks.css";
import { Link } from "react-router-dom";
import MyCard from "../MyCard/MyCard";
import axios from "axios";
import { useEffect, useState, useTransition } from "react";

function BestBooks(props) {
  const [pages, setPages] = useState({
    results: [],
  });

  useEffect(() => {
    axios
      .get(`${props.api}`)
      .then((res) =>
        setPages({
          results: res.data.results,
        })
      )
      .catch((err) => console.log(err));
  }, []);

  const getMoviesToSort = [...pages.results];
  const topFourMovies = getMoviesToSort
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 4);
  const testMovies = pages.results.slice(0, 6);

  return (
    <div>
      <section className="best-selling-books-section mt-5">
        <div className="container">
          <h2 className="section-heading text-center mb-4">{props.title}</h2>
          <div className="row">
            {topFourMovies.map((book) => (
              <MyCard
                key={book.id}
                imageUrl={`https://image.tmdb.org/t/p/w500/${book.poster_path}`}
                title={book.title}
                category="Action"
                path={`viewbook/${book.id}`}
                price={book.vote_count.toFixed(0)}
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
