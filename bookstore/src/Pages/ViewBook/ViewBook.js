import React from "react";
import "./ViewBook.css";
import Footer from "../../Components/Footer/Footer";
import ProductDetails from "../../Components/ProductDetails/ProductDetails";
import RelatedProducts from "../../Components/RelatedProducts/RelatedProducts";
import Review from "../../Components/Review/Review";

function ViewBook() {
  return (
    <div>
      <ProductDetails />
      <Review />
      <RelatedProducts />
      <Footer />
    </div>
  );
}

export default ViewBook;
