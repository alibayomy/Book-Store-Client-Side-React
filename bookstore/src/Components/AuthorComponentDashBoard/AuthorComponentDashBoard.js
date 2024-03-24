

function AuthorComponentDashBoard(props){
    return (
        <>
          <div className="col-xl-6 col-lg-6 col-md-6 mt-3 mb-4">
            
            <div class="card" style={{ width:"18rem"}}>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">{props.name}</li>
                <li class="list-group-item">{props.bio}</li>
              </ul>
            </div>
          </div>
        </>
      )
}
export default AuthorComponentDashBoard