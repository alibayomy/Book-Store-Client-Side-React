import React from "react";
import { Link } from "react-router-dom";

function PublishImgCard(props) {
  return (
    <div key={props.id} className="col-lg-3 col-md-6 mt-3 mb-4">
      <div className="card my-card bg-body-tertiary h-100 rounded-0 border-0">
        <Link to="/viewbook">
          <img
            src={props.imageUrl}
            alt={props.title}
            className="card-img-top rounded-0"
          />
        </Link>
      </div>
    </div>
  );
}

export default PublishImgCard;
