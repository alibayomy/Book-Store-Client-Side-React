import { useEffect, useState } from "react"
import PublisherAuthorCard from "../../Components/PublisherAuthorComponent/PublisherAuthorComponent"
import useAxios from "../../Network/AxiosInstance"


function PublisherAuthors(){

    let api = useAxios()
    const [authors, setAuthors] = useState([])
    useEffect(()=> {
        api.get('account/publisher-authors/')
        .then((res) => {
            console.log(res)
            setAuthors(res.data.results)
        })
        .catch((err)=> console.log(err))
    }, [])
return(
    <>
    <div className="container vh-100">
        <div className="row">
    {
        authors?.map((author) => {
            return(
                <PublisherAuthorCard id={author.id} name={author.f_name + author.l_name} first_name={author.f_name} last_name={author.l_name} bio={author.biography ? author.biography.slice(0, 30): 
                "No bigropahy for this author"}></PublisherAuthorCard>
            )
        })

    }
    </div>
    </div>
    </>

)
}

export default PublisherAuthors