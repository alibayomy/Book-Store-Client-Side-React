import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import person from "../../images/person.jpg";
import { AuthContext } from "../../Context/AuthContext";
import { useState } from "react";


function Review(props) {

  const current_user=(useContext(AuthContext).user)!==null?(useContext(AuthContext).user.user_id):0
  return (
    <div key={props.id} className="container px-lg-5 px-md-2 px-sm-0 mb-4">
      {/* <div className="mb-3 fs-3">Reviews</div> */}
      <div className="card w-100 border border-1 p-2 bg-light px-4">
        <div className="d-flex align-items-top">
          <img
            className="card-img rounded-circle border border-2 mt-3 me-3 p-1 border-success align-middle"
            style={{ height: "4rem", width: "4rem" }}
            src={person}
            alt="User"
          />
          <div className="d-inline-block my-lg-2 pt-1 mx-2">
            <div className="mt-1 fw-bold fs-5 pb-0 mb-0">{props.user}</div>
            <div className="text-dark-emphasis fs-5 pt-0 mt-0">
              {props.date}
            </div>
          </div>
          <div className="ms-auto mt-3">
          {props.user_id===current_user&&<FontAwesomeIcon
              className="me-3"
              role="button"
              icon={faPenToSquare}
              size="lg"
              onClick={props.updateReviewForm}
            />}
            {props.user_id===current_user&&<FontAwesomeIcon
              role="button"
              icon={faTrash}
              size="lg"
              onClick={props.deleteReview}
            />}
          </div>
        </div>
        <div>
          <div className="card-body">
            <div className="mb-2">
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <i
                    className={
                      currentRating <= props.rate
                        ? "mb-1 bi bi-star-fill cool-text"
                        : "bi bi-star mb-1 cool-text"
                    }
                  ></i>
                );
              })}
            </div>
            <p className="text-dark-emphasis">{props.review}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
