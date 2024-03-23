import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import useAxios from "../../Network/AxiosInstance";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { CartPage } from "../../Components/ShoppingCart/CartPage";

function Cart() {
  const history = useHistory();

  const current_user =
    useContext(AuthContext).user !== null
      ? useContext(AuthContext).user.user_id
      : 0;
  const [items, setItems] = useState([]);

  const localhost = "http://localhost:8000";

  const hundleOnDelete = (item_id) => {
    api
      .delete(`${localhost}/api-order/${current_user}/cart`, {
        data: { cart_item_id: item_id },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data), setItems(res.data.cart.cart_items);
      })
      .catch((err) => console.log(err));
    console.log(item_id);
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
      .catch((err) => console.log(err));
    // .finally(() => (items.map((item) => (setTotalCost(total_cost += Number(item.book.price * item.quantity))))));
  }, []);

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
            <CartPage
              cart_id={item.id}
              imageUrl={`http://127.0.0.1:8000${item.book.front_img}`}
              title={
                item.book.name.length > 18
                  ? item.book.name.substr(0, 18) + "..."
                  : item.book.name
              }
              price={item.book.price}
              onDeleteClicked={() => hundleOnDelete(item.id)}
              book_id={item.book.id}
              publisher_id={item.book.publisher}
              total_books={item.book.total_number_of_book}
              quantity={item.quantity}
            />
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
                <span className="">EGP: </span>0
              </span>
            </h4>
          </div>

          <div className=" text-center p-3">
            {items.length > 0 && (
              <button
                className="btn btn-lg btn-success"
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
