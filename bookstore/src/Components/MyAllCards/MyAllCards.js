import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import useAxios from "../../Network/AxiosInstance";
import { AuthContext } from "../../Context/AuthContext";

function MyAllCards(props) {

  const renderRatingStars = () => {
    const rating = props.rating || 0;
    const starIcons = [];

    for (let i = 1; i <= 5; i++) {
      starIcons.push(
        <FontAwesomeIcon
          key={i}
          icon={i <= rating ? solidStar : regularStar}
          className="ms-1 mt-1 cool-text"
        />
      );
    }
  }

  let api = useAxios();
  const localhost = 'http://localhost:8000'
  const [cart, setCart] = useState([])
  const { user } = useContext(AuthContext);
  const current_user = (useContext(AuthContext).user) !== null ? (useContext(AuthContext).user.user_id) : 0

  const onAddClicked = (item_id, publisher_id, total_quantity) => {

    api.post(`${localhost}/api-order/${current_user}/cart`, {
      book_id: item_id,
      CustomPublisher_id: publisher_id,
      total_number_of_book: total_quantity,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => { console.log(res.data.cart.cart_items), setCart(res.data.cart.cart_items) })
      .catch((err) => console.log(err));
  }

  return (
    <div key={props.id} className="col-xl-4 col-lg-4 col-md-6 mt-3 mb-4">
      <div className="card my-card bg-body-tertiary h-100 rounded-0 border-0">
        <Link to={props.path} className="text-decoration-none">
          <img
            src={props.imageUrl}
            alt={props.title}
            className="card-img-top rounded-0"
          />
        </Link>
        <div className="card-body p-0 pt-1">
          <p className="card-text m-1 opacity-50">{props.category}</p>
          <h5 className="card-title">{props.title}</h5>

          {/* Rating */}
          <div className="d-flex align-items-center">
            <span className="ms-1 fs-5 me-1">Rating:</span>
            {renderRatingStars()}
          </div>
          <div className="d-flex justify-content-between">
            {/* Price */}
            <span className="ms-1 mt-3 fs-5">EGP: {props.price}</span>

            {/* Add to Cart Button */}
            <button className="filled-button"
              onClick={() => onAddClicked(props.book_id, props.publisher, props.quantity)}>
              Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAllCards;
