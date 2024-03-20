import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useHistory } from 'react-router-dom';

function ReviewForm(props) {
  const current_user=(useContext(AuthContext).user)!==null?(useContext(AuthContext).user.user_id):0
  const history = useHistory();
  const [rate, setRate] = useState(0);
  const [hover, setHover] = useState(null);

  const [comment, setComment] = useState(props.coming_comment);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
useEffect(()=>{
  setRate(props.coming_rate)
  setComment(props.coming_comment)
},[props])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!current_user){
    history.push("/login");
    }
    else{
    props.id?props.editReview(props.id,rate, comment):props.addReview(rate, comment, name, email);
    setRate(null);
    setComment("");
    setName("");
    setEmail("");
    }
  };

  return (
    <div className="border-5">
      <div className="fs-3">Feel free to add your Review</div>
      <div>Required field are marked *</div>
      <form className="mt-3" onSubmit={handleSubmit}>
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
            className="d-block review-input"
            type="text"
            value={comment}
            placeholder="Enter Your Review"
            rows="1"
            style={{ width: "100%", resize: "none" }}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        {/* <div className="row mt-3">
          <div className="col-lg-6">
            Name *
            <input
              className="d-block review-input"
              type="text"
              required
              value={name}
              placeholder="Enter Your Name"
              rows="1"
              cols="50"
              style={{ width: "100%", resize: "none" }}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="col-lg-6 mt-2 mt-lg-0">
            Email *
            <input
              className="d-block review-input"
              type="email"
              required
              value={email}
              placeholder="Enter Your Email"
              rows="1"
              cols="50"
              style={{ width: "100%", resize: "none" }}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
        </div> */}
        <button className="outline-button mt-3" type="submit">
        {props.id!==0?"Update":"Submit"}
        </button>
        
      </form>
    </div>
  );
}

export default ReviewForm;
