import MyAllCards from "../MyAllCards/MyAllCards";

const Filtering = ({ item }) => {
    
    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    {item.map((book) => {
                        return (
                            <MyAllCards
                                key={book.id}
                                imageUrl={book.front_img}
                                title={book.name}
                                category={book.category_name}
                                path={`viewbook/${book.id}`}
                                price={book.price}
                                publisher={book.publisher}
                                publisher_name = {book.publisher_name}
                                quantity={book.total_number_of_book}
                                book_id={book.id}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Filtering;