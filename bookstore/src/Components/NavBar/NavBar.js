import React, { useState } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary sticky-top shadow-sm"
      style={{ height: "80px" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          BookStore
        </Link>
        <span
          className="ms-5 border-0 order-lg-1 ms-auto me-4 cool-text"
          id="basket-shopping"
          style={{ cursor: "pointer" }}
        >
          <span className="me-3">$0.00</span>
          <FontAwesomeIcon icon={faBasketShopping} size="lg" />
        </span>
        <span
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </span>
        <div
          className="collapse navbar-collapse bg-body-tertiary p-3"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </ul>
          <form className="d-flex ms-auto" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="input-group-text border-0"
              id="search-addon"
              type="submit"
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faSearch} size="lg" />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
