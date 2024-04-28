import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import MyAllCards from "../../Components/MyAllCards/MyAllCards";

function Search() {

    const BaseMainUrl = "http://127.0.0.1:8000"
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
  
    const [allBooks,setAllBooks] = useState([]);
    const searchWord=useSelector((state)=>state.search)
    const goBack = () => {
        history.goBack(); // Go back to the previous page
      };
    // change testMovies list with new data
    useEffect(()=>{
        if(searchWord)
        {
            axios.get(`${BaseMainUrl}/${searchWord}-book/search`)
            .then((res) => (
                // console.log(res.data.results)
                setAllBooks(res.data.book)
            ))
            .catch((err) => console.log(err))   
        }
    },[searchWord])
    return (
      <div>
          {/* dir={language === "ar" ? "rtl" : "ltr"} */}
          <div className="container-fluid" >
            <div className="row flex-nowrap">
  
              <div class="col py-3">
                <div className="row">
                  {
                    allBooks.map((book) => (
                      <MyAllCards
                        key={book.id}
                        imageUrl={`${BaseMainUrl}/${book.front_img}`}
                        title={book.name}
                        category={book.category_name}
                        path={`viewbook/${book.id}`}
                        rating={book.rate}
                        quantity={book.total_number_of_book}
                        publisher_name={book.publisher_name}
                        price={book.price}
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
  
         
      </div>
    );
  }
  
  export default Search;
  