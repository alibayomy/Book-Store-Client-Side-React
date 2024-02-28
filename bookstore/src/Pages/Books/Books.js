import React from "react";
import "./Books.css";
import { Link } from "react-router-dom";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
// import product1 from "../../images/author-book-store-book-cover-06.jpg";
// import product2 from "../../images/author-book-store-book-cover-07.jpg";
// import product3 from "../../images/author-book-store-book-cover-08.jpg";
// import product4 from "../../images/author-book-store-book-img-01.jpg";
import MyAllCards from "../../Components/MyAllCards/MyAllCards";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

// import MyCard from "../../Components/MyCard/MyCard";
function Books() {
  const BaseMainUrl = "https://api.themoviedb.org/3/movie/popular";
  const BaseAPI = "6883a4d02a15e877d54e507dbc703331";

  const history = useHistory();

  const [language, setLanguage] = useState("en");

  const [skipItem, setSkipItem] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const [Movies, setMovie] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${BaseMainUrl}?api_key=${BaseAPI}&page=${pageNumber}&language=${language}`
      )
      .then((res) => setMovie(res.data.results))
      .catch((err) => console.log(err));
  }, [pageNumber, skipItem, language]);

  const handelChangeLang = (e) => {
    setLanguage(e.target.value);
  };

  const fromPrice = useSelector((state) => state.fromPrice);
  const toPrice = useSelector((state) => state.toPrice);

  const dispatch = useDispatch();
  const fromPriceing = (e) => {
    dispatch({ type: "FROM_PRICE", payload: e.target.value });
  };

  const toPriceing = (e) => {
    dispatch({ type: "TO_PRICE", payload: e.target.value });
  };

  const previousPage = (pagNum) => {
    setPageNumber(--pagNum);
    if (pagNum == 1) {
      setSkipItem(0);
    } else if (pagNum == 2) {
      setSkipItem(25);
    } else if (pagNum == 3) {
      setSkipItem(50);
    } else if (pagNum == 4) {
      setSkipItem(75);
    }
  };

  const nextPage = (pagNum) => {
    setPageNumber(++pagNum);
    if (pagNum == 1) {
      setSkipItem(0);
    } else if (pagNum == 2) {
      console.log("yes in page 2");
      setSkipItem(25);
    } else if (pagNum == 3) {
      setSkipItem(50);
    } else if (pagNum == 4) {
      setSkipItem(75);
    }
  };

  // const allBooks = [
  //   // Replace with actual book data or fetch from an API
  //   {
  //     id: 1,
  //     title: "The Born of APLEX",
  //     category: "fantasy",
  //     imageUrl: `${product1}`,
  //     rating: 6,
  //     price: "$26.00",
  //   },
  //   {
  //     id: 2,
  //     title: "The Throned Mirror",
  //     category: "fantasy",
  //     imageUrl: `${product2}`,
  //     rating: 4,
  //     price: "$23.00",
  //   },
  //   {
  //     id: 3,
  //     title: "Ark Forging",
  //     category: "fantasy",
  //     imageUrl: `${product3}`,
  //     rating: 5,
  //     price: "$20.00",
  //   },
  //   {
  //     id: 4,
  //     title: "The Sons of the Empire",
  //     category: "fantasy",
  //     imageUrl: `${product4}`,
  //     rating: 2,
  //     price: "$20.00",
  //   },
  //   {
  //     id: 5,
  //     title: "The Sons of the Empire",
  //     category: "fantasy",
  //     imageUrl: `${product1}`,
  //     rating: 5,
  //     price: "$20.00",
  //   },
  //   {
  //     id: 6,
  //     title: "The Sons of the Empire",
  //     category: "fantasy",
  //     imageUrl: `${product3}`,
  //     rating: 4,
  //     price: "$20.00",
  //   },
  //   {
  //     id: 7,
  //     title: "The Sons of the Empire",
  //     category: "fantasy",
  //     imageUrl: `${product4}`,
  //     rating: 2,
  //     price: "$20.00",
  //   },
  //   {
  //     id: 8,
  //     title: "The Sons of the Empire",
  //     category: "fantasy",
  //     imageUrl: `${product1}`,
  //     rating: 5,
  //     price: "$20.00",
  //   },
  //   {
  //     id: 9,
  //     title: "The Sons of the Empire",
  //     category: "fantasy",
  //     imageUrl: `${product3}`,
  //     rating: 5,
  //     price: "$20.00",
  //   },
  //   {
  //     id: 10,
  //     title: "The Sons of the Empire",
  //     category: "fantasy",
  //     imageUrl: `${product1}`,
  //     rating: 5,
  //     price: "$20.00",
  //   },
  //   {
  //     id: 11,
  //     title: "The Sons of the Empire",
  //     category: "fantasy",
  //     imageUrl: `${product4}`,
  //     rating: 3,
  //     price: "$20.00",
  //   },
  //   {
  //     id: 12,
  //     title: "The Sons of the Empire",
  //     category: "fantasy",
  //     imageUrl: `${product1}`,
  //     rating: 5,
  //     price: "$20.00",
  //   },
  //   {
  //     id: 13,
  //     title: "The Sons of the Empire",
  //     category: "fantasy",
  //     imageUrl: `${product4}`,
  //     rating: 5,
  //     price: "$20.00",
  //   },
  //   {
  //     id: 14,
  //     title: "The Sons of the Empire",
  //     category: "fantasy",
  //     imageUrl: `${product3}`,
  //     rating: 1,
  //     price: "$20.00",
  //   },
  // ];

  return (
    <div>
      <ol className="breadcrumb mt-5 p-1 bg-body-tertiary shadow-sm">
        <li className="breadcrumb-item ms-2">
          <Link className="text-decoration-none text-dark" to="/">
            Home
          </Link>
        </li>
        <i class="bi bi-chevron-right mx-2"></i>
        <li className="breadcrumb-item active" aria-current="page">
          <Link className=" text-decoration-none text-dark" to="/books">
            Books
          </Link>
        </li>
      </ol>

      {/* dir={language === "ar" ? "rtl" : "ltr"} */}
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col-auto col-md-2 col-xl-2 px-sm-1 px-0 bg-dark myNav mt-4 m-1 rounded">
            <div class=" align-items-center align-items-sm-start px-2 pt-2 text-white min-vh-100">
              <a
                href="/books"
                class="d-flex align-items-center  mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <span
                  class="fs-5 d-none d-sm-inline"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Click To clear all filters"
                >
                  Filters
                </span>
              </a>
              <p className="m-0 p-0 border-0 ToClearFilter pb-2">
                click to remove all filters
              </p>
              <ul
                class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li>
                  <a
                    href="#submenu1"
                    data-bs-toggle="collapse"
                    class="nav-link px-0 align-middle"
                  >
                    <i class="fs-5 bi-translate text-white"></i>
                    <p
                      class="ms-1  d-none d-sm-inline text-white "
                      onClick={() => history.push("/filter")}
                    >
                      Books Language
                    </p>{" "}
                  </a>
                  <ul
                    class="collapse nav flex-column ms-1"
                    id="submenu1"
                    data-bs-parent="#menu"
                  >
                    <li>
                      <input
                        class="form-check-input mySmallCheckbox"
                        value="ar"
                        onChange={(e) => handelChangeLang(e)}
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label
                        class="form-check-label d-sm-inline mySmallText ms-1 "
                        for="flexRadioDefault1"
                      >
                        Arabic Books{" "}
                      </label>
                    </li>

                    <li>
                      <input
                        class="form-check-input mySmallCheckbox"
                        type="radio"
                        value="en"
                        onChange={(e) => handelChangeLang(e)}
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                      />

                      <label
                        class="form-check-label d-sm-inline mySmallText  ms-1"
                        for="flexRadioDefault2"
                      >
                        English Books{" "}
                      </label>
                    </li>
                    <li>
                      <input
                        class="form-check-input  mySmallCheckbox"
                        type="radio"
                        value="fr"
                        onChange={(e) => handelChangeLang(e)}
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                      />
                      <label
                        class="form-check-label ms-1 d-sm-inline mySmallText"
                        for="flexRadioDefault3"
                      >
                        French Books{" "}
                      </label>
                    </li>
                  </ul>
                </li>

                <hr
                  style={{ borderWidth: "2px", width: "100%" }}
                  className="my-1"
                />

                <li>
                  <a
                    href="#submenu3"
                    data-bs-toggle="collapse"
                    class="nav-link px-0 align-middle"
                  >
                    <i class="fs-5 bi-tags-fill text-white"></i>{" "}
                    <span
                      class="ms-1 d-none d-sm-inline text-white"
                      onClick={() => history.push("/filter")}
                    >
                      Categories
                    </span>{" "}
                  </a>

                  <ul
                    class="collapse nav flex-column ms-1"
                    id="submenu3"
                    data-bs-parent="#menu"
                  >
                    <li class="w-100">
                      <div class="form-check">
                        <label
                          class="form-check-label mySmallText"
                          for="flexRadioDefault3 "
                        >
                          Translated
                        </label>
                        <input
                          class="form-check-input mySmallCheckbox"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="flexRadioDefault3"
                        />
                      </div>
                    </li>
                    <li>
                      <div class="form-check">
                        <label
                          class="form-check-label mySmallText"
                          for="flexRadioDefault4"
                        >
                          Miscellaneous
                        </label>
                        <input
                          class="form-check-input mySmallCheckbox"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="flexRadioDefault4"
                        />
                      </div>
                      {/* <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 2</a> */}
                    </li>
                    <li>
                      <div class="form-check">
                        <label
                          class="form-check-label mySmallText"
                          for="flexRadioDefault5"
                        >
                          Business
                        </label>
                        <input
                          class="form-check-input mySmallCheckbox"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="flexRadioDefault5"
                        />
                      </div>
                      {/* <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 3</a> */}
                    </li>
                    <li>
                      <div class="form-check">
                        <label
                          class="form-check-label mySmallText"
                          for="flexRadioDefault6"
                        >
                          History
                        </label>
                        <input
                          class="form-check-input mySmallCheckbox"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="flexRadioDefault6"
                        />
                      </div>
                      {/* <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 4</a> */}
                    </li>
                    <li>
                      <div class="form-check">
                        <label
                          class="form-check-label mySmallText"
                          for="flexRadioDefault6"
                        >
                          Arabic Novels
                        </label>
                        <input
                          class="form-check-input mySmallCheckbox"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="flexRadioDefault6"
                        />
                      </div>
                    </li>
                    <li>
                      <div class="form-check">
                        <label
                          class="form-check-label mySmallText"
                          for="flexRadioDefault6"
                        >
                          Short Stories
                        </label>
                        <input
                          class="form-check-input mySmallCheckbox"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="flexRadioDefault6"
                        />
                      </div>
                    </li>
                    <li>
                      <div class="form-check">
                        <label
                          class="form-check-label mySmallText"
                          for="flexRadioDefault6"
                        >
                          Parenting
                        </label>
                        <input
                          class="form-check-input mySmallCheckbox"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="flexRadioDefault6"
                        />
                      </div>
                    </li>
                    <li>
                      <div class="form-check">
                        <label
                          class="form-check-label mySmallText"
                          for="flexRadioDefault6"
                        >
                          Comics
                        </label>
                        <input
                          class="form-check-input mySmallCheckbox"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="flexRadioDefault6"
                        />
                      </div>
                    </li>
                  </ul>
                </li>

                <hr
                  style={{ borderWidth: "2px", width: "100%" }}
                  className="my-1"
                />

                <li>
                  <a
                    href="#submenu4"
                    data-bs-toggle="collapse"
                    class="nav-link px-0 align-middle"
                  >
                    <i class="fs-5 bi-pencil-square text-white"></i>{" "}
                    <span
                      class="ms-1 d-none d-sm-inline text-white"
                      onClick={() => history.push("/filter")}
                    >
                      Publishers
                    </span>{" "}
                  </a>

                  <ul
                    class="collapse nav flex-column ms-1"
                    id="submenu4"
                    data-bs-parent="#menu"
                  >
                    <li class="w-100">
                      <div class="form-check">
                        <label
                          class="form-check-label mySmallText"
                          for="flexRadioDefault3 "
                        >
                          Book Juice
                        </label>
                        <input
                          class="form-check-input mySmallCheckbox"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="flexRadioDefault3"
                        />
                      </div>
                    </li>
                    <li>
                      <div class="form-check">
                        <label
                          class="form-check-label mySmallText"
                          for="flexRadioDefault4"
                        >
                          Bint Al-Zayat
                        </label>
                        <input
                          class="form-check-input mySmallCheckbox"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="flexRadioDefault4"
                        />
                      </div>
                      {/* <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 2</a> */}
                    </li>
                    <li>
                      <div class="form-check">
                        <label
                          class="form-check-label mySmallText"
                          for="flexRadioDefault5"
                        >
                          Arab Foundation
                        </label>
                        <input
                          class="form-check-input mySmallCheckbox"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="flexRadioDefault5"
                        />
                      </div>
                      {/* <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 3</a> */}
                    </li>
                    <li>
                      <div class="form-check">
                        <label
                          class="form-check-label mySmallText"
                          for="flexRadioDefault6"
                        >
                          Drawing
                        </label>
                        <input
                          class="form-check-input mySmallCheckbox"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="flexRadioDefault6"
                        />
                      </div>
                      {/* <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 4</a> */}
                    </li>
                    <li>
                      <div class="form-check">
                        <label
                          class="form-check-label mySmallText"
                          for="flexRadioDefault6"
                        >
                          Stoicism
                        </label>
                        <input
                          class="form-check-input mySmallCheckbox"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="flexRadioDefault6"
                        />
                      </div>
                    </li>
                    <li>
                      <div class="form-check">
                        <label
                          class="form-check-label mySmallText"
                          for="flexRadioDefault6"
                        >
                          Arabic literature
                        </label>
                        <input
                          class="form-check-input mySmallCheckbox"
                          type="checkbox"
                          name="flexRadioDefault"
                          id="flexRadioDefault6"
                        />
                      </div>
                    </li>
                  </ul>
                </li>

                <hr
                  style={{ borderWidth: "2px", width: "100%" }}
                  className="my-1"
                />
                <li>
                  <a
                    href="#submenu5"
                    data-bs-toggle="collapse"
                    class="nav-link px-0 align-middle"
                  >
                    <span class="text-white">(EGP)</span>{" "}
                    <span class="ms-1 d-none d-sm-inline text-white">
                      {" "}
                      Price
                    </span>{" "}
                  </a>

                  <ul
                    class="collapse nav flex-column ms-1"
                    id="submenu5"
                    data-bs-parent="#menu"
                  >
                    <li class="text-center ">
                      <div class="text-center">
                        <input
                          class="MyPriceInput p-1"
                          type="number"
                          id="flexRadioDefault111"
                          onChange={fromPriceing}
                          value={fromPrice}
                        />

                        <label class=" mx-2" for="flexRadioDefault113">
                          To
                        </label>

                        <input
                          class=" MyPriceInput p-1"
                          type="number"
                          onChange={toPriceing}
                          value={toPrice}
                          id="flexRadioDefault111"
                        />
                      </div>
                      <div class="text-center">
                        <button
                          class="form-check-label btn btn-outline-success mt-3"
                          for="flexRadioDefault13"
                          onClick={() => history.push("/filterPrice")}
                        >
                          check
                        </button>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div class="col py-3 ms-3">
            <div className="d-flex justify-content-between">
              <h2 className="section-heading mb-4">All Books</h2>
              <select className="books-sorting">
                <option value="">Default Sorting</option>
                <option value="">Sort by price</option>
                <option value="">sort by rating</option>
                <option value="">sort by sale</option>
              </select>
            </div>

            <div className="row">
              {Movies.map((book) => (
                <MyAllCards
                  key={book.id}
                  imageUrl={`https://image.tmdb.org/t/p/w500/${book.poster_path}`}
                  title={book.title}
                  category="action"
                  path={`viewbook/${book.id}`}
                  rating={book.vote_average.toFixed(2) - 3}
                  price={book.vote_count.toFixed(0)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div data-toggle="tooltip" data-placement="right" title="Back to top">
        <ScrollUpButton />
      </div>

      <ul class="pagination  justify-content-center m-3">
        {pageNumber > 1 ? (
          <li className="page-item">
            <button
              onClick={() => previousPage(pageNumber)}
              className="page-link"
            >
              Previous
            </button>
          </li>
        ) : (
          <li className="page-item">
            <button
              onClick={() => previousPage(pageNumber)}
              className="page-link disabled"
            >
              Previous
            </button>
          </li>
        )}
        {pageNumber >= 1 && pageNumber <= 3 ? (
          <li className="page-item">
            {" "}
            <button onClick={() => nextPage(pageNumber)} className="page-link">
              Next
            </button>
          </li>
        ) : (
          <li className="page-item">
            {" "}
            <button
              onClick={() => nextPage(pageNumber)}
              className="page-link disabled"
            >
              Next
            </button>
          </li>
        )}
      </ul>
      <Footer />
    </div>
  );
}

export default Books;
