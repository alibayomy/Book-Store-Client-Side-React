import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import ReviewCard from "./ReviewCard";

function ReviewSection() {
  const [rate, setRate] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div className="container">
      {/* Review card rendering */}
      {/* <div className=" container mb-3 fs-3">Reviews</div>
      <ReviewCard
        date={"09-22-2012"}
        rate={4}
        user={"alaa khaled"}
        review={
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum earum sed beatae saepe adipisci. Corporis."
        }
      /> */}
      <div className="border-5">
        <div className="fs-3">
          Be the first to review "the sons of the Empire"
        </div>
        <div>
          Your email address will not be published. Required field are marked *
        </div>
        <form className="mt-3">
          <span>Your rating *</span>
          <span className="ms-3">
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <i
                  value={currentRating}
                  onClick={() => {
                    rate != currentRating
                      ? setRate(currentRating)
                      : setRate(null);
                  }}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                >
                  {currentRating <= (hover || rate) ? (
                    <FontAwesomeIcon
                      className="cool-text"
                      icon={solidStar}
                      size="lg"
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="cool-text"
                      icon={regularStar}
                      size="lg"
                    />
                  )}
                </i>
              );
            })}
          </span>
          <div className="mt-3">
            Your review *
            <textarea
              className="d-block"
              rows="4"
              style={{ width: "100%", resize: "none" }}
            ></textarea>
          </div>
          <div className="row mt-3">
            <div className="col-lg-6">
              Name *
              <textarea
                className="d-block"
                rows="2"
                cols="50"
                style={{ width: "100%", resize: "none" }}
              ></textarea>
            </div>
            <div className="col-lg-6">
              Email *
              <textarea
                className="d-block"
                rows="2"
                cols="50"
                style={{ width: "100%", resize: "none" }}
              ></textarea>
            </div>
          </div>
          <br />
          <button
            // type="button"
            className="outline-button mt-3"
            type="supmit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewSection;
