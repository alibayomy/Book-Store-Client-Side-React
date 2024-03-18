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
  const book_name=useParams().book_slug;
  const localhost='http://localhost:8000'
  useEffect(() => {
    axios
      .get(
        `${localhost}/${book_name}-book/details`
      )
      .then((res) =>(setBook(res.data.book)))
      .catch((err) => console.log(err));
  }, []);
  console.log(book.id)
  return (
    <div>
      <ProductDetails book={book}/>
      <DescriptionReview book_id={book.id}/>
      <RelatedProducts />
      <Footer />
    </div>
  );
}

export default ViewBook;
