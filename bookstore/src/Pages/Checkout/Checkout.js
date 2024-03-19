
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function Checkout() {

    const totalPrice = useSelector((state) => state.totalPrice);

    const BaseMainUrl = "https://api.themoviedb.org/3/movie/popular";
    const BaseAPI = "6883a4d02a15e877d54e507dbc703331";
    const [Movies, setMovie] = useState([]);
    const total = 0
    useEffect(() => {
        axios
            .get(
                `${BaseMainUrl}?api_key=${BaseAPI}`
            )
            .then((res) => { console.log(res.data.results), setMovie(res.data.results) })
            .catch((err) => console.log(err));

    }, []);

    const [Quantity, setQuantity] = useState(1);
    const [Price, setPrice] = useState(1);

    const TheQuantity = (e) => {
        setQuantity = e.target.value
    };

    const ThePrice = (e) => {
        setPrice += e.target.value
    };

    return (
        <div className=" ">
            <h2>Checkout Page</h2>
            <div className="m-3 p-4 shadow">

                <h5 >Your Order</h5>

                <table className="table w-75" >
                    <thead className="border ">
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>

                    {Movies.map((book) => (

                        <tbody tbody >
                            <tr >
                                <td>
                                    <button className="mt-5 mx-2 btn btn-sm btn-outline-danger">
                                        X
                                    </button>
                                </td>
                                <td className="align-middle"> {book.title.length > 18 ? book.title.substr(0, 18) + "..." : book.title}</td>
                                <td className="align-middle"><span className="ms-1 mt-3 fs-5">EGP: {book.vote_count.toFixed(0)}</span></td>
                                <td className="align-middle"><input className=""
                                    style={{ width: "50px" }}
                                    type="number" min={1} defaultValue={1}
                                    value={Quantity}
                                    onChange={TheQuantity}
                                /></td>
                                <td className="align-middle"> {book.vote_count.toFixed(0)}</td>
                            </tr>
                        </tbody>
                    ))}

                </table>
            </div>
            {/* <div className="p-5 w-50 ">
        <div className=" border">
          <h2 className="border p-2 ps-5">Cart total</h2>
          <div className=" text-center mt-3">            
            <h4 className="bold">Total <span
              className="ms-5"><bdi><span
                className="">EGP: </span>83.00</bdi></span></h4>
          </div>
          <div className=" text-center p-3">

            {
              Movies.length > 0 && (
                <button className="btn btn-lg btn-success">
                  Proceed to checkout
                </button>
              )
            }
          </div>
        </div>
      </div> */}

        </div >
    );
}

export default Checkout;
