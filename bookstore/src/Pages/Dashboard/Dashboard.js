import book1 from '../../images/mzr3t_el7eoan.jpg';
import book2 from '../../images/fymmr.jpeg'
import book3 from '../../images/ln ynth.jpg'
import book4 from '../../images/aedzekola.jpg'

import publishlogo from '../../images/web-logo.jpg';
import { Link } from "react-router-dom";
import './dashboard.css'
import MyCard from '../../Components/MyCard/MyCard';
import { useContext, useEffect } from 'react';
import useAxios from '../../Network/AxiosInstance';
import { useState } from 'react';
import PopularBooks from '../../Components/PublisherDashboard/PopularBooks';
import { AuthContext } from '../../Context/AuthContext';
import PublishInputComponent from '../../Components/PublishABookComponents/PublishInputComponent';
import PublisherAuthorCard from '../../Components/PublisherAuthorComponent/PublisherAuthorComponent';
import AuthorComponentDashBoard from '../../Components/AuthorComponentDashBoard/AuthorComponentDashBoard';

function Dashboard() {

    const [books, setBooks] = useState([])
    const [authors, setAuthors] = useState([])
    const [orders, setOrders] = useState([])
    const { user } = useContext(AuthContext)
    let api = useAxios()
    console.log(user)
    useEffect(() => {
        api.get('get-publisher-books/')
            .then((res) => {
                console.log(res)
                setBooks(res.data.results)
            })
            .then((api.get('account/publisher-authors/'))
                .then((res) => {
                    console.log("author res", res)
                    setAuthors(res.data.results)
                }).catch((err) => console.log("Auth error", err)))
            .then((api.get(`api-order/orders/publisher/${user.user_id}/`))
                .then((res) => {
                    console.log("Orders data", res)
                    setOrders(res.data.orders)
                }).catch((err) => {
                    console.log("orders, erro", err)
                }))
            .catch((err) => console.log(err))


    }, [])

    const booksCount = books.length
    const authorsCount = authors.length
    console.log(orders)
    const ordersCount = orders?.length
    const getBooksToSort = [...books]
    const latestThreeBooks = getBooksToSort.slice(-3)
    const getAuthorsToSort = [...authors]
    const lastFourAuthors = getAuthorsToSort.slice(-4);
    console.log(latestThreeBooks)

    //!! Modal functions

    const [trigger, setTrirger] = useState({
        firstNameTrigger: 1,
        lastNameTrigger: 1,

    })
    const [input, setInput] = useState({
        firstNameInput: "",
        lastNameInput: "",
        bioInput: ""
    })
    const [error, setError] = useState({
        firstNameError: "",
        lastNameError: "",
    })
    const [errorClass, setErrorClass] = useState({
        firstNameErrorClass: "",
        lastNameErrorClass: "",
    })
    const [submitError, setSubmitError] = useState((""))

    function firstNameValidation(e) {
        setInput({ ...input, firstNameInput: e.target.value })
        if (!e.target.value) {
            setError({ ...error, firstNameError: "Required" })
            setErrorClass({ ...errorClass, firstNameErrorClass: "is-invalid" })
            setTrirger({ ...trigger, firstNameTrigger: 1 })


        }
        else {
            setError({ ...error, firstNameError: "" })
            setErrorClass({ ...error, firstNameErrorClass: "is-valid" })
            setTrirger({ ...trigger, firstNameTrigger: 0 })

        }
    }
    function lastNameValidation(e) {
        setInput({ ...input, lastNameInput: e.target.value })
        if (!e.target.value) {
            setError({ ...error, lastNameError: "Required" })
            setErrorClass({ ...errorClass, lastNameErrorClass: "is-invalid" })
            setTrirger({ ...trigger, lastNameTrigger: 1 })
        }
        else {
            setError({ ...error, lastNameError: "" })
            setErrorClass({ ...error, lastNameErrorClass: "is-valid" })
            setTrirger({ ...trigger, lastNameTrigger: 0 })

        }
    }
    function bioValidation(e) {
        setInput({ ...input, bioInput: e.target.value })
    }

    function addAuhtor(e) {
        if (trigger.firstNameTrigger == 0 && trigger.lastNameTrigger == 0) {
            let myObj = {
                "f_name": input.firstNameInput,
                "l_name": input.lastNameInput,
                "biography": input.bioInput,
                "publisher": user.user_id
            }
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            api.post('account/authors-all/', myObj, config).then((res) => {
                console.log(res)
                setSubmitError(<div className="alert alert-success fw-bold" role="alert">
                    Author added successfully
                </div>)

            }).catch((err) => console.log(err))
        }
        else {
            setSubmitError(<div className="alert alert-danger fw-bold" role="alert">
                Error input please make sure you fill all the form with no errors
            </div>)
        }
    }
    return (
        <>
            <div className="container-fluid mt-5 mx-auto">
                <div className="row">
                    {/* Popular Books section  */}
                    <div className='d-flex justify-content-between col-lg-8 col-md-12 col-sm-12 mt-2 mb-3'>
                        <h3 className='text-secondary w-25'>Your oldest three Books</h3>
                        <Link to='/publisher/books' className='text-decoration-none align-self-center fs-4' style={{ "color": "#5f4ecb" }}>Go to your books</Link>

                    </div>

                    <div className='container d-flex justify-content-evenly flex-wrap col-lg-7 col-md-11 col-sm-12 px-0 popular-books'>
                        {
                            latestThreeBooks.map((book, index) => {
                                return (
                                    <PopularBooks title={book.name} discr={book.description.slice(0, 30) + "..."} img={book.front_img}></PopularBooks>
                                )
                            })
                        }
                        {/* <div className="card col-lg-3 col-md-7 col-sm-12 mb-sm-3 book-img  ">
                        <img src={book1} className="card-img-top d-block mx-auto pt-2 " alt="..." style={{"width":"85%"}}/>
                        <div className="card-body">
                            <h3 className="card-title text-center">mzr3t el7eoan</h3>
                            <p className="card-text text-center">Some quick example text to details</p>
                        </div>
                    </div>
                    
                    <div className="card col-lg-3 col-md-7 col-sm-12 mb-sm-3 book-img">
                        <img src={book2} className="card-img-top d-block mx-auto pt-2" alt="..." style={{"width":"85%"}}/>
                        <div className="card-body">
                            <h3 className="card-title text-center">Fy mmr elf2ran</h3>
                            <p className="card-text text-center">Some quick example text to details</p>
                        </div>
                    </div>
                    
                    <div className="card col-lg-3 col-md-7 col-sm-12 mb-sm-3 book-img">
                        <img src={book3} className="card-img-top d-block mx-auto pt-2 0" alt="..." style={{"width":"85%"}}/>
                        <div className="card-body">
                            <h3 className="card-title text-center">Ln ynthy elb2s</h3>
                            <p className="card-text text-center">Some quick example text to details</p>
                        </div>
                    </div> */}

                    </div>
                    {/* end Popular Books section  */}

                    {/* publisher info section */}

                    <div className='d-flex justify-content-center col-lg-4 col-md-12 col-sm-12 mt-sm-4 publisher-info'>
                        <div className="col-lg-11 col-md-11 col-sm-11 border p-2">
                            <img src={publishlogo} className="card-img-top d-block mx-auto" alt="..." style={{ "width": "85%" }} />
                            <div className="card-body p-0">
                                <h3 className="card-title text-center fs-3">{user.first_name + " " + user.last_name} </h3>
                                <p className="card-text text-center fs-4" style={{ "color": "#5f4ecb" }}>Publisher</p>
                            </div>
                        </div>

                    </div>

                    {/* endpublisher info section */}
                </div>

                <hr className='w-75 mx-auto '></hr>

                <div className='row justify-content-between  align-items-start flex-wrap mb-5'>

                    {/* Books section */}
                    <div className='d-flex justify-content-between col-lg-7 '>
                        <h2 className='ps-5' >Your Latest Authors</h2>
                        <button className="filled-button" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Author</button>
                    </div>

                    <div className='col-lg-8 col-md-12 col-sm-12 mx-auto'>
                        <div className="container">
                            <div className="row">
                                {
                                    lastFourAuthors.map((author, book) => {
                                        return (
                                            <AuthorComponentDashBoard id={author.id} name={author.f_name + author.l_name} first_name={author.f_name} last_name={author.l_name} bio={author.biography ? author.biography.slice(0, 50) :
                                                "No bigropahy for this author,No bigropahy for this author"}></AuthorComponentDashBoard>
                                        )
                                    })
                                }
                            </div>
                        </div>

                

                       

                    </div>
                    {/* end Books section */}

                    {/* books statistics section */}

                    <div className='col-lg-3 col-md-12 col-sm-12 p-0  mt-sm-5 mt-0 me-0'>
                        <div class="card bg-light mt-3" >
                            <div class="card-header bg-light p-1">
                                <div className='d-flex justify-content-start'>
                                    <div className='p-3  col-lg-3 sol-md-3 col-sm-3'>
                                        <i class="fa-solid fa-book align-self-end fs-1" style={{ "color": "#5f4ecb" }}></i>
                                    </div>
                                    <h1 className='text-start align-self-center col-lg-9 sol-md-9 col-sm-9 mb-0'>{booksCount}</h1>

                                </div>
                                <div className='d-flex justify-content-around'>
                                    <p className='fs-4 text-dark text-start p-0 m-0'>Books</p>
                                    <Link to='/publisher/addbook' className='text-decoration-none align-self-center fs-4' style={{ "color": "#5f4ecb" }}>Add Book</Link>
                                </div>
                            </div>

                            <div class="card-header bg-light p-1">
                                <div className='d-flex justify-content-start'>
                                    <div className='p-3 col-lg-3 sol-md-3 col-sm-3'>
                                        <i class="bi bi-list-nested align-self-end fs-1" style={{ "color": "#5f4ecb" }}></i>
                                    </div>
                                    <h1 className='text-start align-self-center col-lg-9 sol-md-9 col-sm-9 mb-0'>{authorsCount}</h1>
                                </div>
                                <div className='d-flex justify-content-around'>
                                    <p className='fs-4 text-dark text-start p-0 m-0'>Authors</p>
                                    <Link to='/publisher/authors' className='text-decoration-none align-self-center fs-4' style={{ "color": "#5f4ecb" }}>View All</Link>
                                </div>
                            </div>

                            <div class="card-header bg-light p-1">
                                <div className='d-flex justify-content-start'>
                                    <div className='p-3  col-lg-3 sol-md-3 col-sm-3'>
                                        <i class="bi bi-basket3 align-self-end fs-1 col-lg-3 sol-md-3 col-sm-3" style={{ "color": "#5f4ecb" }}></i>
                                    </div>
                                    <h1 className='text-start align-self-center col-lg-9 sol-md-9 col-sm-9 mb-0'>{ordersCount}</h1>
                                </div>
                                <div className='d-flex justify-content-around'>
                                    <p className='fs-4 text-dark text-start p-0 m-0'>Orders</p>
                                    <Link to='/publisherorder' className='text-decoration-none align-self-center fs-4' style={{ "color": "#5f4ecb" }}>View All</Link>
                                </div>
                            </div>
                        </div>


                        {/* <div class="card " >
                            <div class="card-header fs-2 text-center">
                                Actions
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item text-center fs-1"><Link className='text-decoration-none align-self-center fs-5 btn' to='#' style={{"color":"#5f4ecb"}}>ADD Category</Link></li>
                                <li class="list-group-item text-center fs-1"><Link className='text-decoration-none align-self-center fs-5' to='#' style={{"color":"#5f4ecb"}}>ADD Book</Link></li>
                                <li class="list-group-item text-center fs-1"><Link className='text-decoration-none align-self-center fs-5' to='#' style={{"color":"#5f4ecb"}}>ADD Author</Link></li>
                            </ul>
                        </div> */}
                    </div>

                    {/* books statistics section */}

                </div>

            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add your new author</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="col-6 ms-2">
                                <PublishInputComponent labelFor="name" labelContent="First Name"
                                    type="input" className={errorClass.firstNameErrorClass} name="firstname"
                                    value={input.firstNameInput}
                                    changeFunction={(e) => firstNameValidation(e)} errorMess={error.firstNameError}></PublishInputComponent>
                            </div>

                            <div className="col-6 ms-2">
                                <PublishInputComponent labelFor="name" labelContent="Last Name"
                                    type="input" className={errorClass.lastNameErrorClass} name="firstname"
                                    value={input.lastNameInput}
                                    changeFunction={(e) => lastNameValidation(e)} errorMess={error.lastNameError}></PublishInputComponent>
                            </div>
                            <div className="col-6 ms-2">
                                <label htmlFor="bookDiscription">Biography</label>
                                <textarea className={`form-control `} rows={3} name="bookDiscription" onChange={(e) => bioValidation(e)}></textarea>

                            </div>
                            {submitError}

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" onClick={(e) => { addAuhtor(e) }}>Add</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard;


