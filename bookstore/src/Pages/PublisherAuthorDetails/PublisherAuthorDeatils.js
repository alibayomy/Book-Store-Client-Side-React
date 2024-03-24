import { useEffect, useState } from "react"
import useAxios from "../../Network/AxiosInstance"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import PublishInputComponent from "../../Components/PublishABookComponents/PublishInputComponent"
import PublishButtonComponent from "../../Components/PublishABookComponents/PublishButtonComponent"


function PublisherAuthorDetails() {
    let api = useAxios()
    let authorid = useParams()
    const histroy = useHistory()
    const [input, setInput] = useState({})
    const [author, setAuthor] = useState({})
    useEffect(() => {
        api.get(`/account/author/${authorid.id}`)
            .then((res) => {
                console.log("Author details, ", res)
                setAuthor(res.data)
                let authorData= res.data
                setInput({
                    firstName:authorData.f_name,
                   lastName:authorData.l_name,
                    bio: authorData.biography
                })
            }).catch((err)=> console.log(err))
    }, [])
    console.log(input)
    const [firstnameError, setFirstnameError] = useState({
        msg: "",
        class: ""
    })
    const [lastnameError, setLastnameError] = useState({
        msg: "",
        class: ""
    })


    function firstNameValidation(e) {
        if (!e.target.value) {
            setInput({ ...input, firstName:author.f_name })
        }
        else {
            setInput({ ...input, firstName: e.target.value })
        }
    }
    function lastNameValidation(e) {
        if (!e.target.value) {
            setInput({ ...input, lastName: author.l_name })
        }
        else {
            setInput({ ...input, lastName: e.target.value })
        }
    }
    function discriptionValidation(e) {
        if (!e.target.value) {
            setInput({ ...input, bio:author.biography })
        }
        else {
            setInput({ ...input, bio: e.target.value })
        }
    }

    function deleteAuthor(e) {
        console.log(e)
        api.delete(`/account/author/${authorid.id}`)
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
        histroy.push("/dashboard")

      }
      function checkSubmission(e) {
        e.preventDefault()
        var myObj = {
            "f_name": input.firstName,
            "l_name": input.lastName,
            "bio":input.bio
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        api.patch(`/account/author/${authorid.id}`, myObj, config)
        .then((res)=> {console.log(res)})
        .catch((err) => console.log(err))
        histroy.push("/dashboard")
      }
    return (

        <>
            {
                author ?
                    <div className="container col-lg-6 col-md-6 col-sm-12 mt-3 border p-5 registerContainer">
                        <h1 className="mb-4 loginTitle text-center mb-1">You are updating your author</h1>
                        <h2 className="text-center" style={{ color: "#4D3BC6" }}>{author.f_name + author.l_name}</h2>
                        <form onSubmit={(e) => checkSubmission(e)} noValidate className="needs-validation" >
                            <div className="row">
                                <div className="col-12 d-flex justify-content-between">
                                    <div className="col-6 me-2">
                                        <PublishInputComponent labelFor="name" labelContent="First Name"
                                            type="input" name="author"
                                            value={input.firstName}
                                            changeFunction={(e) => firstNameValidation(e)}></PublishInputComponent>
                                    </div>

                                    <div className="col-6 ms-2">
                                        <PublishInputComponent labelFor="name" labelContent="Last Name"
                                            type="input" name="title"
                                            value={input.lastName}
                                            changeFunction={(e) => lastNameValidation(e)}></PublishInputComponent>
                                    </div>
                                </div>

                                <div className="col-12 mb-1">
                                    <label htmlFor="authorBio">Biography</label>
                                    <textarea className={`form-control`}
                                        rows={3} name="authorBio"
                                        value={input.bio ? input.bio : author.biography}
                                        onChange={(e) => discriptionValidation(e)}>
                                    </textarea>
                                </div>
                            </div>
                            <PublishButtonComponent display='d-grid' title='Update Now' ></PublishButtonComponent>
                        </form>
                        <div className="d-grid">
                    <button className={`fw-bold  filled-button`}   data-bs-toggle="modal" data-bs-target="#exampleModal" style={{background:"red"}}>Delete</button>
                    </div>
                    </div>
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
        Are you sure you want to delete your Author: {input.firstName + input.lastName} ?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger"  data-bs-dismiss="modal" onClick={(e)=> {deleteAuthor(e)}}>Delete</button>
      </div>
    </div>
  </div>
</div>
        </>
    )

}

export default PublisherAuthorDetails