import React from 'react';
import './PublisherOrderList.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function PublisherOrderList() {

  const [orders, setOrders] = useState([]);
  
    useEffect(() => {
       
        axios.get("http://127.0.0.1:8000/orderlist/")
      
         .then((res) => setOrders(res.data.results))
        //  console.log(res))
        
        .catch((err) => console.log(err))
    },[])
 
    const getStatusClass = (status) => {
      if (status === 'pending') {
        return 'text-warning'; 
      } else if (status === 'completed') {
        return 'text-success'; 
      } else if (status === 'cancelled') {
        return 'text-danger'; 
      }
     
    };
  


  return (


    <>
    <div  className="container-p ml-5 mt-5">
<h2 className="mb-5 text-center">Publisher Orders</h2>
<div className="mb-5 text-center Search-container">
  <input
            className="search-input-table"
            type="text"
            id="search"
            placeholder="Enter product name"
          />
          <button className="search-button-table filled-button filled-button:hover outline-button:hover">
            Search
          </button>
  </div>



  <div style={{width:"100%"}} className="container-fluid">
<div className="row">
<div className=" col-lg-12 ">
    <table  className="table  table-striped table-bordered bg-white col-lg-12  ">
      <thead className="text-center col-lg-12 ">
        <tr className=" col-lg-12 ">
          <th>ID</th>
          <th></th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
          <th>Order Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="text-center ">
        {orders.map((order) => (
          <tr className=" col-lg-12 " key={order.id}>
           <td>{order.id}</td>
                <td>
                  <img
                    src={order.image}
                    alt={order.book_name}
                    className="order-image "
                  />
                </td>
                <td>{order.book_name}</td>
                <td>${order.price}</td>
                <td>{order.quantity}</td>
                <td>${order.total_price}</td>
                <td>{order.order_date}</td>
                <td className={getStatusClass(order.status)} >{order.status}</td>
                <td>
                  <button
                    className="approve-button   filled-button  "
                 
                  >
                    Approve 
                    {   order.id}
                  </button>
                  <button
                    className="disapprove-button "
                   
                  >
                    Disapprove  {   order.id}
                    
                  </button>
                </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>




  </div>















  <div  className="pagination-container mt-5 ">
  <div   >
          <ul className="pagination justify-content-center">
            <li className="page">
              <button className="movment" >
                Previous
              </button>
            </li>
            <li className="page active">
              <button className="movment">
                1
              </button>
            </li>
            <li className="page">
              <button className="movment" >
                2
              </button>
            </li>
            <li className="page">
              <button className="movment" >
                3
              </button>
            </li>
            <li className="page">
              <button className="movment" >
                Next
              </button>
            </li>
          </ul>
        </div>
  </div>
</div>
   </>
  );
}

export default PublisherOrderList;



