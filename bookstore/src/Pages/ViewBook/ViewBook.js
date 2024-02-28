import React from "react";
import "./ViewBook.css";
import Footer from "../../Components/Footer/Footer";
import ProductDetails from "../../Components/ProductDetails/ProductDetails";
import RelatedProducts from "../../Components/RelatedProducts/RelatedProducts";
import DescriptionReview from "../../Components/DescriptionReview/DescriptionReview";

function ViewBook() {
  return (
    <div>
      <ProductDetails />
      <DescriptionReview />
      <RelatedProducts />
      <Footer />
    </div>
  );
}

export default ViewBook;
