import React, { useContext, useEffect, useState } from "react";
import product from "../../images/author-book-store-book-cover-06.jpg";
import useAxios from "../../Network/AxiosInstance";
import { AuthContext } from "../../Context/AuthContext";

function OrderList() {
  const [book,setBook]=useState({})
  const [orders,setOrders]=useState([])
  const localhost='http://localhost:8000'
  const [orderData,setOrderData]=useState([{
    order_date:"",
    order_items:[]
  }])
  const[res,setRes]=useState([])
  let api=useAxios()
  const current_user =
    useContext(AuthContext).user !== null
      ? useContext(AuthContext).user.user_id
      : 0;
  useEffect(()=>{
    api.get(`${localhost}/api-order/orders/customer/${current_user}/`)
    .then((res) => (console.log(res.data.orders[0].orderitems),setOrders(res.data.orders.reverse()),setRes()))
    .catch((err) => console.log(err))
  },[])
  console.log(orders)
  return (
    <div className=" border m-2 mb-4">
      <h2 className="m-3">Order List</h2>
      <div className="table-responsive">
          {orders.map((order)=>{
            return(
              <>
              <h5 className="text-center fw-bolder"> Order Date :&nbsp;{`${order.ordered_date}`}<br/>Order Time :&nbsp;{`${order.ordered_time}`}</h5>
               <table className="table bg-white">
          <thead>
            <tr className="text-center">
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
              {order.orderitems.map((item)=>{
             return(
              <tr className="text-center">
                 <td>
                   <img
                     src={`http://127.0.0.1:8000${item.book.front_img}`}
                     className=""
                     style={{ width: "80px", objectFit: "cover" }}
                   />
                 </td>
                 <td className="align-middle">{item.book.name}</td>
                 <td className="align-middle">
                   <span className="ms-1 mt-3 fs-5">{item.price}</span>
                 </td>
                 <td className="align-middle">
                   <span className="ms-1 mt-3 fs-5">{item.total}</span>
                 </td>
               </tr>
             )})}
               </tbody>
        </table>
           </>)})}
            {/* {orders.map((order)=>
            <tr className="text-center">
              <td>
                <img
                  src={`http://127.0.0.1:8000${order.book.front_img}`}
                  className=""
                  style={{ width: "80px", objectFit: "cover" }}
                />
              </td>
              <td className="align-middle">{order.book.name}</td>
              <td className="align-middle">
                <span className="ms-1 mt-3 fs-5">{order.price}</span>
              </td>
              <td className="align-middle">
                <span className="ms-1 mt-3 fs-5">{order.total}</span>
              </td>
            </tr>
          )}         */}
      </div>
    </div>
  );
}

export default OrderList;
