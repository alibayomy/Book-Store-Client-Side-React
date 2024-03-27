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
  const [book, setBook] = useState({})
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(1);
  const [noOfReviews, setNoOfReviews] = useState(0);
  const book_name = useParams().id;
  const localhost = 'http://localhost:8000'
  // const getAllRates=(id,localhost='http://localhost:8000')=>{  
  // const getAllRates=(id,localhost='http://localhost:8000')=>{
  //   axios.get(`${localhost}/rate/get-all-rates/${id}`)
  // .then((res) => (console.log(res.data.data),setReviews(res.data.data)))
  // .catch((err) => console.log(err));}
  // const getNumOfReviews=(number)=>{
  //   setNoOfReviews(number)
  // }

  let api = useAxios()
  useEffect(() => {
    api
      .get(`${localhost}/rate/get-all-rates/${book_name}`)
      .then(
        (res) => (
          console.log(res.data.data), setNoOfReviews(res.data.data.length)
        )
      )
      .catch((err) => console.log(err));
    axios
      .get(`${localhost}/${book_name}-book/details`)
      .then((res) => setBook(res.data.book))
      .catch((err) => console.log(err));
  }, []);
  console.log(noOfReviews);
  console.log(book);
  console.log(book.id);
  return (
    <div>
      <ProductDetails
        book={book}
        price={book.price}
        publisher={book.publisher}
        quantity={book.total_number_of_book}
        book_id={book.id}
      />
      <DescriptionReview book_id={book?.id} disc={book?.description} />
      <RelatedProducts book_id={book.id} />
      <Footer />
    </div>
  );
}

export default ViewBook;
