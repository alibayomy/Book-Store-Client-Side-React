import React, { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import { v4 as uuidv4 } from "uuid";
import Review from "./Review";

function ReviewWrapper() {
  const [reviews, setReviews] = useState([]);

  // useEffect(() => {
  //   console.log(reviews);
  // }, [reviews]);

  const addReview = (rate, comment, name, email) => {
    const currentDate = new Date().toLocaleDateString();
    setReviews((prevReviews) => [
      ...prevReviews,
      {
        id: uuidv4(),
        rate,
        comment,
        name,
        email,
        date: currentDate,
      },
    ]);
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const editReview = (id) => {
    // edit review function
    console.log(`Editing review with id ${id}`);
  };

  return (
    <div>
      <ReviewForm addReview={addReview} />

      {reviews.map((review, index) => (
        <Review
          key={review.id}
          date={review.date}
          rate={review.rate}
          user={review.name}
          review={review.comment}
          deleteReview={() => deleteReview(review.id)}
          editReview={() => editReview(review.id)}
        />
      ))}
    </div>
  );
}

export default ReviewWrapper;
