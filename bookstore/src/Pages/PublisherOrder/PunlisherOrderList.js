import React from 'react';
import './PublisherOrderList.css';
import book1 from "../../images/book-01.png";
import book2 from '../../images/book-02.png';
import book3 from '../../images/book.png';
import book4 from '../../images/book5.jpg';
import book5 from '../../images/book4.jpeg';
import book6 from '../../images/book6.jpeg';

function PublisherOrderList() {
  const orders = [
    {
      id: 1,
      image: book1,
      productName: 'Adventure Book',
      price: 70.0,
      quantity: 3,
      totalPrice: 210.0,
      orderDate: '2024-02-10',
      status: 'Processing',
    },
    {
      id: 2,
      image: book5,
      productName: 'Science Fiction Novel',
      price: 50.0,
      quantity: 2,
      totalPrice: 100.0,
      orderDate: '2024-02-15',
      status: 'Delivered',
    },
    {
      id: 3,
      image: book2,
      productName: 'Adventure Book',
      price: 150.0,
      quantity: 1,
      totalPrice: 150.0,
      orderDate: '2024-02-20',
      status: 'Shipped',
    },
    {
      id: 4,
      image: book4,
      productName: 'Historical Fiction',
      price: 200.0,
      quantity: 4,
      totalPrice: 800.0,
      orderDate: '2024-02-25',
      status: 'Processing',
    },
    {
      id: 5,
      image: book3,
      productName: 'Adventure Book',
      price: 80.0,
      quantity: 2,
      totalPrice: 160.0,
      orderDate: '2024-03-01',
      status: 'Shipped',
    },
    {
      id: 6,
      image: book6,
      productName: 'Biography',
      price: 150.0,
      quantity: 1,
      totalPrice: 300.0,
      orderDate: '2024-03-05',
      status: 'Delivered',
    },
    {
      id: 7,
      image: book2,
      productName: 'Adventure Book',
      price: 120.0,
      quantity: 3,
      totalPrice: 360.0,
      orderDate: '2024-03-10',
      status: 'Processing',
    },
  ];



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



  <div style={{width:"120%"}} className="container-fluid">
<div className="row">
<div className=" col-lg-12 col-md-6 col-sm-2 ">
    <table  className="table  table-striped table-bordered bg-white col-lg-12 col-md-6 col-sm-1 ">
      <thead className="text-center col-lg-12 col-md-6 col-sm-1">
        <tr className=" col-lg-12 col-md-6 col-sm-12 ">
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
      <tbody className="text-center col-lg-12 col-md-6 col-sm-1">
        {orders.map((order) => (
          <tr className=" col-lg-12 col-md-6 col-sm-4 " key={order.id}>
           <td>{order.id}</td>
                <td>
                  <img
                    src={order.image}
                    alt={order.productName}
                    className="order-image "
                  />
                </td>
                <td>{order.productName}</td>
                <td>${order.price}</td>
                <td>{order.quantity}</td>
                <td>${order.totalPrice}</td>
                <td>{order.orderDate}</td>
                <td>{order.status}</td>
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

