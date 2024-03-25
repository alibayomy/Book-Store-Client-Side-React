import { useEffect, useState } from "react"
import useAxios from "../../Network/AxiosInstance"
import MyAllCards from "../../Components/MyAllCards/MyAllCards"
import PublisherBooksCards from "../../Components/PublisherBooksCards/PublisherBooksCards"




function PublisherBooks() {

    let api = useAxios()

    const [books, setBooks] = useState([])

    useEffect(() => {
        api.get('/get-publisher-books/')
            .then((res) => {
                console.log(res)
                setBooks(res.data.results)
            })
            .catch((err) => { console.log(err) })
    }, [])
    console.log(books)
    return (
        <>

            <div className="row vh-100">
                {books.map((book) => (
                    <PublisherBooksCards
                        id= {book.id}
                        key={book.id}
                        imageUrl={`http://127.0.0.1:8000/${book.front_img}`}
                        title={book.name}
                        category={book.category_name}
                        path={`/viewbook/${book.id}`}
                        rating="3"
                        price={book.price}
                    />
                ))}
                </div>
            </>
            )

}

            export default PublisherBooks