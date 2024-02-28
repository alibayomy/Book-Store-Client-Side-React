import React from "react";
import "./BestBooks.css";
import { Link } from "react-router-dom";
import product1 from "../../images/author-book-store-book-cover-06.jpg";
import product2 from "../../images/author-book-store-book-cover-07.jpg";
import product3 from "../../images/author-book-store-book-cover-08.jpg";
import product4 from "../../images/author-book-store-book-img-01.jpg";
import MyCard from "../MyCard/MyCard";
import axios from "axios";
import { useEffect, useState, useTransition } from "react";

function BestBooks() {
  const [pages, setPages] = useState({
    results: [],
  });

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?language=eng&api_key=da4e0d3bd6b4f860b5788aa43ae24d86`
      )
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

  // const bestSellingBooks = [
  //   // Replace with actual book data or fetch from an API
  //   {
  //     id: 1,
  //     title: "The Born of APLEX",
  //     category: "fantasy",
  //     imageUrl: `${product1}`,
  //     price: "$26.00",
  //   },
  //   {
  //     id: 2,
  //     title: "The Throned Mirror",
  //     category: "fantasy",
  //     imageUrl: `${product2}`,
  //     price: "$23.00",
  //   },
  //   {
  //     id: 3,
  //     title: "Ark Forging",
  //     category: "fantasy",
  //     imageUrl: `${product3}`,
  //     price: "$20.00",
  //   },
  //   {
  //     id: 4,
  //     title: "The Sons of the Empire",
  //     category: "fantasy",
  //     imageUrl: `${product4}`,
  //     price: "$20.00",
  //     oldPrice: "$25.00",
  //   },
  //   // Add more books as needed
  // ];

  return (
    <div>
      <section className="best-selling-books-section mt-5">
        <div className="container">
          <h2 className="section-heading text-center mb-4">
            Best Selling Books
          </h2>
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
