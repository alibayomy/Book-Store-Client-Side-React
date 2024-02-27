import React from "react";
import "./RelatedProducts.css";
import related1 from "../../images/author-book-store-book-img-01.jpg";
import related2 from "../../images/author-book-store-book-img-02.jpg";
import related3 from "../../images/author-book-store-book-cover-08.jpg";
import MyCard from "../MyCard/MyCard";

function RelatedProducts() {
  const relatedProducts = [
    {
      id: 1,
      title: "The Sons of the Empire",
      category: "fantasy",
      imageUrl: `${related1}`,
      price: "$20.00",
    },
    {
      id: 2,
      title: "Mists of Algorab",
      category: "fantasy",
      imageUrl: `${related2}`,
      price: "$20.00",
    },
    {
      id: 3,
      title: "Ark Forging",
      category: "fantasy",
      imageUrl: `${related3}`,
      price: "$20.00",
    },
  ];

  return (
    <div>
      <section className="related-products-section">
        <div className="container">
          <h1 className="mt-5 mb-4">Related Products</h1>
          <div className="row">
            {relatedProducts.map((product) => (
              <MyCard
                key={product.id}
                imageUrl={product.imageUrl}
                title={product.title}
                category={product.category}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default RelatedProducts;
