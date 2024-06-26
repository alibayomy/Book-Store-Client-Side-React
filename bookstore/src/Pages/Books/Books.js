import React from "react";
import "./Books.css";
import { Link } from "react-router-dom";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import MyAllCards from "../../Components/MyAllCards/MyAllCards";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import useAxios from "../../Network/AxiosInstance";
import { Categories } from "../../Components/Filters/Categories";
import Filtering from "../../Components/ShoppingCart/testCard";

function Books() {

  const localhost = "http://localhost:8000";
  const history = useHistory();
  const [language, setLanguage] = useState("en");

  const [skipItem, setSkipItem] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [next,setNext]=useState(true)


  const [books, setBooks] = useState([])

  const [categories, setCategoris] = useState([])

  const [authors, setAuthors] = useState([])

  let api = useAxios()

  useEffect(() => {

    axios.get(`${localhost}/list-cateory/`)
      .then((res) => { setCategoris(res.data.results), console.log(res.data.results) })

    axios.get(`${localhost}/users/publisher-list/`)
      .then((response) => {
        const transformedAuthors = response.data.results.map(author => ({
          value: author.id,
          label: `${author.f_name} ${author.l_name}`
        }));
        console.log(transformedAuthors)
        setAuthors(transformedAuthors);
      })

    axios.get(`${localhost}/list-book/?page=${pageNumber}`)
      .then((res) => {
        console.log(res.data.results),
          setBooks(res.data.results),
          setNext(res.data.next),
          console.log(books);
      })
      .catch((err) => console.log(err));
  }, [pageNumber, skipItem, language]);

  // const handelChangeLang = (e) => {

  //   const getMoviesToSort = [...books];
  //   const LanguageBooks = books.filter((a) => { a.language.toUpperCase() === e.target.value.toUpperCase() });
  //   console.log(LanguageBooks, e.target.value);
  //   setBooks(LanguageBooks)
  // };

  const dispatch = useDispatch();

  const fromPrice = useSelector((state) => state.fromPrice);
  const toPrice = useSelector((state) => state.toPrice);

  const getMoviesToSort = [...books];
  console.log(getMoviesToSort);
  const priceBooks = getMoviesToSort.filter(
    (a) => a.price >= fromPrice + 1 && a.price <= toPrice + 1);

  const fromPriceing = (e) => {
    dispatch({ type: "FROM_PRICE", payload: e.target.value });
  };

  const toPriceing = (e) => {
    dispatch({ type: "TO_PRICE", payload: e.target.value });
  };

  const categorybooks = useSelector((state) => state.categoryFilter);

  const categoryBooks = books.filter((a) => a.category == categorybooks);

  const previousPage = (pagNum) => {
    setPageNumber(--pagNum);
  };

  const nextPage = (pagNum) => {
    setPageNumber(++pagNum);
  };

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
           <div className="col-auto col-md-2 col-xl-2 px-sm-1 px-0  myNav mt-3 m-1 rounded" style={{backgroundColor:'', height: '400px' , boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
            <div class=" align-items-center align-items-sm-start px-2 pt-2 text-dark min-vh-100">
              <Link
                to="/books"
                class="d-flex align-items-center  mb-md-0 me-md-auto text-dark text-decoration-none"
              >
                <span
                  class="fs-5 d-none d-sm-inline"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Click To clear all filters"
                >
                  Filters
                </span>
              </Link>
              <p className="m-0 p-0 border-0 ToClearFilter pb-2">
                click to remove all filters
              </p>
              <ul
                class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >

                {/* language */}
                {/* <li>
                  <a
                    href="#submenu1"
                    data-bs-toggle="collapse"
                    class="nav-link px-0 align-middle"
                  >
                    <i class="fs-5 bi-translate text-white"></i>
                    <p
                      class="ms-1  d-none d-sm-inline text-white "
                      onClick={() => history.push("/books")}
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
                        value="Arabic"
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
                        value="English"
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
                  </ul>
                </li> */}

                {/* <hr
                  style={{ borderWidth: "2px", width: "100%" }}
                  className="my-1"
                /> */}

                {/* Categories */}
                <li>
                  <a
                    href="#submenu3"
                    data-bs-toggle="collapse"
                    class="nav-link px-0 align-middle"
                  >
                    <i class="fs-5 bi-tags-fill text-dark"></i>{" "}
                    <span
                      class="ms-1 d-none d-sm-inline text-dark"
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
                    {categories.map((cat) => (
                      <div key={cat.value}>
                        <Categories
                          category={cat.label}
                          id={cat.value}
                        />
                      </div>
                    ))
                    }
                  </ul>
                </li>

                <hr
                  style={{ borderWidth: "2px", width: "100%" }}
                  className="my-1"
                />

                {/* Publishers */}
                <li>
                  <a
                    href="#submenu4"
                    data-bs-toggle="collapse"
                    class="nav-link px-0 align-middle"
                  >
                    <i class="fs-5 bi-pencil-square text-dark"></i>{" "}
                    <span
                      class="ms-1 d-none d-sm-inline text-dark"
                      onClick={() => history.push("/filterPublisher")}
                    >
                      Publishers
                    </span>{" "}
                  </a>

                  <ul
                    class="collapse nav flex-column ms-1"
                    id="submenu4"
                    data-bs-parent="#menu"
                  >
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
                    <span class="text-dark">(EGP)</span>{" "}
                    <span class="ms-1 d-none d-sm-inline text-dark">
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
                          class=" btn filled-button mt-3"
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
              {/* <select className="books-sorting">
                <option value="">Default Sorting</option>
                <option value="">Sort by price</option>
                <option value="">sort by rating</option>
                <option value="">sort by sale</option>
              </select> */}
            </div>

            <div className="row">

              <Filtering
                item={books}
              />

              {/* {books.map((book) => (
                <MyAllCards
                  key={book.id}
                  imageUrl={book.front_img}
                  title={book.name}
                  category={book.category_name}
                  path={`viewbook/${book.id}`}
                  rating="3"
                  price={book.price}
                  publisher={book.publisher}
                  quantity={book.total_number_of_book}
                  book_id={book.id}
                />
              ))} */}
            </div>
          </div>
        </div>
      </div>
      <div data-toggle="tooltip" data-placement="right" title="Back to top">
        <ScrollUpButton />
      </div>

      <ul className="pagination  justify-content-center m-3">
        {pageNumber > 1 ? (
          <li className="page-item">
            <button
              onClick={() => previousPage(pageNumber)}
              className="page-link "
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
        {next? (
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
    {/* <Footer /> */}
    </div>

  );
}

export default Books;
