import { useEffect, useState } from "react"
import PublishInputComponent from "../../Components/PublishABookComponents/PublishInputComponent";
import PublishButtonComponent from "../../Components/PublishABookComponents/PublishButtonComponent";
import Select from 'react-select';
import PublishImgCard from "../../Components/PublishImgCard/PublishImgCard";
import useAxios from "../../Network/AxiosInstance";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Book } from "react-bootstrap-icons";


function UpdateABook(){

    const discriptionRegex = new RegExp(/^[\s\w\d\?><;,.()'*\\/":~’‘—“”…\-–`\{\}\[\]\-_\+=!@\#\$%^&\*\|\']*$/i)
    const priceRegex = new RegExp(/^((\d+)((,\d+|\d+)*)(\s*|\.(\d{2}))$)/)
    var options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const quantityRegex = new RegExp(/^[0-9]*$/)
    const history = useHistory()
    const book_id = useParams()

    const [submitError, setSubmitError] = useState((""))
    const [authors, setAuthors] = useState({})


    const [frontBookImg, setFrontBookImg] = useState(null)
    const [backBookImg, setBackBookImg] = useState(null)
    const[lstAuthors, setLstAuthors] = useState(null)

    
    const bookId = useParams()
    const [book, setBook] = useState({})
    const [input, setInput] = useState({})
    const [categories, setCategoris] = useState({})
    const [bookCategories, setBookCategories] = useState(null)


    let api = useAxios()
  
    function deleteBook(e){
      api.delete(`/${book_id.id}-book/delete`)
      .then(history.push('/dashboard'))
      .catch((err)=> console.log(err))
    }

    async function fetchData() {
        await api.get(`/${bookId.id}-publisherbook/details`)
            .then((res) => {
                console.log("GOT DATA")
                console.log(res)
                setBook(res.data.book)
                let bookData = res.data.book
                setInput({
                    authorNameInput: bookData.author_name,
                    titleInput: bookData.name,
                    discriptionInput: bookData.description,
                    ISBNinput: bookData.ISBN,
                    languageInput: bookData.language,
                    publicationDate: bookData.year_of_publication,
                    priceInput: bookData.price,
                    quantityInput: bookData.total_number_of_book,
                    numOfPagesInput: bookData.no_of_page,
                    frontIMG: null,
                    backIMG: null
                })
            })
            .then(api.get('/list-cateory/')
                .then((res) => {
                    setCategoris(res.data.results)
                    console.log(res.data.results)
                }))
            .catch((err) => {
                console.log(err)
                setCategoris([])
            })
            .catch((err) => {
                console.log(err)
                setCategoris([])
            })
    }
    useEffect(()=> {
      
      fetchData()
    }, [])

    const [trigger, setTrirger] = useState({
     
        frontImgTrigger: 0,
        backImgTrigger: 0
    })
  
    const [error, setError] = useState({
        frontImgError: "",
        backImgError: ""
    })
    const [errorClass, setErrorClass] = useState({
        frontImgErrorClass: "",
        backImgErrorClass: ""
    })
    const [descriptionError, setDescriptionError]= useState({
        msg:"",
        class:""
    })
    const [categoryError, setCategoryError] = useState({
        msg:"",
    })
    const [priceError, setPriceError] = useState({
        msg:"",
        class:""
    })
    const [quantityError, setQuantitiyError] = useState({
        msg:"",
        class:""
    })
    const [numOfPagesError, setNumOfPagesError] = useState({
        msg:"",
        class:""
    })
    function titleValidation(e) {
        if (!e.target.value) {
            setInput({ ...input, titleInput: book.name})
        }
        else {
            setInput({ ...input, titleInput: e.target.value })
        }
    }
    function discriptionValidation(e) {
        if (!e.target.value) {
            setInput({ ...input, discriptionInput: book.name})
        }
        else {
            setInput({ ...input, discriptionInput: e.target.value })
        }
    }

    function priceValidation(e) {
        if (!e.target.value) {
            setInput({ ...input, priceInput: book.price})
        }
        else {
            setInput({ ...input, priceInput: e.target.value })
        }

    }
    function quantityValidation(e){
        if (!e.target.value) {
            setInput({ ...input, quantityInput: book.total_number_of_book})
        }
        else {
            setInput({ ...input, quantityInput: e.target.value })
        }

    }

    function numOfPagesValidation(e){
        if (!e.target.value) {
            setInput({ ...input, numOfPagesInput: book.no_of_page})
        }
        else {
            setInput({ ...input, numOfPagesInput: e.target.value })
        }

    }
    function frontBookCoverValidation(e) {
        let imgType = e.target.files[0]?.type.split("/")
        setFrontBookImg(e.target.files[0])
        if (!e.target.files[0]) {
            setError({ ...error, frontImgError: "Upload your front book cover" })
            setErrorClass({ ...errorClass, frontImgErrorClass: "is-invalid" })
            setTrirger({ ...trigger, frontImgTrigger: 1 })
        }
        else if (imgType[0] !== "image") {
            setError({ ...error, frontImgError: "Please upload image type" })
            setErrorClass({ ...errorClass, frontImgErrorClass: "is-invalid" })
            setTrirger({ ...trigger, frontImgTrigger: 1 })
        }
        else {
            setError({ ...error, frontImgError: "" })
            setErrorClass({ ...errorClass, frontImgErrorClass: "is-valid" })
            setTrirger({ ...trigger, frontImgTrigger: 0 })
            setInput({ ...input, frontIMG: e.target.files[0] })
        }
    }
    function backBookCoverValidation(e) {
        let imgType = e.target.files[0]?.type.split("/")
        setBackBookImg(e.target.files[0])
        if (!e.target.files[0]) {
            setError({ ...error, backImgError: "Upload your back book cover" })
            setErrorClass({ ...errorClass, backImgErrorClass: "is-invalid" })
            setTrirger({ ...trigger, backImgTrigger: 1 })
        }
        else if (imgType[0] !== "image") {
            setError({ ...error, backImgError: "Please upload image type" })
            setErrorClass({ ...errorClass, backImgErrorClass: "is-invalid" })
            setTrirger({ ...trigger, backImgTrigger: 1 })
        }
        else {
            setError({ ...error, backImgError: "" })
            setErrorClass({ ...errorClass, backImgErrorClass: "is-valid" })
            setTrirger({ ...trigger, backImgTrigger: 0 })
            setInput({ ...input, backIMG: e.target.files[0] })

        }
    }

    function checkSubmission(e) {
        console.log(input.languageInput)
        e.preventDefault()
        let descriptionTrigger = 1
        let categoryTrugger = 1
        let priceTrigger = 1
        let quantityTrigger = 1
        let numOfPagesTrigger = 1
        let book_category = book.category


        // discreption validation
        if (input.languageInput==="Arabic" && (!discriptionRegex.test(input.discriptionInput))){
            descriptionTrigger = 0
            setDescriptionError({...descriptionError, msg:"", class:"is-valid"})

        }
        else if (input.languageInput==="English" && discriptionRegex.test(input.discriptionInput)){
            descriptionTrigger = 0
            setDescriptionError({...descriptionError, msg:"", class:"is-valid"})

        }
        else {
            setDescriptionError({...descriptionError, msg:"Invalid Description for the book language", class:"is-invalid"})
        }
        if (bookCategories){
            book_category = bookCategories.value
        }
        // price validation
        if (priceRegex.test(input.priceInput)){
            setPriceError({...priceError, class:"is-valid", msg:""})
            priceTrigger = 0
        }
        else{
            setPriceError({...priceError, class:"is-invalid", msg:"Invalid price"})
            priceTrigger = 1

        }
        if (quantityRegex.test(input.quantityInput)){
            setQuantitiyError({...quantityError, class:"is-valid", msg:""})
            quantityTrigger = 0
        }
        else {
            setQuantitiyError({...quantityError, class:"is-invalid", msg:"Invalid quantity"})
            quantityTrigger = 1
        }
        if (quantityRegex.test(input.numOfPagesInput)){
            setNumOfPagesError({...quantityError, class:"is-valid", msg:""})
            numOfPagesTrigger = 0
        }
        else {
            setNumOfPagesError({...quantityError, class:"is-invalid", msg:"Invalid number of pages"})
            numOfPagesTrigger = 1

        }
     
        if (descriptionTrigger === 0  && priceTrigger === 0 && quantityTrigger === 0 && numOfPagesTrigger ===0
             && trigger.frontImgTrigger === 0 && trigger.backImgTrigger==0){
            // setSubmitError(<div className="alert alert-success fw-bold" role="alert">
            //     Your data submited successfulyy
            // </div>)
           var myObj = {
            "name": input.titleInput,
            "ISBN": input.ISBNinput,
            "front_img": frontBookImg,
            "back_img": backBookImg,
            "description": input.discriptionInput,
            "price": input.priceInput,
            "language": input.languageInput,
            "year_of_publication": input.publicationDate,
            "author":book.author,
            "category": book_category,
            "total_number_of_book": input.quantityInput,
            "no_of_page": input.numOfPagesInput
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
            api.patch(`${bookId.id}-book/update`,(myObj), config). 
            then((res) => {
                setSubmitError(<div className="alert alert-success" role="alert">
                        Book Updated
                    </div>)
            }) .catch((err) => {
                console.log(err)
                setSubmitError(<div className="alert alert-danger" role="alert">
                    {err.response.request.responseText}
                </div>)})
        history.push('/dashboard')
        }
        else {
            setSubmitError(<div className="alert alert-danger fw-bold" role="alert">
            Error input please make sure you fill all the form with no errors
            </div>)
        }
    }
    return (
        <>
        {
            book ?
            <div className="container col-lg-6 col-md-6 col-sm-12 mt-3 border p-5 registerContainer">
                <h1 className="mb-4 loginTitle text-center">You are updating your book</h1>
                <h2 className="text-center" style={{color:"#4D3BC6"}}>{book.name}</h2>
                <h3 className="text-center">{book.category_name}</h3>
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
                            <textarea className={`form-control ${descriptionError.class}`} 
                            rows={3} name="bookDiscription"
                            value={input.discriptionInput ? input.discriptionInput : book.description}
                            onChange={(e) => discriptionValidation(e)}>
                                </textarea>
                            <p className="error text-danger">{descriptionError.msg}</p>

                        </div>
                        <div className="col-12 mb-1 ">
                            <label htmlFor="categories" className="mb-2">Change your book category</label>
                            <Select options={categories} isMulti={false} onChange={setBookCategories}></Select>
                            <p className="error text-danger">{categoryError.msg}</p>
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
                                    type="TEXT" className={`mb-3 ${priceError.class}`} name="bookPrice"
                                    value={input.priceInput ? input.priceInput : book.price}
                                    changeFunction={(e) => priceValidation(e)} errorMess={priceError.msg}></PublishInputComponent>
                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-between">
                            <div className="col-6 me-2">
                                <PublishInputComponent min = {0} labelFor="quantity" labelContent="Quantity"
                                    type="number" className={`mb-3 ${quantityError.class}`} name="quantity"
                                    value={input.quantityInput? input.quantityInput: book.total_number_of_book}
                                    changeFunction={(e) => quantityValidation(e)} errorMess={quantityError.msg}></PublishInputComponent>
                            </div>
                            <div className="col-6 ms-2">
                                <PublishInputComponent min = {0} labelFor="numOfPages" labelContent="Number Of Pages"
                                    type="number" className={`mb-3 ${numOfPagesError.class}`} name="numOfPages"
                                    value={input.numOfPagesInput? input.numOfPagesInput: book.no_of_page}
                                    changeFunction={(e) => numOfPagesValidation(e)} errorMess={numOfPagesError.msg}></PublishInputComponent>
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
                    <PublishButtonComponent display='d-grid' title='Update Now'></PublishButtonComponent>
                 
                </form >
                <div className="d-grid">
                    <button className={`fw-bold  filled-button`}   data-bs-toggle="modal" data-bs-target="#exampleModal" style={{background:"red"}}>Delete</button>
                    </div>
            </div >
            :
            <div className="alert alert-danger fw-bold" role="alert">
            You are not authoriszed to view this page
            </div>
        }
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Delete confirmation message</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Are you sure you want to delete yourbook: {input.titleInput}?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger"  data-bs-dismiss="modal" onClick={(e)=> {deleteBook(e)}}>Delete</button>
      </div>
    </div>
  </div>
</div>
        </>
    )
}
export default UpdateABook