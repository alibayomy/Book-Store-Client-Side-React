import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MyAllCards from "../../Components/MyAllCards/MyAllCards";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fromPrice } from "../../Store/Actions/CheckPriceAction";

function Books() {
  const BaseMainUrl = "https://api.themoviedb.org/3/search/movie";
  const BaseAPI = "6883a4d02a15e877d54e507dbc703331";

  const history = useHistory();

  const [searchResults, setSearchResults] = useState("Popular");

  const [skipItem, setSkipItem] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const [Movies, setMovie] = useState([]);

  useEffect(() => {
    axios
      .get(`${BaseMainUrl}?api_key=${BaseAPI}&query=${searchResults}`)
      .then((res) => setMovie(res.data.results))
      .catch((err) => console.log(err));
  }, [pageNumber, skipItem, searchResults]);

  const handelChangeLang = (e) => {
    setSearchResults(e.target.value);
  };

  const fromPrice = useSelector((state) => state.fromPrice);
  const toPrice = useSelector((state) => state.toPrice);

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

  const myWord = useSelector((state) => state.fromPrice);
  console.log("from price", myWord);

  const myWord1 = useSelector((state) => state.toPrice);
  console.log("to price", myWord1);
  const dispatch = useDispatch();

  const fromPriceing = (e) => {
    dispatch({ type: "FROM_PRICE", payload: e.target.value });
  };

  const toPriceing = (e) => {
    dispatch({ type: "TO_PRICE", payload: e.target.value });
  };

  return (
    <div className="">
      <ol className="breadcrumb mt-5 p-1 bg-secondary ">
        <li className="breadcrumb-item ms-3">
          <Link className="text-muted text-decoration-none" to="/">
            Home
          </Link>
        </li>
        <i className="bi bi-chevron-right mx-2"></i>
        <li className="breadcrumb-item active " aria-current="page">
          <Link className="text-decoration-none text-light" to="/books">
            Books
          </Link>
        </li>
      </ol>

      {/* dir={language === "ar" ? "rtl" : "ltr"} */}
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-2 col-xl-2 px-sm-1 px-0 bg-dark myNav mt-4 m-1 rounded">
            <div className=" align-items-center align-items-sm-start px-2 pt-2 text-white min-vh-100">
              <a
                href="/books"
                className="d-flex align-items-center mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <span
                  className="fs-5 d-none d-sm-inline"
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

              <hr
                style={{ borderWidth: "2px", width: "100%" }}
                className="my-1"
              />
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li>
                  <a
                    href="#submenu1"
                    data-bs-toggle="collapse"
                    className="nav-link px-0 align-middle"
                  >
                    <i className="fs-5 bi-translate text-white"></i>
                    <p
                      className="ms-1  d-none d-sm-inline text-white "
                      onClick={() => history.push("/filter")}
                    >
                      Books Language
                    </p>{" "}
                  </a>

                  <ul
                    className="collapse show nav flex-column ms-1"
                    id="submenu1"
                    data-bs-parent="#menu"
                  >
                    <li>
                      <input
                        className="form-check-input mySmallCheckbox"
                        value="Arabic"
                        onChange={(e) => handelChangeLang(e)}
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label
                        className="form-check-label d-sm-inline mySmallText ms-1 "
                        for="flexRadioDefault1"
                      >
                        Arabic Books{" "}
                      </label>
                    </li>

                    <li>
                      <input
                        className="form-check-input mySmallCheckbox"
                        type="radio"
                        value="english"
                        onChange={(e) => handelChangeLang(e)}
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                      />

                      <label
                        className="form-check-label d-sm-inline mySmallText  ms-1"
                        for="flexRadioDefault2"
                      >
                        English Books{" "}
                      </label>
                    </li>
                    <li>
                      <input
                        className="form-check-input  mySmallCheckbox"
                        type="radio"
                        value="action"
                        onChange={(e) => handelChangeLang(e)}
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                      />
                      <label
                        className="form-check-label ms-1 d-sm-inline mySmallText"
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
                    className="nav-link px-0 align-middle"
                  >
                    <i className="fs-5 bi-tags-fill text-white"></i>{" "}
                    <span
                      className="ms-1 d-none d-sm-inline text-white"
                      onClick={() => history.push("/filter")}
                    >
                      Categories
                    </span>{" "}
                  </a>

                  <ul
                    className="collapse nav flex-column ms-1"
                    id="submenu3"
                    data-bs-parent="#menu"
                  >
                    <li>
                      <input
                        className="form-check-input rounded h-50 my-1 p-1 w-100"
                        type="search"
                        placeholder="search here"
                        onChange={(e) => handelChangeLang(e)}
                        name="flexRadioDefault"
                        id="flexRadioDefaul"
                      ></input>
                    </li>
                    <li className="w-100">
                      <div className="form-check">
                        <label
                          className="form-check-label mySmallText"
                          for="flexRadioDefault4"
                        >
                          Translated
                        </label>
                        <input
                          className="form-check-input mySmallCheckbox"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault4"
                          onChange={(e) => handelChangeLang(e)}
                          value="Translated"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="form-check">
                        <label
                          className="form-check-label mySmallText"
                          for="flexRadioDefault5"
                        >
                          Miscellaneous
                        </label>
                        <input
                          className="form-check-input mySmallCheckbox"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault5"
                          onChange={(e) => handelChangeLang(e)}
                          value="Miscellaneous"
                        />
                      </div>
                      {/* <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 2</a> */}
                    </li>
                    <li>
                      <div className="form-check">
                        <label
                          className="form-check-label mySmallText"
                          for="flexRadioDefault6"
                        >
                          Business
                        </label>
                        <input
                          className="form-check-input mySmallCheckbox"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault6"
                          onChange={(e) => handelChangeLang(e)}
                          value="Business"
                        />
                      </div>
                      {/* <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 3</a> */}
                    </li>
                    <li>
                      <div className="form-check">
                        <label
                          className="form-check-label mySmallText"
                          for="flexRadioDefault7"
                        >
                          History
                        </label>
                        <input
                          className="form-check-input mySmallCheckbox"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault7"
                          onChange={(e) => handelChangeLang(e)}
                          value="History"
                        />
                      </div>
                      {/* <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 4</a> */}
                    </li>
                    <li>
                      <div className="form-check">
                        <label
                          className="form-check-label mySmallText"
                          for="flexRadioDefault8"
                        >
                          Arabic Novels
                        </label>
                        <input
                          className="form-check-input mySmallCheckbox"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault8"
                          onChange={(e) => handelChangeLang(e)}
                          value="arabic no"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="form-check">
                        <label
                          className="form-check-label mySmallText"
                          for="flexRadioDefault9"
                        >
                          Short Stories
                        </label>
                        <input
                          className="form-check-input mySmallCheckbox"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault9"
                          onChange={(e) => handelChangeLang(e)}
                          value="Short Stories"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="form-check">
                        <label
                          className="form-check-label mySmallText"
                          for="flexRadioDefault10"
                        >
                          Parenting
                        </label>
                        <input
                          className="form-check-input mySmallCheckbox"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault10"
                          onChange={(e) => handelChangeLang(e)}
                          value="Parenting"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="form-check">
                        <label
                          className="form-check-label mySmallText"
                          for="flexRadioDefault11"
                        >
                          Comics
                        </label>
                        <input
                          className="form-check-input mySmallCheckbox"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault11"
                          onChange={(e) => handelChangeLang(e)}
                          value="Comics"
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
                    className="nav-link px-0 align-middle"
                  >
                    <i className="fs-5 bi-pencil-square text-white"></i>{" "}
                    <span
                      className="ms-1 d-none d-sm-inline text-white"
                      onClick={() => history.push("/filter")}
                    >
                      Publishers
                    </span>{" "}
                  </a>

                  <ul
                    className="collapse nav flex-column ms-1"
                    id="submenu4"
                    data-bs-parent="#menu"
                  >
                    <li>
                      <input
                        className="form-check-input rounded h-50 my-1 p-1 w-100"
                        type="search"
                        placeholder="search here"
                        onChange={(e) => handelChangeLang(e)}
                        name="flexRadioDefault"
                        id="flexRadioDefaul"
                      ></input>
                    </li>

                    <li>
                      <div className="form-check">
                        <label
                          className="form-check-label mySmallText"
                          for="flexRadioDefault113"
                        >
                          Book Juice
                        </label>
                        <input
                          className="form-check-input mySmallCheckbox"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault113"
                          onChange={(e) => handelChangeLang(e)}
                          value="book"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="form-check">
                        <label
                          className="form-check-label mySmallText"
                          for="flexRadioDefault13"
                        >
                          Bint Al-Zayat
                        </label>
                        <input
                          className="form-check-input mySmallCheckbox"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault13"
                          onChange={(e) => handelChangeLang(e)}
                          value="zayat"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="form-check">
                        <label
                          className="form-check-label mySmallText"
                          for="flexRadioDefault14"
                        >
                          Arab Foundation
                        </label>
                        <input
                          className="form-check-input mySmallCheckbox"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault14"
                          onChange={(e) => handelChangeLang(e)}
                          value="Foundation"
                        />
                      </div>
                      {/* <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 3</a> */}
                    </li>
                    <li>
                      <div className="form-check">
                        <label
                          className="form-check-label mySmallText"
                          for="flexRadioDefault15"
                        >
                          Drawing
                        </label>
                        <input
                          className="form-check-input mySmallCheckbox"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault15"
                          onChange={(e) => handelChangeLang(e)}
                          value="Drawing"
                        />
                      </div>
                      {/* <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 4</a> */}
                    </li>
                    <li>
                      <div className="form-check">
                        <label
                          className="form-check-label mySmallText"
                          for="flexRadioDefault16"
                        >
                          Stoicism
                        </label>
                        <input
                          className="form-check-input mySmallCheckbox"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault16"
                          onChange={(e) => handelChangeLang(e)}
                          value="Stoi"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="form-check">
                        <label
                          className="form-check-label mySmallText"
                          for="flexRadioDefault17"
                        >
                          Arabic literature
                        </label>
                        <input
                          className="form-check-input mySmallCheckbox"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault17"
                          onChange={(e) => handelChangeLang(e)}
                          value="literature"
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
                    className="nav-link px-0 align-middle"
                  >
                    <span className="text-white">(EGP)</span>{" "}
                    <span className="ms-1 d-none d-sm-inline text-white">
                      {" "}
                      Price
                    </span>{" "}
                  </a>

                  <ul
                    className="collapse nav flex-column ms-1"
                    id="submenu5"
                    data-bs-parent="#menu"
                  >
                    <li className="text-center ">
                      <div className="text-center">
                        <input
                          className="MyPriceInput p-1"
                          type="number"
                          id="flexRadioDefault111"
                          onChange={fromPriceing}
                          value={fromPrice}
                        />

                        <label className=" mx-2" for="flexRadioDefault113">
                          To
                        </label>

                        <input
                          className=" MyPriceInput p-1"
                          type="number"
                          onChange={toPriceing}
                          value={toPrice}
                          id="flexRadioDefault111"
                        />
                      </div>
                      <div className="text-center">
                        <button
                          className="form-check-label btn btn-outline-success mt-3"
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

          <div className="col py-3">
            <h2 className="section-heading mb-4">Your Filters</h2>
            <div className="row">
              {Movies.map((book) => {
                return (
                  <MyAllCards
                    key={book.id}
                    imageUrl={`https://image.tmdb.org/t/p/w500/${book.poster_path}`}
                    title={book.title}
                    category="action"
                    path={`viewbook/${book.id}`}
                    rating={book.vote_average.toFixed(2) - 3}
                    price={book.vote_count.toFixed(0)}
                  />
                );
              })}
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
    </div>
  );
}

export default Books;
