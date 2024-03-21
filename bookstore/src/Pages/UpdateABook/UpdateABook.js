import { useEffect, useState } from "react"
import PublishInputComponent from "../../Components/PublishABookComponents/PublishInputComponent";
import PublishButtonComponent from "../../Components/PublishABookComponents/PublishButtonComponent";
import Select from 'react-select';
import PublishImgCard from "../../Components/PublishImgCard/PublishImgCard";
import useAxios from "../../Network/AxiosInstance";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Book } from "react-bootstrap-icons";


function UpdateABook(){

    const discriptionRegex = new RegExp(/^[\s\w\d\?><;,.()'*\\/":~’‘\-–`\{\}\[\]\-_\+=!@\#\$%^&\*\|\']*$/i)
    const priceRegex = new RegExp(/^((\d+)((,\d+|\d+)*)(\s*|\.(\d{2}))$)/)
    var options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const quantityRegex = new RegExp(/^[+]?\d+([.]\d+)?$/)
    const history = useHistory()



    const [submitError, setSubmitError] = useState((""))
    const [categories, setCategoris] = useState({})
    const [authors, setAuthors] = useState({})


    const [frontBookImg, setFrontBookImg] = useState(null)
    const [backBookImg, setBackBookImg] = useState(null)
    const [bookCategories, setBookCategories] = useState(null)
    const[lstAuthors, setLstAuthors] = useState(null)

    
    const bookId = useParams()
    const [book, setBook] = useState({})
    const [input, setInput] = useState({})


    let api = useAxios()
    useEffect(()=> {
        api.get(`/${bookId.id}-book/details`)
        .then((res)=> {
            console.log("GOT DATA")
            console.log(res)
            setBook(res.data.book)
            let bookData = res.data.book
            setInput({
                authorNameInput: bookData.author_name ,
                titleInput: bookData.name,
                discriptionInput: bookData.description,
                ISBNinput:bookData.ISBN,
                languageInput: bookData.language,
                publicationDate: bookData.year_of_publication,
                priceInput: bookData.price,
                quantityInput:bookData.total_number_of_book,
                numOfPagesInput:bookData.no_of_page,
                frontIMG: null,
                backIMG: null
            })
        })
        .catch((err)=> {
            console.log("GOT ERROR")
            console.log(err)
        })
    }, [])

    const [trigger, setTrirger] = useState({
        authorNameTrigger: 0,
        titleTrigger: 1,
        discriptionTrigger: 1,
        ISBNTrigger: 1,
        languageTrigger: 0,
        publicationDateTrigger: 1,
        priceTrigger: 1,
        quantityTrigger:1,
        numOfPagesTrigger:1,
        frontImgTrigger: 1,
        backImgTrigger: 1

    })
    // const [input, setInput] = useState({
    //     authorNameInput: "",
    //     titleInput: book.name,
    //     discriptionInput: book.description,
    //     ISBNinput: "",
    //     languageInput: "English",
    //     publicationDate: new Date().toLocaleString('en-GB', options) + '',
    //     priceInput: book.pirce,
    //     quantityInput:book.total_number_of_book,
    //     numOfPagesInput:"",
    //     frontIMG: null,
    //     backIMG: null
    // })

  
    const [error, setError] = useState({
        authorNameError: "",
        titleError: "",
        discriptionError: "",
        categoryError: "",
        ISBNError: "",
        languageError: "",
        publicationDateError: "",
        priceError: "",
        quantityError:"",
        numOfPagesError:"",
        frontImgError: "",
        backImgError: ""
    })
    const [errorClass, setErrorClass] = useState({
        authorNameErrorClass: "",
        titleErrorClass: "",
        discriptionErrorClass: "",
        ISBNErrorClass: "",
        languageErrorClass: "",
        publicationDateErrorClass: "",
        priceErrorClass: "",
        quantityErrorClass:"",
        numOfPagesErrorClass:"",
        frontImgErrorClass: "",
        backImgErrorClass: ""
    })
    function titleValidation(e) {
        if (!e.target.value) {
            setInput({ ...input, titleInput: book.name})
        }
        else {
            setInput({ ...input, titleInput: e.target.value })
        }
        console.log(input.titleInput)
    }
    function discriptionValidation(e) {
        if (!e.target.value) {
            setInput({ ...input, discriptionInput: book.description})
        }
        else {
            setInput({ ...input, discriptionInput: e.target.value })
            if ((discriptionRegex.test(e.target.value) && book.language === "English") ||
                (!discriptionRegex.test(e.target.value) && input.languageInput === "Arabic")) {
                setError({ ...error, discriptionError: "" })
                setErrorClass({ ...error, discriptionErrorClass: "is-valid" })
                setTrirger({ ...trigger, discriptionTrigger: 0 })
            }
            else {
                console.log((discriptionRegex.test(e.target.value)))
                setError({ ...error, discriptionError: "Discription input does not matches the selected book language" })
                setErrorClass({ ...errorClass, discriptionErrorClass: "is-invalid" })
                setTrirger({ ...trigger, discriptionTrigger: 1 })

            }
        }

    }

    function priceValidation(e) {
        console.log(input.priceInput)
        if (!e.target.value){
            setInput({ ...input, priceInput: book.pirce })
        } 
        else{
            setInput({ ...input, priceInput: e.target.value })
        }
        if (!priceRegex.test(e.target.value)) {
            setError({ ...error, priceError: "Invalid Price " })
            setErrorClass({ ...errorClass, priceErrorClass: "is-invalid" })
            setTrirger({ ...trigger, priceTrigger: 1 })
        }
        else {
            setError({ ...error, priceError: "" })
            setErrorClass({ ...error, priceErrorClass: "is-valid" })
            setTrirger({ ...trigger, priceTrigger: 0 })


        }

    }
    function quantityValidation(e){
        setInput({...input, quantityInput: e.target.value})
        if (!quantityRegex.test(e.target.value)) {
            setError({ ...error, quantityError: "Invalid quantity number " })
            setErrorClass({ ...errorClass, quantityErrorClass: "is-invalid" })
            setTrirger({ ...trigger, quantityTrigger: 1 })
        }
        else {
            setError({ ...error, quantityError: "" })
            setErrorClass({ ...errorClass, quantityErrorClass: "is-valid" })
            setTrirger({ ...trigger, quantityTrigger: 0 })
        }

    }

    function numOfPagesValidation(e){
        setInput({...input, numOfPagesInput: e.target.value})
        if (!quantityRegex.test(e.target.value)) {
            setError({ ...error, numOfPagesError: "Invalid  number of pages " })
            setErrorClass({ ...errorClass, numOfPagesErrorClass: "is-invalid" })
            setTrirger({ ...trigger, numOfPagesTrigger: 1 })
        }
        else {
            setError({ ...error, numOfPagesError:"" })
            setErrorClass({ ...errorClass, numOfPagesErrorClass: "is-valid" })
            setTrirger({ ...trigger, numOfPagesTrigger: 0 })
        }
    }

    function checkSubmission(e) {
        e.preventDefault()
        console.log(input)
        }
    return (
        <>
            <div className="container col-lg-6 col-md-6 col-sm-12 mt-3 border p-5 registerContainer">
                <h1 className="mb-4 loginTitle">Publishing a new book?</h1>
                <form onSubmit={(e) => checkSubmission(e)} noValidate className="needs-validation" >
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between">
                            <div className="col-6 me-2">
                                    <PublishInputComponent labelFor="name" labelContent="Author"
                                        type="input"  name="author"
                                        value={book.author_name}
                                        disabled="disabled"></PublishInputComponent>
                            </div>

                            <div className="col-6 ms-2">
                                <PublishInputComponent labelFor="name" labelContent="Title"
                                    type="input" className={errorClass.titleErrorClass} name="title"
                                    value={input.titleInput ? input.titleInput : book.name}
                                    changeFunction={(e) => titleValidation(e)} errorMess={error.titleError}></PublishInputComponent>
                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-between mb-1">
                            <div className="col-6 me-2">
                                <PublishInputComponent labelFor="ISBN" labelContent="ISBN"
                                    type="text"  name="ISBN"
                                    value={book.ISBN}
                                    disabled="disabled"></PublishInputComponent>
                            </div>
                            <div className="col-6 ms-2 ">
                                <PublishInputComponent labelFor="name" labelContent="Language"
                                        type="input"  name="language"
                                        value={book.language}
                                        disabled="disabled"></PublishInputComponent>
                            </div>
                        </div>
                        <div className="col-12 mb-1">
                            <label htmlFor="bookDiscription">Discription</label>
                            <textarea className={`form-control ${errorClass.discriptionErrorClass}`} 
                            rows={3} name="bookDiscription"
                            value={input.discriptionInput ? input.discriptionInput : book.description}
                            onChange={(e) => discriptionValidation(e)}>
                                </textarea>
                            <p className="error text-danger">{error.discriptionError}</p>

                        </div>
                        <div className="col-12 mb-1 ">
                            {/* <Select options={categories} isMulti={false} onChange={setBookCategories}></Select> */}
                            <p className="error text-danger">{error.categoryError}</p>
                        </div>
                        <div className="col-12 d-flex justify-content-between">
                            <div className="col-6 me-2">
                                <PublishInputComponent labelFor="publicationdate" labelContent="Publication Date"
                                    type="input"  name="publicationdate"
                                    value={book.year_of_publication}
                                    disabled="disabled"></PublishInputComponent>
                            </div>
                            <div className="col-6 ms-2">
                                <PublishInputComponent labelFor="bookPrice" labelContent="Price(egp)"
                                    type="TEXT" className={`mb-3 ${errorClass.priceErrorClass}`} name="bookPrice"
                                    value={input.priceInput ? input.priceInput : book.price}
                                    changeFunction={(e) => priceValidation(e)} errorMess={error.priceError}></PublishInputComponent>
                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-between">
                            <div className="col-6 me-2">
                                <PublishInputComponent min = {0} labelFor="quantity" labelContent="Quantity"
                                    type="number" className={`mb-3 ${errorClass.quantityErrorClass}`} name="quantity"
                                    value={input.quantityInput? input.quantityInput: book.total_number_of_book}
                                    changeFunction={(e) => quantityValidation(e)} errorMess={error.quantityError}></PublishInputComponent>
                            </div>
                            <div className="col-6 ms-2">
                                <PublishInputComponent min = {0} labelFor="numOfPages" labelContent="Number Of Pages"
                                    type="number" className={`mb-3 ${errorClass.numOfPagesErrorClass}`} name="numOfPages"
                                    value={input.numOfPagesInput? input.numOfPagesInput: book.no_of_page}
                                    changeFunction={(e) => numOfPagesValidation(e)} errorMess={error.numOfPagesError}></PublishInputComponent>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bookCover" className="form-label">Front Cover</label>
                            <input className={`form-control ${errorClass.frontImgErrorClass}`} type="file" name="frontBookCover"
                                onChange={(e) => { frontBookCoverValidation(e) }}></input>
                            <p className="error text-danger">{error.frontImgError}</p>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="bookCover" className="form-label">Back cover</label>
                            <input className={`form-control ${errorClass.backImgErrorClass}`} type="file" name="backBookCover"
                                onChange={(e) => { backBookCoverValidation(e) }}></input>
                            <p className="error text-danger">{error.backImgError}</p>
                            <div className="col-12 d-flex justify-content-around">
                                {
                                    frontBookImg ?
                                        <PublishImgCard imageUrl={frontBookImg ? URL.createObjectURL(frontBookImg) : ""}></PublishImgCard>
                                        :
                                        <span></span>

                                }

                                {
                                    backBookImg ?
                                        <PublishImgCard imageUrl={backBookImg ? URL.createObjectURL(backBookImg) : ""}></PublishImgCard>
                                        :
                                        <span></span>

                                }
                            </div>

                        </div>
                        {submitError}
                    </div>
                    <PublishButtonComponent display='d-grid' title='Publish Now'></PublishButtonComponent>
                </form >
            </div >
        </>
    )
}
export default UpdateABook