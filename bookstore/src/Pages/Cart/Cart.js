import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import useAxios from "../../Network/AxiosInstance";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";

function Cart() {
  const history = useHistory();

  const totalPrice = useSelector((state) => state.totalPrice);

  const BaseMainUrl = "https://api.themoviedb.org/3/movie/popular";
  const BaseAPI = "6883a4d02a15e877d54e507dbc703331";
  const [Movies, setMovie] = useState([]);
  const current_user =
    useContext(AuthContext).user !== null
      ? useContext(AuthContext).user.user_id
      : 0;
  const [items, setItems] = useState([]);
  const [total_cost, setTotalCost] = useState(0);
  const hundleOnDelete = (e) => {
    api
      .delete(`http://127.0.0.1:8000/api-order/${current_user}/cart`, {
        data: { cart_item_id: e.target.id },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data), setItems(res.data.cart.cart_items);
      })
      .catch((err) => console.log(err));
    console.log(e.target.id);
  };
  let api = useAxios();
  const total = 0;
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api-order/${current_user}/cart`)
      .then(
        (res) => (
          setItems(res.data.cart.cart_items),
          console.log(res.data.cart.cart_items)
        )
      )
      .catch((err) => console.log(err))
      .finally(() =>
        items.map((item) =>
          setTotalCost((total_cost += Number(item.book.price * item.quantity)))
        )
      );
  }, []);

  const [Quantity, setQuantity] = useState(null);
  const [Price, setPrice] = useState(1);

  const TheQuantity = (e) => {
    setQuantity = e.target.value;
  };

  const ThePrice = (e) => {
    setPrice += e.target.value;
  };

  return (
    <div className=" border m-2 mb-4">
      <h2 className="m-3 ">Cart Page</h2>

      <table className="table shadow">
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        {items.map((item) => (
          <>
            <tbody tbody>
              <tr>
                <td>
                  <button
                    id={item.id}
                    className="mt-5 mx-2 btn btn-sm btn-outline-danger"
                    onClick={(e) => hundleOnDelete(e)}
                  >
                    X
                  </button>
                </td>
                <td>
                  <img
                    src={`http://127.0.0.1:8000${item.book.front_img}`}
                    className=" rounded-3 "
                    style={{ width: "80px", objectFit: "cover" }}
                  />
                </td>
                <td className="align-middle">
                  {" "}
                  {item.book.name.length > 18
                    ? item.book.name.substr(0, 18) + "..."
                    : item.book.name}
                </td>
                <td className="align-middle">
                  <span className="ms-1 mt-3 fs-5">EGP: {item.book.price}</span>
                </td>
                <td className="align-middle">
                  <input
                    className=""
                    style={{ width: "50px" }}
                    type="number"
                    min={1}
                    defaultValue={1}
                    value={item.quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </td>
                <td className="align-middle">
                  {" "}
                  {item.book.price * item.quantity}
                </td>
              </tr>
            </tbody>
          </>
        ))}
      </table>
      <div className="p-3 w-50 mx-auto">
        <div className="border">
          <h2 className="border p-2 ps-3">Cart total</h2>
          <div className=" text-center mt-3">
            <h4 className="bold">
              Total{" "}
              <span className="ms-5">
                <span className="">EGP: </span>
                {total_cost}
              </span>
            </h4>
          </div>
          <div className=" text-center p-3">
            {items.length > 0 && (
              <button
                className="filled-button"
                onClick={() => {
                  history.push("/checkout");
                }}
              >
                Proceed to checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
