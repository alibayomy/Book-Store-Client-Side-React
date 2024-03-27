import React, { useEffect, useState, useContext } from 'react';
import useAxios from '../../Network/AxiosInstance';
import './PublisherOrderList.css';
import { AuthContext } from '../../Context/AuthContext';

function PublisherOrderList() {
  const [orders, setOrders] = useState([]);
  console.log(useContext(AuthContext).user);

  const api = useAxios();
  const publisherId =
    useContext(AuthContext).user !== null
      ? useContext(AuthContext).user.user_id
      : 0;
  useEffect(() => {
    api
      .get(`http://127.0.0.1:8000/api-order/orders/publisher/${publisherId}/`)

      .then((res) => {
        setOrders(res.data.orders);
        console.log(res.data);
      })

      .catch((err) => console.log(err));
  }, []);

  const getStatusClass = (status) => {
    if (status === 'pending') {
      return 'text-warning';
    } else if (status === 'completed') {
      return 'text-success';
    } else if (status === 'cancelled') {
      return 'text-danger';
    }
    return '';
  };

  return (
    <>
      <div className="container-p ml-5 mt-5">
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

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped table-bordered bg-white">
                <thead className="text-center">
                  <tr>
                    <th rowSpan="2">User ID</th>
                    <th rowSpan="2">Order ID</th>
                    <th rowSpan="2"></th>
                    <th rowSpan="2">Product</th>
                    <th rowSpan="2">Price</th>
                    <th rowSpan="2">Quantity</th>
                    <th rowSpan="2">Total Price</th>
                    <th rowSpan="2">Order Date</th>
                    <th rowSpan="2">Status</th>
                    {/* <th>Actions</th> */}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {orders.map((order) => (
                    order.orderitems.map((orderItem, index) => (
                      <tr key={orderItem.id}>
                        {index === 0 && (
                          <>
                            <td rowSpan={order.orderitems.length}>
                              {order.user}
                            </td>
                            <td rowSpan={order.orderitems.length}>
                              {order.id}
                            </td>
                          </>
                        )}
                        <td>
                          <img
                            src={`http://127.0.0.1:8000${orderItem.book.front_img}`}
                            alt={orderItem.name}
                            className="order-image"
                          />
                        </td>
                        <td>{orderItem.book.name}</td>
                        <td>${orderItem.price}</td>
                        <td>{orderItem.quantity}</td>
                        <td>${orderItem.total}</td>
                        <td>{order.ordered_date}</td>
                        <td className={getStatusClass(order.status)}>
                          {order.status}
                        </td>
                        {/* <td>
                          <button className="approve-button filled-button">
                            Approve {orderItem.id}
                          </button>
                          <button className="disapprove-button">
                            Disapprove {orderItem.id}
                          </button>
                        </td> */}
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublisherOrderList;