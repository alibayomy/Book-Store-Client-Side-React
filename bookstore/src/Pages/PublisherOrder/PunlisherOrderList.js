import React, { useEffect, useState, useContext } from 'react';
import useAxios from '../../Network/AxiosInstance';
import './PublisherOrderList.css';
import { AuthContext } from '../../Context/AuthContext';

function PublisherOrderList() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [next,setNext]=useState(null);
  const nextPage = (pagNum) => {
    setCurrentPage(++pagNum);
  };
  const previousPage = (pagNum) => {
    setCurrentPage(--pagNum);
  };

  console.log(useContext(AuthContext).user);

  const api = useAxios();
  const publisherId =
    useContext(AuthContext).user !== null
      ? useContext(AuthContext).user.user_id
      : 0;

  useEffect(() => {
    api
      .get(`http://127.0.0.1:8000/api-order/orders/publisher/${publisherId}/1/`)
      .then((res) => {
        setOrders(res.data.orders.reverse());
        setNext(res.data.next)
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .get(`http://127.0.0.1:8000/api-order/orders/publisher/${publisherId}/${currentPage}/`)
      .then((res) => {
        setOrders(res.data.orders.reverse());
        setNext(res.data.next)
        console.log(res.data.next);
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

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

  // Pagination logic
  const currentOrders = orders;

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
                    <th>User ID</th>
                    <th>Order ID</th>
                    <th></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Order Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {currentOrders.map((order) =>
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
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {/* Pagination */}
              <ul className="pagination  justify-content-center m-3">
        {currentPage > 1 ? (
          <li className="page-item">
            <button
              onClick={() => previousPage(currentPage)}
              className="page-link "
            >
              Previous
            </button>
          </li>
        ) : (
          <li className="page-item">
            <button
              onClick={() => previousPage(currentPage)}
              className="page-link disabled"
            >
              Previous
            </button>
          </li>
        )}
        {next? (
          <li className="page-item">
            {" "}
            <button onClick={() => nextPage(currentPage)} className="page-link">
              Next
            </button>
          </li>
        ) : (
          <li className="page-item">
            {" "}
            <button
              onClick={() => nextPage(currentPage)}
              className="page-link disabled"
            >
              Next
            </button>
          </li>
        )}
      </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublisherOrderList;
