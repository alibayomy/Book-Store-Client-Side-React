import React from "react";
import "./ViewBook.css";
import Footer from "../../Components/Footer/Footer";
import ProductDetails from "../../Components/ProductDetails/ProductDetails";
import RelatedProducts from "../../Components/RelatedProducts/RelatedProducts";
import DescriptionReview from "../../Components/DescriptionReview/DescriptionReview";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useAxios from "../../Network/AxiosInstance";

function ViewBook() {
  const [book_id, setBookId] = useState(1);
  const [book, setBook] = useState({});
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(1);
  const [noOfReviews, setNoOfReviews] = useState(0);
  const book_name = useParams().id;
  const localhost = "http://localhost:8000";
  // const getAllRates=(id,localhost='http://localhost:8000')=>{
  //   axios.get(`${localhost}/rate/get-all-rates/${id}`)
  // .then((res) => (console.log(res.data.data),setReviews(res.data.data)))
  // .catch((err) => console.log(err));}
  // const getNumOfReviews=(number)=>{
  //   setNoOfReviews(number)
  // }

  let api = useAxios();
  const getAllRates = (id, localhost = "http://localhost:8000") => {
    api
      .get(`${localhost}/rate/get-all-rates/${id}`)
      .then(
        (res) => (
          console.log(res.data.data), setNoOfReviews(res.data.data.length)
        )
      )
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get(`${localhost}/${book_name}-book/details`)
      .then((res) => setBook(res.data.book))
      .catch((err) => console.log(err));
  }, []);
  console.log(noOfReviews);
  console.log(book);
  return (
    <div>
      <ProductDetails book={book} />
      <DescriptionReview book_id={book?.id} disc={book?.description} />
      <RelatedProducts />
    </div>
  );
}

export default ViewBook;
