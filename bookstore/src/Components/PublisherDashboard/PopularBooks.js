import './PopularBooks.css'


function PopularBooks(props) {
    console.log(props.img)
    return (<>
        <div className="card col-lg-3 col-md-7 col-sm-12 mb-sm-3 book-img  ">
            <img src={`http://127.0.0.1:8000/${props.img}`} className="card-img-top d-block mx-auto pt-2 " alt="..." style={{ "width": "85%" }} />
            <div className="card-body">
                <h3 className="card-title text-center">{props.title}</h3>
                <p className="card-text text-center">{props.discr}</p>
            </div>
        </div>
    </>)
}

export default PopularBooks