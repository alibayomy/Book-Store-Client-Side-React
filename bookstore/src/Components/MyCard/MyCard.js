import React from "react";
import "./MyCard.css";
import { Link } from "react-router-dom";

function MyCard(props) {
  return (
    <div key={props.id} className="col-lg-3 col-md-6 mt-3 mb-4">
      <div className="card my-card bg-body-tertiary h-100 rounded-0 border-0">
        <Link to={props.path}>
          <div class="d-flex p-3 mb-2">
            <img
              src={props.imageUrl}
              alt={props.title}
              className="img-top rounded-0 mx-auto img-fluid"
              style={{ height: "350px" }}
            />
          </div>
        </Link>
        <div className="card-body p-0 pt-1">
          <p className="card-text m-1 opacity-50">{props.category}</p>
          <h5 className="card-title">{props.title}</h5>
          <span className="ms-1">EGP:{props.price}</span>
        </div>
      </div>
    </div>
  );
}

export default MyCard;
