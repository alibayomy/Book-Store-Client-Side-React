import React, { useEffect, useState, useContext } from 'react';
import useAxios from '../../Network/AxiosInstance';
import './PublisherOrderList.css';
import { AuthContext } from '../../Context/AuthContext';

function PublisherOrderList() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  const api = useAxios();
  const publisherId = useContext(AuthContext).user ? useContext(AuthContext).user.user_id : 0;

  useEffect(() => {
    api.get(`http://127.0.0.1:8000/api-order/orders/publisher/${publisherId}/`)
      .then((res) => {
        setOrders(res.data.orders);
        setFilteredOrders(res.data.orders); // Initialize filtered orders with all orders
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

  // Pagination logic
  const ordersPerPage = 3;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  // Function to group orders by date
  const orderByDate = (orders) => {
    const Ordersbydate = [];
    orders.forEach((order) => {
      const currentorderbydate = Ordersbydate.find((group) => group.date === order.ordered_date);
      if (currentorderbydate) {
        currentorderbydate.orders.push(order);
      } else {
        Ordersbydate.push({ date: order.ordered_date, orders: [order] });
      }
    });
    return Ordersbydate;
  };

  // Function to handle search dynamically as the user types
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);

    const filtered = orders.filter((order) =>
      order.orderitems.some((item) => item.book.name.toLowerCase().includes(event.target.value.toLowerCase()))
    );

    // Update filtered orders to include only the orders that contain the searched book name
    const filteredOrdersWithSearch = filtered.map((order) => {
      const filteredOrderItems = order.orderitems.filter((item) =>
        item.book.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      return { ...order, orderitems: filteredOrderItems };
    });

    setFilteredOrders(filteredOrdersWithSearch);
    setCurrentPage(1); // Reset pagination when performing a new search
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
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="search-button-table filled-button filled-button:hover outline-button:hover">
            Search
          </button>
        </div>

        <div className="container-fluid">
          {orderByDate(currentOrders).map((group) => (
            <div key={group.date}>
              <h2 className="mb-3 mt-3 text-center">
                <span className="badge bg-gradient filled-button px-4 py-3">{`Order Date: ${group.date}`}</span>
              </h2>
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
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {group.orders.map((order) =>
                        order.orderitems.map((orderItem, index) => (
                          <tr key={orderItem.id}>
                            {index === 0 && (
                              <>
                                <td rowSpan={order.orderitems.length}>{order.user}</td>
                                <td rowSpan={order.orderitems.length}>{order.id}</td>
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
                            <td className={getStatusClass(order.status)}>{order.status}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
          {/* Pagination */}
          <ul className="pagination justify-content-center mt-5">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button onClick={prevPage} className="page-link" style={{ backgroundColor: '#4d3bc6', color: '#ffffff' }}>
                Previous
              </button>
            </li>
            {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }).map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button onClick={() => paginate(index + 1)} className="page-link" style={{ backgroundColor: '#4d3bc6', color: '#ffffff', marginLeft: '10px' }}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === Math.ceil(filteredOrders.length / ordersPerPage) ? 'disabled' : ''}`}>
              <button onClick={nextPage} className="page-link" style={{ backgroundColor: '#4d3bc6', color: '#ffffff', marginLeft: '10px' }}>
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default PublisherOrderList;
