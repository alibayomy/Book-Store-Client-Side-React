import React, { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { search } from "../../Store/Actions/CheckPriceAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import DropdownButton from "../DropdownButton/DropdownButton";
import { ShoppingCart } from "../ShoppingCart/ShoppingCart";
import { Offcanvas, Stack } from "react-bootstrap";
import axios from "axios";
import useAxios from "../../Network/AxiosInstance";

function NavBar() {
  const history = useHistory();
  let api = useAxios();
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const current_user =
    useContext(AuthContext).user !== null
      ? useContext(AuthContext).user.user_id
      : 0;
  const goBack = () => {
    history.goBack(); // Go back to the previous page
  };
  const dispatch = useDispatch();
  const [searchInputField, setSearchInputField] = useState("");
  const setSearchWord = (word) => {
    console.log(word)
    setSearchInputField(word)
    dispatch(search(word));
    word?history.push("/search"):history.push('/books')
  };
  // useEffect(() => {
  //   if (!searchInputField) {
  //     setSearchWord();
  //   }
  // }, [searchInputField]);
  let myName = useContext(AuthContext);

  // for Cart
  const localhost = "http://localhost:8000";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const hundleOnDelete = (item_id) => {
    api
      .delete(`${localhost}/api-order/${current_user}/cart`, {
        data: { cart_item_id: item_id },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data.msg), setBooks(res.data.cart.cart_items);
      })
      .catch((err) => console.log(err));
    console.log(item_id);
  };

  useEffect(() => {
    api
      .get(`${localhost}/api-order/${current_user}/cart`)
      .then((res) => {
        console.log(res.data.cart.cart_items),
          setBooks(res.data.cart.cart_items);
      })
      .catch((err) => console.log(err));
  }, [show]);

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary sticky-top shadow-sm"
      style={{ height: "80px" }}
    >
      {/* for Cart */}
      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <hr style={{ borderWidth: "2px", width: "100%" }} className="my-1" />
        <Offcanvas.Body>
          <Stack gap={1}>
            {books.map((book) => (
              <div key={book.id}>
                <ShoppingCart
                  imageUrl={`${localhost}/${book.book.front_img}`}
                  title={book.book.name}
                  price={book.book.price}
                  onDeleteClicked={() => hundleOnDelete(book.id)}
                  book_id={book.book.id}
                  publisher_id={book.book.publisher}
                  total_books={book.book.total_number_of_book}
                  quantity={book.quantity}
                />
              </div>
            ))}

            {books.length === 0 ? (
              <h4 className="empty-text">Your basket is currently empty </h4>
            ) : (
              <div>
                <div className="my-4 fw-bold fs-5 ">Subtotal:</div>

                <button
                  className="outline-button my-1 w-100 books-sorting"
                  onClick={() => {
                    history.push("/cart");
                    setShow(false);
                  }}
                >
                  <h5>View Cart</h5>
                </button>

                <button
                  className="outline-button my-1 w-100 books-sorting"
                  onClick={() => {
                    history.push("/checkout");
                    setShow(false);
                  }}
                >
                  <h5>Checkout</h5>
                </button>
              </div>
            )}
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="container">
        <Link className="navbar-brand" to="/">
          BookStore
        </Link>
        <span
          className="ms-5 border-0 order-lg-1 ms-auto me-4 cool-text"
          id="basket-shopping"
          style={{ cursor: "pointer" }}
        >
          {user ? (
            <div className="d-flex align-items-center">
              <span className="me-4" onClick={handleShow}>
                <div className="">
                  <span className="me-3">EGP 0.00</span>
                  <FontAwesomeIcon icon={faBasketShopping} size="lg" />
                  <span class="position-absolute ms-1 fs-7 translate-middle badge rounded-pill bg-danger">
                    {books.length}
                  </span>
                </div>
              </span>
              <DropdownButton />
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <Link className="nav-link me-3 text-dark" to="/login">
                Login
              </Link>
              <Link className="nav-link outline-button-nav" to="/register">
                Register
              </Link>
            </div>
          )}
        </span>
        <span
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </span>
        <div
          className="collapse navbar-collapse bg-body-tertiary p-3"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">
                My Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Contact
              </Link>
            </li>
            {user ? (
              user.is_publisher ? (
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              ) : (
                <span></span>
              )
            ) : (
              <span></span>
            )}
          </ul>
          <form className="d-flex ms-auto" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchInputField}
              onChange={(e) =>setSearchWord(e.target.value)}
            />
            {/* <Link to="/search">
              <button
                className="input-group-text border-0"
                id="search-addon"
                type="submit"
                style={{ cursor: "pointer" }}
                onClick={searchInputField ? setSearchWord : goBack}
              >
                <FontAwesomeIcon icon={faSearch} size="lg" />
              </button>
            </Link> */}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
