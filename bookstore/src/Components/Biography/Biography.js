import React from "react";
import "./Biography.css";
import bioImg from "../../images/author-book-store-author-img.jpg";
import { Link } from "react-router-dom";

function Biography() {
  return (
    <div>
      <section className="biography-section mt-5">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-md-5 col-lg-5 text-center">
              <img src={bioImg} alt="Bookstore Hero" className="img-fluid" />
            </div>
            <div className="col-md-6 col-lg-6 text-center text-md-start mt-3 mt-lg-0 mt-sm-5">
              <h6 className="mb-3 cool-text">NEW RELEASE</h6>
              <h1 className="display-4 fw-bolder">John Roberts</h1>
              <p className="lead">
                ‍We believe local bookstores are essential community hubs that
                foster culture, curiosity, and a love of reading, and we're
                committed to helping them thrive.
              </p>
              <Link to="/books" className="outline-button">
                View Books
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="container mt-5">
        <div className="row justify-content-between align-items-center">
          <div className="col-sm-6 col-md-6 col-lg-3 text-center">
            <span></span>
            <h5>Best Author Awards 2012</h5>
            <p>
              Arcu pellentesque nisi consectetur netus aenean metus sit mattis
              sit sed.
            </p>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 text-center">
            <span></span>
            <h5>World's #1 Best-selling Book</h5>
            <p>
              Diam nibh non in enim nunc suscipit risus, adipiscing aenean
              quisque viverra.
            </p>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 text-center">
            <span></span>
            <h5>NYT Best-selling Author 2014</h5>
            <p>
              Urna donec dolor bibendum lectus arcu purus eget nisl, ut nisl
              vitae.
            </p>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 text-center">
            <span></span>
            <h5>Best Author Awards 2018</h5>
            <p>
              Morbi odio sodales et facilisis mi nibh fringilla quis risus
              ultricies facilisis.
            </p>
          </div>
        </div>
      </div> */}
      <br />
    </div>
  );
}

export default Biography;
