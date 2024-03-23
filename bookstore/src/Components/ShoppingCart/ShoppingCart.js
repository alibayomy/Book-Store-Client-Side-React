import { useContext, useEffect, useState } from "react";
import {  Stack, Button } from "react-bootstrap"
import useAxios from "../../Network/AxiosInstance";
import { AuthContext } from "../../Context/AuthContext";

export function ShoppingCart(props) {
    let api=useAxios();
    const [Quantity, setQuantity] = useState(props.quantity);
    const localhost = 'http://localhost:8000'
    const current_user = (useContext(AuthContext).user) !== null ? (useContext(AuthContext).user.user_id) : 0
    useEffect(()=>{
        api.post(`${localhost}/api-order/${current_user}/cart`, {
            book_id: props.book_id,
            CustomPublisher_id: props.publisher_id,
            total_number_of_book: Quantity,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then((res) => { console.log(res.data.cart.cart_items)})
            .catch((err) => console.log(err));
    },[Quantity])
    return (
        <>
            <Stack direction="horizontal" gap={3} className="d-flex align-items-center py-1">
                <img
                    src={props.imageUrl}
                    className=" rounded-3 "
                    style={{ width: "70px", objectFit: "cover" }}
                />
                <div className="me-auto">
                    <h5>
                        {props.title}
                    </h5>
                    <div className="text-muted" style={{ fontSize: ".75rem" }}>
                        <span className="ms-1 mt-3 fs-5">EGP: {props.price}</span>
                    </div>
                </div>
                <input className=""
                  style={{ width: "50px" }}
                  type="number" min={1} max={props.total_books}
                  value={Quantity}
                  onChange={e => setQuantity(e.target.value)}
                />
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={props.onDeleteClicked}
                    >
                    X
                </button>
            </Stack>
        </>
    )
}