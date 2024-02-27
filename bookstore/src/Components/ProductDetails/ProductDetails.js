import React, { useState } from "react";
import "./ProductDetails.css";
import productImg from "../../images/author-book-store-book-cover-06.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndent } from "@fortawesome/free-solid-svg-icons";

function ProductDetails() {
  const product = {
    category: "Fantasy",
    title: "The Born of Aplex 2",
    author: "Author Name",
    price: "$19.99",
    description:
      "Platea mauris in sit aliquam commodo ipsum, pharetra tempus proin diam metus eget quis lobortis commodo scelerisque etiam placerat amet, ipsum cursus euismod risus morbi ut.",
    imageUrl: `${productImg}`, // Replace with actual image URL
  };

  const [amount, setAmount] = useState(1);

  const handleAmountChange = (e) => {
    // Ensure the value is a positive number
    const newValue = Math.max(1, parseInt(e.target.value, 10) || 1);
    setAmount(newValue);
    // console.log(newValue);
  };

  return (
    <div>
      <section className="product-details-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-6 text-center">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="img-fluid"
              />
            </div>
            <div className="col-md-6 col-lg-4 text-start mt-5 mt-md-0 mt-lg-0">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">{product.category}</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {product.title}
                  </li>
                </ol>
              </nav>
              <p>{product.category}</p>
              <h2>{product.title}</h2>
              <p className="text-muted">by {product.author}</p>
              <h3>
                {product.price}
                <span className="fs-6 cool-text"> + Free Shipping</span>
              </h3>
              <div className="mt-4">
                <h3>
                  Book Details{" "}
                  <FontAwesomeIcon
                    icon={faIndent}
                    size="2xs"
                    className="ms-2"
                  />
                </h3>
                <p className="mb-0">{product.description}</p>
              </div>
              <div>
                <input
                  className="viewbook-input me-3 p-2"
                  type="number"
                  value={amount}
                  min="1"
                  onChange={handleAmountChange}
                />
                <Link to="/" className="outline-button mb-3">
                  Add To Cart
                </Link>
              </div>
              <hr />
              <div>
                <span>Category: {product.category}</span>
                <span className="ms-3">Tags: fiction, sci-fi, science</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
    </div>
  );
}

export default ProductDetails;
