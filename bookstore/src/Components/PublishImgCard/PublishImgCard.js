import React from "react";
import { Link } from "react-router-dom";

function PublishImgCard(props) {
  return (
    <div key={props.id} className="col-lg-3 col-md-6 mt-3 mb-4">
      <div className="card my-card bg-body-tertiary h-100 rounded-0 border-0">
        <Link to="/viewbook">
          <div class="d-flex p-3 mb-2">
            <img
              src={props.imageUrl}
              alt={props.title}
              className="img-top rounded-0 mx-auto img-fluid"
              style={{ height: "350px" }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PublishImgCard;
