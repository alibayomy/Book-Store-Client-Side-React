import React from "react";
import "./Books.css";
// import { Link } from "react-router-dom";

import product1 from "../../images/author-book-store-book-cover-06.jpg";
import product2 from "../../images/author-book-store-book-cover-07.jpg";
import product3 from "../../images/author-book-store-book-cover-08.jpg";
import product4 from "../../images/author-book-store-book-img-01.jpg";
import MyAllCards from "../../Components/MyAllCards/MyAllCards";
import axios from "axios";
axios
// import MyCard from "../../Components/MyCard/MyCard";
function Books() {
  const allBooks = [
    // Replace with actual book data or fetch from an API
    {
      id: 1,
      title: "The Born of APLEX",
      category: "fantasy",
      imageUrl: `${product1}`,
      rating: 6,
      price: "$26.00",
    },
    {
      id: 2,
      title: "The Throned Mirror",
      category: "fantasy",
      imageUrl: `${product2}`,
      rating: 4,
      price: "$23.00",
    },
    {
      id: 3,
      title: "Ark Forging",
      category: "fantasy",
      imageUrl: `${product3}`,
      rating: 5,
      price: "$20.00",
    },
    {
      id: 4,
      title: "The Sons of the Empire",
      category: "fantasy",
      imageUrl: `${product4}`,
      rating: 2,
      price: "$20.00",
    },
    {
      id: 5,
      title: "The Sons of the Empire",
      category: "fantasy",
      imageUrl: `${product1}`,
      rating: 5,
      price: "$20.00",
    },
    {
      id: 6,
      title: "The Sons of the Empire",
      category: "fantasy",
      imageUrl: `${product3}`,
      rating: 4,
      price: "$20.00",
    },
    {
      id: 7,
      title: "The Sons of the Empire",
      category: "fantasy",
      imageUrl: `${product4}`,
      rating: 2,
      price: "$20.00",
    },
    {
      id: 8,
      title: "The Sons of the Empire",
      category: "fantasy",
      imageUrl: `${product1}`,
      rating: 5,
      price: "$20.00",
    },
    {
      id: 9,
      title: "The Sons of the Empire",
      category: "fantasy",
      imageUrl: `${product3}`,
      rating: 5,
      price: "$20.00",
    },
    {
      id: 10,
      title: "The Sons of the Empire",
      category: "fantasy",
      imageUrl: `${product1}`,
      rating: 5,
      price: "$20.00",
    },
    {
      id: 11,
      title: "The Sons of the Empire",
      category: "fantasy",
      imageUrl: `${product4}`,
      rating: 3,
      price: "$20.00",
    },
    {
      id: 12,
      title: "The Sons of the Empire",
      category: "fantasy",
      imageUrl: `${product1}`,
      rating: 5,
      price: "$20.00",
    },
    {
      id: 13,
      title: "The Sons of the Empire",
      category: "fantasy",
      imageUrl: `${product4}`,
      rating: 5,
      price: "$20.00",
    },
    {
      id: 14,
      title: "The Sons of the Empire",
      category: "fantasy",
      imageUrl: `${product3}`,
      rating: 1,
      price: "$20.00",
    },
  ];

  return (
    <div>
      <div>
        <section className="All-books-section mt-5 p-5">
          <div className="container">
            <div className="d-flex justify-content-between">
              <h2 className="section-heading mb-4">All Books</h2>
              <select className="books-sorting">
                <option value="">Default Sorting</option>
                <option value="">Sort by price</option>
                <option value="">sort by rating</option>
                <option value="">sort by sale</option>
              </select>
            </div>
            <div className="row">
              {allBooks.map((book) => (
                <MyAllCards
                  key={book.id}
                  imageUrl={book.imageUrl}
                  title={book.title}
                  category={book.category}
                  rating={book.rating}
                  price={book.price}
                />
              ))}
            </div>
            <div class="pagination-buttons mt-5">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>&#8594;</span>
            </div>
          </div>
        </section>
        <br />
      </div>
    </div>
  );
}

export default Books;
