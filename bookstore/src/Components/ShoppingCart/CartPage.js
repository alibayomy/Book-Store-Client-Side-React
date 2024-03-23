import { Stack, Button } from "react-bootstrap"
import useAxios from "../../Network/AxiosInstance";
import React, { useEffect, useContext, useState } from "react";
import { Type } from "react-bootstrap-icons";
import { AuthContext } from "../../Context/AuthContext";

export function CartPage(props) {
    let api = useAxios();
    const [Quantity, setQuantity] = useState(props.quantity);
    const localhost = 'http://localhost:8000'
    const current_user = (useContext(AuthContext).user) !== null ? (useContext(AuthContext).user.user_id) : 0
    useEffect(() => {
        api.post(`${localhost}/api-order/${current_user}/cart`, {
            book_id: props.book_id,
            CustomPublisher_id: props.publisher_id,
            total_number_of_book: Quantity,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => { console.log(res.data.cart.cart_items) })
            .catch((err) => console.log(err));
    }, [Quantity])

    return (
        <>
            <tbody key={props.id}>
                <tr key={props.id}>
                    <td>
                        <button id={props.id} className="mt-5 mx-2 btn btn-sm btn-outline-danger"
                            onClick={props.onDeleteClicked}>X </button>
                    </td>

                    <td >
                        <img
                            src={props.imageUrl}
                            className=" rounded-3 "
                            style={{ width: "80px", objectFit: "cover" }}
                        />
                    </td>
                    <td className="align-middle"> {props.title}</td>
                    <td className="align-middle"><span className="ms-1 mt-3 fs-5">EGP: {props.price}</span></td>
                    <td className="align-middle">
                        <input className=""
                            style={{ width: "50px" }}
                            type="number" min={1} max={props.total_books}
                            value={Quantity}
                            onChange={e => setQuantity(e.target.value)}
                        /></td>

                    <td className="align-middle">
                        <div>
                            EGP: {Quantity * props.price}

                        </div></td>
                </tr>

            </tbody>
        </>
    )
}