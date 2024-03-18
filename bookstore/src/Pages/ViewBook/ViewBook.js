import React from "react";
import "./ViewBook.css";
import Footer from "../../Components/Footer/Footer";
import ProductDetails from "../../Components/ProductDetails/ProductDetails";
import RelatedProducts from "../../Components/RelatedProducts/RelatedProducts";
import DescriptionReview from "../../Components/DescriptionReview/DescriptionReview";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ViewBook() {
  const [book_id,setBookId]=useState(1);
  const [book,setBook]=useState({})
  const [price,setPrice] = useState(0);
  const [amount, setAmount] = useState(1);
  const [reviews, setReviews] = useState([]);
  const book_name=useParams().book_slug;
  const localhost='http://localhost:8000'
  const getAllRates=(id,localhost='http://localhost:8000')=>{  
    axios.get(`${localhost}/rate/get-all-rates/${id}`)
  .then((res) => (console.log(res.data.data),setReviews(res.data.data)))
  .catch((err) => console.log(err));}
  useEffect(() => {
     axios
      .get(
        `${localhost}/${book_name}-book/details`
      )
      .then((res) =>(setBook(res.data.book),getAllRates(res.data.book.id)))
      .catch((err) => console.log(err));   
  }, []);
  // console.log(book.id)
  return (
    <div>
      <ProductDetails book={book}/>
      <DescriptionReview book_id={book.id} reviews={reviews}/>
      <RelatedProducts />
      <Footer />
    </div>
  );
}

export default ViewBook;
