import React from "react";
import "./BestBooks.css";
import { Link } from "react-router-dom";
import product1 from "../../images/author-book-store-book-cover-06.jpg";
import product2 from "../../images/author-book-store-book-cover-07.jpg";
import product3 from "../../images/author-book-store-book-cover-08.jpg";
import product4 from "../../images/author-book-store-book-img-01.jpg";
import MyCard from "../MyCard/MyCard";

function BestBooks() {
  const bestSellingBooks = [
    // Replace with actual book data or fetch from an API
    {
      id: 1,
      title: "The Born of APLEX",
      category: "fantasy",
      imageUrl: `${product1}`,
      price: "$26.00",
    },
    {
      id: 2,
      title: "The Throned Mirror",
      category: "fantasy",
      imageUrl: `${product2}`,
      price: "$23.00",
    },
    {
      id: 3,
      title: "Ark Forging",
      category: "fantasy",
      imageUrl: `${product3}`,
      price: "$20.00",
    },
    {
      id: 4,
      title: "The Sons of the Empire",
      category: "fantasy",
      imageUrl: `${product4}`,
      price: "$20.00",
      oldPrice: "$25.00",
    },
    // Add more books as needed
  ];

  return (
    <div>
      <section className="best-selling-books-section mt-5">
        <div className="container">
          <h2 className="section-heading text-center mb-4">
            Best Selling Books
          </h2>
          <div className="row">
            {bestSellingBooks.map((book) => (
              <MyCard
                key={book.id}
                imageUrl={book.imageUrl}
                title={book.title}
                category={book.category}
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
