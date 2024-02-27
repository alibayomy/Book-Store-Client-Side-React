import book1 from '../../images/mzr3t_el7eoan.jpg';
import book2 from '../../images/fymmr.jpeg'
import book3 from '../../images/ln ynth.jpg'
import book4 from '../../images/aedzekola.jpg'

import publishlogo from '../../images/web-logo.jpg';
import { Link } from "react-router-dom";
import './dashboard.css'

function Dashboard(){


    return (
        <>
        <div className="container-fluid mt-5 mx-auto">
            <div className="row">
                <h1 className='text-secondary'>Popular Books</h1>
                
                <div className='container d-flex justify-content-evenly flex-wrap col-lg-7 col-md-11 col-sm-12 px-0 popular-books'>
                    
                    <div className="card col-lg-3 col-md-6 col-sm-12 mb-sm-3 book-img  ">
                        <img src={book1} className="card-img-top d-block mx-auto pt-2 " alt="..." style={{"width":"60%"}}/>
                        <div className="card-body">
                            <h3 className="card-title text-center">mzr3t el7eoan</h3>
                            <p className="card-text">Some quick example text to build on the card</p>
                        </div>
                    </div>
                    
                    <div className="card col-lg-3 col-md-6 col-sm-12 mb-sm-3 book-img">
                        <img src={book2} className="card-img-top d-block mx-auto pt-2" alt="..." style={{"width":"60%"}}/>
                        <div className="card-body">
                            <h3 className="card-title text-center">mzr3t el7eoan</h3>
                            <p className="card-text">Some quick example text to build on the card</p>
                        </div>
                    </div>
                    
                    <div className="card col-lg-3 col-md-6 col-sm-12 mb-sm-3 book-img">
                        <img src={book3} className="card-img-top d-block mx-auto pt-2 0" alt="..." style={{"width":"60%"}}/>
                        <div className="card-body">
                            <h3 className="card-title text-center">mzr3t el7eoan</h3>
                            <p className="card-text">Some quick example text to build on the card</p>
                        </div>
                    </div>
                    
                </div>

                <div className='d-flex justify-content-center col-lg-3 col-md-12 col-sm-12 mt-sm-4 publisher-info'>
                    <div className="col-lg-11 col-md-11 col-sm-11 border p-2">
                        <img src={publishlogo} className="card-img-top d-block mx-auto" alt="..." style={{"width":"100px"}}/>
                        <div className="card-body">
                            <h5 className="card-title text-center">3ser Kotb</h5>
                            <p className="card-text text-center">Some quick example text</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">An item</li>
                            <li className="list-group-item">A second item</li>
                            <li className="list-group-item">A third item</li>
                        </ul>
                    </div>
                </div>
            </div>

            <hr className='w-75 mx-auto '></hr>

            <div className='row justify-content-between  align-items-start flex-wrap mb-5'>
                
                <div className='d-flex justify-content-between col-lg-7 '>
                    <h2 className='ps-5' >Books For You</h2>
                    <Link to='#' className='text-decoration-none align-self-center fs-4' style={{"color":"#5f4ecb"}}>View All</Link>
                </div>

                <div className='col-lg-8 col-md-12 col-sm-12 mx-auto'>
                    <div className='d-flex bg-light shadow mt-2 col-lg-10 position-relative'>
                        <div className='w-25'>
                            <img src={book2} className="card-img-top d-block mx-auto  w-100" style={{"height":"120px"}} alt="..." />
                        </div>
                        <div className='w-75'>
                            <h4 className='mt-4 ms-3 '>Fy mmr elf2ran </h4>
                            <h5 className='ms-3 opacity-50'>BY Dr.A7med 5ald</h5>
                            <ul className='d-flex book-dashboard-detail p-0'>
                                <li className='ms-4' ><span className='fs-6' style={{"color":"#5f4ecb"}}>70</span> reviews</li>
                                <li className='ms-3'><span className='fs-6' style={{"color":"#5f4ecb"}}>120</span> rating</li>
                                <li className='ms-4'>
                                <span class="fa fa-star checked" style={{"color":"#5f4ecb"}}></span>
                                    <span class="fa fa-star checked" style={{"color":"#5f4ecb"}}></span>
                                    <span class="fa fa-star checked" style={{"color":"#5f4ecb"}}></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                </li>
                                <li className='ms-4'><span className='fs-6 fw-bold' style={{"color":"#5f4ecb"}}>4.2</span> </li>

                            </ul>
                        </div>
                        <div className='book-arrow position-absolute'>
                            <i class="bi bi-arrow-right-circle-fill fs-3" style={{"color":"#5f4ecb"}}></i>
                        </div>
                    </div>

                    <div className='d-flex bg-light shadow mt-2 col-lg-10 position-relative'>
                        <div className='w-25'>
                            <img src={book2} className="card-img-top d-block mx-auto  w-100" style={{"height":"160px"}} alt="..." />
                        </div>
                        <div className='w-75'>
                            <h4 className='mt-4 ms-3 '>Fy mmr elf2ran </h4>
                            <h5 className='ms-3 opacity-50'>BY Dr.A7med 5ald</h5>
                            <ul className='d-flex book-dashboard-detail p-0'>
                                <li className='ms-4'><span className='fs-6' style={{"color":"#5f4ecb"}}>70</span> reviews</li>
                                <li className='ms-3'><span className='fs-6' style={{"color":"#5f4ecb"}}>150</span> rating</li>
                                <li className='ms-4'>
                                    <span class="fa fa-star checked" style={{"color":"#5f4ecb"}}></span>
                                    <span class="fa fa-star checked" style={{"color":"#5f4ecb"}}></span>
                                    <span class="fa fa-star checked" style={{"color":"#5f4ecb"}}></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                </li>
                                <li className='ms-4'><span className='fs-6 fw-bold' style={{"color":"#5f4ecb"}}>5.2</span> </li>

                            </ul>
                        </div>
                        <div className='book-arrow position-absolute'>
                            <i class="bi bi-arrow-right-circle-fill fs-3" style={{"color":"#5f4ecb"}}></i>
                        </div>
                    </div>

                    <div className='d-flex bg-light shadow mt-2 col-lg-10 position-relative'>
                        <div className='w-25'>
                            <img src={book4} className="card-img-top d-block mx-auto  w-100" style={{"height":"160px"}} alt="..." />
                        </div>
                        <div className='w-75'>
                            <h4 className='mt-4 ms-3 '>ard zekola</h4>
                            <h5 className='ms-3 opacity-50'>BY Dr.A7med 5ald</h5>
                            <ul className='d-flex book-dashboard-detail p-0'>
                                <li className='ms-4'><span className='fs-6' style={{"color":"#5f4ecb"}}>50</span> reviews</li>
                                <li className='ms-3'><span className='fs-6' style={{"color":"#5f4ecb"}}>130</span> rating</li>
                                <li className='ms-4'>
                                <span class="fa fa-star checked" style={{"color":"#5f4ecb"}}></span>
                                    <span class="fa fa-star checked" style={{"color":"#5f4ecb"}}></span>
                                    <span class="fa fa-star checked" style={{"color":"#5f4ecb"}}></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                </li>
                                <li className='ms-4'><span className='fs-6 fw-bold' style={{"color":"#5f4ecb"}}>3.2</span></li>

                            </ul>
                        </div>
                        <div className='book-arrow position-absolute'>
                            <i class="bi bi-arrow-right-circle-fill fs-3" style={{"color":"#5f4ecb"}}></i>
                        </div>
                    </div>
                </div>

                
                <div className='col-lg-3 col-md-12 col-sm-12 p-0 mt-sm-3 me-0'>
                    <div class="card bg-light" >
                        <div class="card-header bg-light p-1">
                            <div className='d-flex justify-content-start'>
                                    <div className='p-3  col-lg-3 sol-md-3 col-sm-3'>
                                    <i class="fa-solid fa-book align-self-end fs-1" style={{"color":"#5f4ecb"}}></i>
                                    </div>
                                <h1 className='text-start align-self-center col-lg-9 sol-md-9 col-sm-9 mb-0'>65</h1>
                            </div>
                            <p className='fs-4 text-dark text-start p-0 m-0'>Books</p>
                        </div>

                        <div class="card-header bg-light p-1">
                        <div className='d-flex justify-content-start'>
                                <div className='p-3  col-lg-3 sol-md-3 col-sm-3'>

                                <i class="bi bi-list-nested align-self-end fs-1" style={{"color":"#5f4ecb"}}></i>
                                </div>
                                <h1 className='text-start align-self-center col-lg-9 sol-md-9 col-sm-9 mb-0'>65</h1>
                            </div>
                            <p className='fs-4 text-dark text-start p-0 m-0'>Category</p>
                        </div>
                    
                        <div class="card-header bg-light p-1">
                            <div className='d-flex justify-content-start'>
                            <div className='p-3  col-lg-3 sol-md-3 col-sm-3'>
                                    <i class="bi bi-basket3 align-self-end fs-1 col-lg-3 sol-md-3 col-sm-3" style={{"color":"#5f4ecb"}}></i>
                            </div>
                                    <h1 className='text-start align-self-center col-lg-9 sol-md-9 col-sm-9 mb-0'>65</h1>
                            </div>
                                <p className='fs-4 text-dark text-start p-0 m-0'>Order</p>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>


        </>
    )
}

export default Dashboard;


