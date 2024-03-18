import React, { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import { v4 as uuidv4 } from "uuid";
import Review from "./Review";
import axios from "axios";
import { useParams } from "react-router-dom";


function ReviewWrapper(props) {
  const [reviews, setReviews] = useState([]);
  const localhost='http://localhost:8000'
  // const book_name= useParams();
  // console.log(book_name);
  // useEffect(() => {
  //   console.log(reviews);
  // }, [reviews]);

    useEffect(() =>{
     axios.get(`${localhost}/rate/get-book-rates/${props.id}`)
    .then((res) => (console.log(res.data),setReviews(res.data)))
    .catch((err) => console.log(err));
  }, []);

  const addReview = (rate, comment, name, email) => {
    console.log("rate: ",rate," comment: ",comment,"book id: ",props.book_id)
    const currentDate = new Date().toLocaleDateString();
    console.log(props.book_id)
    axios.post(`${localhost}/rate/create-rate/`, {
      review :comment,
      rate :rate,
      user:1,
      book:props.book_id},
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
    // setReviews((prevReviews) => [
    //   ...prevReviews,
    //   {
    //     id: uuidv4(),
    //     rate,
    //     comment,
    //     name,
    //     email,
    //     date: currentDate,
    //   },
    // ]);
  };

  const deleteReview = (id) => {
    // http://127.0.0.1:8000/rate/delete-rate/7
    // setReviews(reviews.filter((review) => review.id !== id));
    axios.delete(`${localhost}/rate/delete-rate/${id}`)
    .then((res) => console.log(`${id} review has been deleted successfuly`))
    .catch((err) => console.log(err));
  };

  const editReview = (id) => {
    // edit review function
    console.log(`Editing review with id ${id}`);
    axios.patch(`${localhost}/rate/update-rate/${id}`, {
  name: 'John Doe',
  username: 'johndoe',
  email: 'johndoe@example.com'
})
  };

  return (
    <div>
      <ReviewForm addReview={addReview} />
      <div className="mb-3 fs-3">Reviews</div>
      {/* {reviews.map((review, index) => (
        <Review
          key={review.id}
          date={review.creation_date.replaceAll("-"," ")}
          rate={review.rate}
          user={review.user}
          review={review.comment}
          deleteReview={() => deleteReview(review.id)}
          editReview={() => editReview(review.id)}
        />
      ))} */}
    </div>
  );
}

export default ReviewWrapper;
