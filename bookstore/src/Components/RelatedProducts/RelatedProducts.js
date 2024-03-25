import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./RelatedProducts.css";
// import related1 from "../../images/author-book-store-book-img-01.jpg";
// import related2 from "../../images/author-book-store-book-img-02.jpg";
// import related3 from "../../images/author-book-store-book-cover-08.jpg";
import MyCard from "../MyCard/MyCard";

function RelatedProducts(props) {
  // const relatedProducts = [
  //   {
  //     id: 1,
  //     title: "The Sons of the Empire",
  //     category: "fantasy",
  //     imageUrl: `${related1}`,
  //     price: "$20.00",
  //   },
  //   {
  //     id: 2,
  //     title: "Mists of Algorab",
  //     category: "fantasy",
  //     imageUrl: `${related2}`,
  //     price: "$20.00",
  //   },
  //   {
  //     id: 3,
  //     title: "Ark Forging",
  //     category: "fantasy",
  //     imageUrl: `${related3}`,
  //     price: "$20.00",
  //   },
  // ];

  const [related, setRelated] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/${props.book_id}/related-books/`)
      .then((res) => setRelated(res.data))
      .catch((err) => setError(err.message));
  }, [props.book_id]);

  return (
    <div>
      <section className="related-products-section">
        <div className="container">
          <h1 className="mt-5 mb-4">Related Books</h1>
          <div className="row">
            {related.map((book) => (
              <MyCard
                key={book.id}
                imageUrl={`http://127.0.0.1:8000${book.front_img}`}
                title={book.name}
                category={book.category_name}
                path={`/viewbook/${book.id}`}
                price={book.price}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default RelatedProducts;
