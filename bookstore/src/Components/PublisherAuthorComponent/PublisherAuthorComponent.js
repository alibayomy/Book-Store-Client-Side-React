import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import useAxios from '../../Network/AxiosInstance'
import './PublisherAuthorComponent.css'
import PublishInputComponent from '../PublishABookComponents/PublishInputComponent'
import { useState } from 'react'
import { Link } from "react-router-dom";



function PublisherAuthorCard(props) {


  let api = useAxios()
  const histroy = useHistory()

  console.log(props.bio)

  return (
    <>
      <div className="col-xl-4 col-lg-4 col-md-6 mt-3 mb-4">
        
        <div class="card" style={{ width:"18rem"}}>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">{props.name}</li>
            <li class="list-group-item">{props.bio}</li>
            <li class="list-group-item"> <Link to={`/publisher/updateauthor/${props.id}`}> <button className="filled-button">Update data or Delete your Author</button> </Link></li>
          </ul>
        </div>
      </div>
    </>
  )

  
}
export default PublisherAuthorCard