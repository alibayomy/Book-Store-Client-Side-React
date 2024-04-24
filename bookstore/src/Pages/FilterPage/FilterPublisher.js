import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MyAllCards from "../../Components/MyAllCards/MyAllCards";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fromPrice } from "../../Store/Actions/CheckPriceAction";
import useAxios from "../../Network/AxiosInstance";
import { Categories } from "../../Components/Filters/Categories";
import Footer from "../../Components/Footer/Footer";
import { Publishers } from "../../Components/Filters/Publishers";

function Books() {

    const history = useHistory();

    const [searchResults, setSearchResults] = useState("Popular");

    const [skipItem, setSkipItem] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);

    const localhost = 'http://localhost:8000'
    const [books, setBooks] = useState([])

    const categorybooks = useSelector((state) => state.categoryFilter);
    const [categories, setCategoris] = useState([])

    const publisherbooks = useSelector((state) => state.publisherFilter);
    const [publishers, setPublishers] = useState([])

    const fromPrice = useSelector((state) => state.fromPrice);
    const toPrice = useSelector((state) => state.toPrice);

    const dispatch = useDispatch();

    useEffect(() => {

        axios.get(`${localhost}/list-cateory/`)
            .then((res) => { setCategoris(res.data.results), console.log(res.data.results) })

        axios.get(`${localhost}/users/publisher-list/`)
            .then((res) => { setPublishers(res.data.results), console.log(res.data.results) })

        axios
            .get(
                `${localhost}/list-book/`
            )
            .then((res) => { console.log(res.data.results), setBooks(res.data.results), console.log(books) })
            .catch((err) => console.log(err));
    }, []);

    const getBooksToSort = [...books];
    const priceBooks = getBooksToSort.filter((a) => a.publisher == publisherbooks);

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

    const fromPriceing = (e) => {
        dispatch({ type: "FROM_PRICE", payload: e.target.value });
    };

    const toPriceing = (e) => {
        dispatch({ type: "TO_PRICE", payload: e.target.value });
    };

    return (
        <div className="">

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
                <div className="col-md-2 col-xl-2 px-sm-1 px-0 mt-3 m-1 rounded" style={{backgroundColor:'#f5f5f5', height: '500px' , boxShadow: '0 0 7px rgba(0, 0, 0, 0.1)'}}>
                        <div class=" align-items-center align-items-sm-start px-2 pt-2 text-dark min-vh-100">
                            <Link to="/books"
                                className="d-flex align-items-center mb-md-0 me-md-auto text-dark text-decoration-none"
                            >
                                <span
                                    className="fs-5 d-none d-sm-inline"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Click To clear all filters">
                                    Filters
                                </span>
                            </Link>
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
                                {/* <li>
                                    <a
                                        href="#submenu1"
                                        data-bs-toggle="collapse"
                                        className="nav-link px-0 align-middle"
                                    >
                                        <i className="fs-5 bi-translate text-white"></i>
                                        <p
                                            className="ms-1  d-none d-sm-inline text-white "
                                            onClick={() => history.push("/books")}
                                        >
                                            Books Language
                                        </p>{" "}
                                    </a>

                                    <ul
                                        className="collapse nav flex-column ms-1"
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
                                        className="nav-link px-0 align-middle"
                                    >
                                        <i className="fs-5 bi-tags-fill text-dark"></i>{" "}
                                        <span
                                            className="ms-1 d-none d-sm-inline text-dark"
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
                                        className="nav-link px-0 align-middle"
                                    >
                                        <i className="fs-5 bi-pencil-square text-dark"></i>{" "}
                                        <span
                                            className="ms-1 d-none d-sm-inline text-dark"
                                            onClick={() => history.push("/FilterPublisher")}
                                        >
                                            Publishers
                                        </span>{" "}
                                    </a>

                                    <ul
                                        className="collapse nav show flex-column ms-1"
                                        id="submenu4"
                                        data-bs-parent="#menu"
                                    >

                                        {publishers.map((cat) => (
                                            <div key={cat.id}>
                                                <Publishers
                                                    f_name={cat.first_name}
                                                    l_name={cat.last_name}
                                                    id={cat.id}
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

                                <li>
                                    <a
                                        href="#submenu5"
                                        data-bs-toggle="collapse"
                                        className="nav-link px-0 align-middle"
                                    >
                                        <span className="text-dark">(EGP)</span>{" "}
                                        <span className="ms-1 d-none d-sm-inline text-dark">
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
                                                    className="form-check-label btn filled-button mt-3"
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
                        <h2 className="section-heading mb-4">Your Filters</h2>
                        <div className="row">
                            {priceBooks.map((book) => {
                                return (
                                    <MyAllCards
                                        key={book.id}
                                        imageUrl={book.front_img}
                                        title={book.name}
                                        category={book.category_name}
                                        path={`viewbook/${book.id}`}
                                        price={book.price}
                                        publisher={book.publisher}
                                        publisher_name = {book.publisher_name}
                                        quantity={book.total_number_of_book}
                                        book_id={book.id}
                                    />
                                )
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
