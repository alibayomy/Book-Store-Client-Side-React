import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import MyAllCards from "../../Components/MyAllCards/MyAllCards";

function Search() {

    const BaseMainUrl = "https://api.themoviedb.org/3/movie/popular"
    const BaseAPI = "6883a4d02a15e877d54e507dbc703331"
  
    const history = useHistory();
  
    const [language, setLanguage] = useState('en');
  
    const [skipItem, setSkipItem] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)
  
    const [Movies, setMovie] = useState([])
  
    // useEffect(() => {
    //   axios.get(`${BaseMainUrl}?api_key=${BaseAPI}&page=${pageNumber}&language=${language}`)
    //     .then((res) => setMovie(res.data.results))
    //     .catch((err) => console.log(err))
  
    // }, [pageNumber, skipItem, language])
  
    const handelChangeLang = (e) => {
      setLanguage(e.target.value)
    }
  
  
    const fromPrice = useSelector((state) => state.fromPrice)
    const toPrice = useSelector((state) => state.toPrice)
  
    const dispatch = useDispatch()
    const fromPriceing = (e) => {
      dispatch({ type: "FROM_PRICE", payload: e.target.value })
    }
  
    const toPriceing = (e) => {
      dispatch({ type: "TO_PRICE", payload: e.target.value })
    }
  
  
    // const previousPage = (pagNum) => {
    //   setPageNumber(--pagNum)
    //   if (pagNum == 1) {
    //     setSkipItem(0)
    //   }
    //   else if (pagNum == 2) {
    //     setSkipItem(25)
    //   }
    //   else if (pagNum == 3) {
    //     setSkipItem(50)
    //   }
    //   else if (pagNum == 4) {
    //     setSkipItem(75)
    //   }
  
    // }
  
    // const nextPage = (pagNum) => {
    //   setPageNumber(++pagNum)
    //   if (pagNum == 1) {
    //     setSkipItem(0)
    //   }
    //   else if (pagNum == 2) {
    //     console.log("yes in page 2")
    //     setSkipItem(25)
    //   }
    //   else if (pagNum == 3) {
    //     setSkipItem(50)
    //   }
    //   else if (pagNum == 4) {
    //     setSkipItem(75)
    //   }
    // }
  
    const [allBooks,setAllBooks] = useState({
        results:[]
    });
    const searchWord=useSelector((state)=>state.search)
    const goBack = () => {
        history.goBack(); // Go back to the previous page
      };
    // change testMovies list with new data
    useEffect(()=>{
        if(searchWord)
        {
            axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchWord}&api_key=da4e0d3bd6b4f860b5788aa43ae24d86`)
            .then((res) => (
                // console.log(res.data.results)
                setAllBooks({
                results: res.data.results
            })
            ))
            .catch((err) => console.log(err))   
        }
    },[searchWord])
    return (
      <div>
  
          <ol className="breadcrumb mt-5 p-1 bg-secondary">
            <li className="breadcrumb-itemms-3"><Link className="text-muted  text-decoration-none " to="/">Home</Link></li>
            <i className="bi bi-chevron-right mx-2"></i>
            <li className="breadcrumb-item active" aria-current="page"><Link className=" text-decoration-none text-light" to="/books">Books</Link></li>
          </ol>
  
          {/* dir={language === "ar" ? "rtl" : "ltr"} */}
          <div className="container-fluid">
            <div className="row flex-nowrap">
  
              <div className="col-auto col-md-2 col-xl-2 px-sm-1 px-0 bg-dark myNav mt-4 m-1 rounded">
  
                <div className=" align-items-center align-items-sm-start px-2 pt-2 text-white min-vh-100">
                  <a href="/books" className="d-flex align-items-center  mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline" data-toggle="tooltip" data-placement="right"
                      title="Click To clear all filters">Filters</span>
                  </a>
                  <p classNameName="m-0 p-0 border-0 ToClearFilter pb-2">click to remove all filters</p>
                  <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
  
                    <li>
                      <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                        <i className="fs-5 bi-translate text-white"></i><p className="ms-1  d-none d-sm-inline text-white " onClick={() => history.push("/filter")}>Books Language</p> </a>
                      <ul className="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
  
                        <li >
                          <input className="form-check-input mySmallCheckbox" value="ar" onChange={(e) => handelChangeLang(e)}
                            type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                          <label className="form-check-label d-sm-inline mySmallText ms-1 " for="flexRadioDefault1">Arabic Books </label>
                        </li>
  
                        <li>
                          <input className="form-check-input mySmallCheckbox" type="radio" value="en" onChange={(e) => handelChangeLang(e)}
                            name="flexRadioDefault" id="flexRadioDefault2" />
  
                          <label className="form-check-label d-sm-inline mySmallText  ms-1" for="flexRadioDefault2">English Books </label>
                        </li>
                        <li>
                          <input className="form-check-input  mySmallCheckbox" type="radio" value="fr" onChange={(e) => handelChangeLang(e)}
                            name="flexRadioDefault" id="flexRadioDefault3" />
                          <label className="form-check-label ms-1 d-sm-inline mySmallText" for="flexRadioDefault3">French Books </label>
                        </li>
                      </ul>
                    </li>
  
                    <hr style={{ "borderWidth": "2px", "width": "100%" }} className="my-1" />
  
                    <li>
                      <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                        <i className="fs-5 bi-tags-fill text-white"></i> <span className="ms-1 d-none d-sm-inline text-white" onClick={() => history.push("/filter")}>Categories</span> </a>
  
                      <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                        <li class="w-100">
                          <div class="form-check">
                            <label class="form-check-label mySmallText" for="flexRadioDefault3 ">Translated</label>
                            <input class="form-check-input mySmallCheckbox" type="checkbox" name="flexRadioDefault" id="flexRadioDefault3" />
                          </div>
                        </li>
                        <li>
                          <div class="form-check">
                            <label class="form-check-label mySmallText" for="flexRadioDefault4">Miscellaneous</label>
                            <input class="form-check-input mySmallCheckbox" type="checkbox" name="flexRadioDefault" id="flexRadioDefault4" />
                          </div>
                          {/* <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 2</a> */}
                        </li>
                        <li>
                          <div class="form-check">
                            <label class="form-check-label mySmallText" for="flexRadioDefault5">Business</label>
                            <input class="form-check-input mySmallCheckbox" type="checkbox" name="flexRadioDefault" id="flexRadioDefault5" />
                          </div>
                          {/* <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 3</a> */}
                        </li>
                        <li>
                          <div class="form-check">
                            <label class="form-check-label mySmallText" for="flexRadioDefault6">History</label>
                            <input class="form-check-input mySmallCheckbox" type="checkbox" name="flexRadioDefault" id="flexRadioDefault6" />
                          </div>
                          {/* <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 4</a> */}
                        </li>
                        <li>
                          <div class="form-check">
                            <label class="form-check-label mySmallText" for="flexRadioDefault6">Arabic Novels</label>
                            <input class="form-check-input mySmallCheckbox" type="checkbox" name="flexRadioDefault" id="flexRadioDefault6" />
                          </div>
                        </li>
                        <li>
                          <div class="form-check">
                            <label class="form-check-label mySmallText" for="flexRadioDefault6">Short Stories</label>
                            <input class="form-check-input mySmallCheckbox" type="checkbox" name="flexRadioDefault" id="flexRadioDefault6" />
                          </div>
                        </li>
                        <li>
                          <div class="form-check">
                            <label class="form-check-label mySmallText" for="flexRadioDefault6">Parenting</label>
                            <input class="form-check-input mySmallCheckbox" type="checkbox" name="flexRadioDefault" id="flexRadioDefault6" />
                          </div>
                        </li>
                        <li>
                          <div class="form-check">
                            <label class="form-check-label mySmallText" for="flexRadioDefault6">Comics</label>
                            <input class="form-check-input mySmallCheckbox" type="checkbox" name="flexRadioDefault" id="flexRadioDefault6" />
                          </div>
                        </li>
                      </ul>
                    </li>
  
                    <hr style={{ "borderWidth": "2px", "width": "100%" }} className="my-1" />
  
                    <li>
                      <a href="#submenu4" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                        <i class="fs-5 bi-pencil-square text-white"></i> <span class="ms-1 d-none d-sm-inline text-white" onClick={() => history.push("/filter")}>Publishers</span> </a>
  
                      <ul class="collapse nav flex-column ms-1" id="submenu4" data-bs-parent="#menu">
                        <li class="w-100">
                          <div class="form-check">
                            <label class="form-check-label mySmallText" for="flexRadioDefault3 ">Book Juice</label>
                            <input class="form-check-input mySmallCheckbox" type="checkbox" name="flexRadioDefault" id="flexRadioDefault3" />
                          </div>
                        </li>
                        <li>
                          <div class="form-check">
                            <label class="form-check-label mySmallText" for="flexRadioDefault4">Bint Al-Zayat</label>
                            <input class="form-check-input mySmallCheckbox" type="checkbox" name="flexRadioDefault" id="flexRadioDefault4" />
                          </div>
                          {/* <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 2</a> */}
                        </li>
                        <li>
                          <div class="form-check">
                            <label class="form-check-label mySmallText" for="flexRadioDefault5">Arab Foundation</label>
                            <input class="form-check-input mySmallCheckbox" type="checkbox" name="flexRadioDefault" id="flexRadioDefault5" />
                          </div>
                          {/* <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 3</a> */}
                        </li>
                        <li>
                          <div class="form-check">
                            <label class="form-check-label mySmallText" for="flexRadioDefault6">Drawing</label>
                            <input class="form-check-input mySmallCheckbox" type="checkbox" name="flexRadioDefault" id="flexRadioDefault6" />
                          </div>
                          {/* <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 4</a> */}
                        </li>
                        <li>
                          <div class="form-check">
                            <label class="form-check-label mySmallText" for="flexRadioDefault6">Stoicism</label>
                            <input class="form-check-input mySmallCheckbox" type="checkbox" name="flexRadioDefault" id="flexRadioDefault6" />
                          </div>
                        </li>
                        <li>
                          <div class="form-check">
                            <label class="form-check-label mySmallText" for="flexRadioDefault6">Arabic literature</label>
                            <input class="form-check-input mySmallCheckbox" type="checkbox" name="flexRadioDefault" id="flexRadioDefault6" />
                          </div>
                        </li>
                      </ul>
                    </li>
  
                    <hr style={{ "borderWidth": "2px", "width": "100%" }} className="my-1" />
                    <li>
                      <a href="#submenu5" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                        <span class="text-white">(EGP)</span> <span class="ms-1 d-none d-sm-inline text-white">  Price</span> </a>
  
                      <ul class="collapse nav flex-column ms-1" id="submenu5" data-bs-parent="#menu">
                        <li class="text-center ">
  
                          <div class="text-center">
                            <input class="MyPriceInput p-1" type="number"
                              id="flexRadioDefault111" onChange={fromPriceing} value={fromPrice} />
  
                            <label class=" mx-2" for="flexRadioDefault113">To</label>
  
                            <input class=" MyPriceInput p-1" type="number" onChange={toPriceing} value={toPrice}
                              id="flexRadioDefault111" />
                          </div>
                          <div class="text-center">
                            <button class="form-check-label btn btn-outline-success mt-3" for="flexRadioDefault13" onClick={() => history.push("/filterPrice")}
                            >check</button>
                          </div>
                        </li>
                      </ul>
                    </li>
  
                  </ul>
                </div>
              </div>
  
              <div class="col py-3">
  
  
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
                  {
                    [...allBooks.results].map((book) => (
                      <MyAllCards
                        key={book.id}
                        imageUrl={`https://image.tmdb.org/t/p/w500/${book.poster_path}`}
                        title={book.title}
                        category="action"
                        path={`viewbook/${book.id}`}
                        rating={(book.vote_average.toFixed(2) )-3}
                        price={book.vote_count.toFixed(0)}
                      />
                    ))
                  }
                </div>
  
              </div>
            </div>
          </div>
  
              <div data-toggle="tooltip" data-placement="right" title="Back to top">
                <ScrollUpButton />
              </div>
  
              <ul className="pagination  justify-content-center m-3">
                {pageNumber > 1 ? <li className="page-item"><button onClick={() => previousPage(pageNumber)} className='page-link'>Previous</button></li>
                  : <li className="page-item"><button onClick={() => previousPage(pageNumber)} className='page-link disabled'>Previous</button></li>}
                {pageNumber >= 1 && pageNumber <= 3 ? <li className="page-item"> <button onClick={() => nextPage(pageNumber)} className='page-link'>Next</button></li>
                  : <li className="page-item"> <button onClick={() => nextPage(pageNumber)} className='page-link disabled'>Next</button></li>}
  
              </ul>
        <Footer />
      </div>
    );
  }
  
  export default Search;
  