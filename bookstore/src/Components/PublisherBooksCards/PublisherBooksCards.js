import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import useAxios from "../../Network/AxiosInstance";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function PublisherBooksCards(props) {
    console.log(props)
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

    return starIcons;
  };
  const history = useHistory()
  const api = useAxios()

  function deleteBook(e){
    api.delete(`/${props.id}-book/delete`)
    .then(history.push('/dashboard'))
    .catch((err)=> console.log(err))
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
            <Link to={`/publisher/updatebook/${props.id}`}> <button className="filled-button">Update data or Delete your book</button> </Link>
          </div>
        </div>
      </div>


    </div>
  );
}

export default PublisherBooksCards;
