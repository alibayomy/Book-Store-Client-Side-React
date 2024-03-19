import React, { useEffect, useState,useContext } from "react";
import ReviewForm from "./ReviewForm";
import { v4 as uuidv4 } from "uuid";
import Review from "./Review";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
// import React, { useContext } from "react";

function ReviewWrapper(props) {
  const [reviews, setReviews] = useState([]);
  const localhost='http://localhost:8000'
  const current_user=(useContext(AuthContext).user)!==null?(useContext(AuthContext).user.user_id):0
  const [rate, setRate] = useState(null);
  const getAllRates=(id,localhost='http://localhost:8000')=>{  
    axios.get(`${localhost}/rate/get-all-rates/${id}`)
  .then((res) => (console.log(res.data.data),setReviews(res.data.data),props.getNumOfReviews(res.data.data.length)))
  .catch((err) => console.log(err));}
  const [comment, setComment] = useState("");
  const [id,setId]=useState(0);

  // const [hover, setHover] = useState(null);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const book_name= useParams();
  // console.log(book_name);
  // useEffect(() => {
  //   console.log(reviews);
  // }, [reviews]);

  //   useEffect(() =>{
  //    axios.get(`${localhost}/rate/get-all-rates/${props.book_id}`)
  //   .then((res) => (console.log(res.data.data),setReviews(res.data.data)))
  //   .catch((err) => console.log(err));
  // }, []);

  const addReview = (rate, comment, name, email) => {
    console.log("rate: ",rate," comment: ",comment,"book id: ",props.book_id)
    const currentDate = new Date().toLocaleDateString();
    console.log(props.book_id)
    axios.post(`${localhost}/rate/create-rate/`, {
      review :comment,
      rate :rate,
      user:current_user,
      book:props.book_id},
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    .then((res) => (console.log(res.data),getAllRates(props.book_id)))
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
    .then((res) => (console.log(`${id} review has been deleted successfuly`),getAllRates(props.book_id)))
    .catch((err) => console.log(err));
  };

  const editReview = (id,rate, comment) => {
    // edit review function
    console.log(`Editing review with id ${id}`);
    axios.patch(`${localhost}/rate/update-rate/${id}`, {
      review :comment,
      rate :rate,
      user:current_user,
      book:props.book_id})
      .then((res) => (console.log(`${id} review has been deleted successfuly`),getAllRates(props.book_id)))
      .catch((err) => console.log(err));
      setId(0)
      setRate(0)
      setComment("")
  };
  const updateReviewForm=(id,rate, comment)=>{
    setId(id)
    setRate(rate)
    setComment(comment)
    console.log(id)
  }
  useEffect(()=>{
    getAllRates(props.book_id)
  },[])
  return (
    <div>
      {id?<ReviewForm addReview={addReview} editReview={editReview} id={id} coming_rate={rate} coming_comment={comment}/>:<ReviewForm addReview={addReview} editReview={editReview} id={0} coming_rate={0} coming_comment={""}/>}
      <div className="mb-3 fs-3">Reviews</div>
      {reviews.map((review, index) => (
        <Review
          key={review.id}
          date={review.creation_date.replaceAll("-"," ")}
          rate={review.rate}
          user={review.full_name}
          user_id={review.user}
          review={review.review}
          deleteReview={() => deleteReview(review.id)}
          updateReviewForm={() => updateReviewForm(review.id,review.rate,review.review)}
        />
      ))}
    </div>
  );
}

export default ReviewWrapper;
