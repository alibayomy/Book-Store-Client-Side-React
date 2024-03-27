import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import useAxios from "../../Network/AxiosInstance";
import { AuthContext } from "../../Context/AuthContext";
import "./MyAllCards.css"
import { useSelector, useDispatch } from "react-redux";

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

  const dispatch = useDispatch();
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
      .then((res) => {
        console.log(res.data.cart.cart_items), setCart(res.data.cart.cart_items),
          dispatch({ type: "CART_COUNTER", payload: res.data.cart.cart_items.length })
      })
      .catch((err) => console.log(err));
  }

  return (
    <div key={props.id} className="col-xl-4 col-lg-4 col-md-6 mt-3 mb-4" >

      {
        props.quantity == 0 ?
          (
            <>
              <div disabled className="card my-card bg-body-tertiary position-relative h-100 rounded-0 border-0 bg-opacity-10">

                <div className="font-weight-bold z-3  position-absolute  top-50 fs-2 font-weight-normal
                          w-100 p-3 bg-warning  align-items-center  text-center ">
                  <span>Out Of Stock</span>
                </div>
                <div class="d-flex p-3 mb-2">
                  <img
                    src={props.imageUrl}
                    alt={props.title}
                    className="img-top rounded-0 mx-auto img-fluid"
                    style={{ height: "350px" }}
                  />
                </div>
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
                    <button type="button" class="filled-button btn-lg" disabled>Add to Cart</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="card my-card bg-body-tertiary h-100 rounded-0 border-0">
              <Link to={props.path} className="text-decoration-none">
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

                {/* Rating */}
                <div className="d-flex align-items-center">
                  <span className="ms-1 fs-5 me-1">Rating:</span>
                  {renderRatingStars()}
                </div>
                <div className="d-flex justify-content-between">
                  {/* Price */}
                  <span className="ms-1 mt-3 fs-5">EGP: {props.price}</span>

                  {/* Add to Cart Button */}
                  {
                    props.publisher === user.user_id ?
                      <p>Remaining Quantity: <span> {props.quantity}</span></p>
                      :
                      <button className="filled-button"
                      onClick={() => onAddClicked(props.book_id, props.publisher, 1)}>
                      Add to Cart</button>
                  }
                 
                </div>
              </div>
            </div>
          )
      }

    </div>
  );
}

export default MyAllCards;
