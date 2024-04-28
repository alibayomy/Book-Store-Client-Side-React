import React from "react";
import "./HeroSection.css";
import heroImg from "../../images/author-book-store-hero-book-cover-img.jpg";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-6 col-lg-4 order-md-2 text-center">
            <img src={heroImg} alt="Bookstore Hero" className="img-fluid" />
          </div>
          <div className="col-md-6 col-lg-6 order-md-1 text-center text-md-start mt-5 mt-lg-0">
            <h6 className="mb-5 cool-text">NEW RELEASE</h6>
            <h1 className="display-4 fw-bolder" style={{ fontSize: "65px" }}>
              Discover Your Next Favorite Book
            </h1>
            <p className="lead">
              Explore a vast collection of books covering various genres.
            </p>
            <Link to="/books" className="filled-button">
              Buy Now
            </Link>
          </div>
        </div>
        <br />
      </div>
    </section>
  );
}

export default HeroSection;
