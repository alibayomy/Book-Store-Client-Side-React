import React from "react";
import product from "../../images/author-book-store-book-cover-06.jpg";

function OrderList() {
  return (
    <div className=" border m-2 mb-4">
      <h2 className="m-3">Order List</h2>
      <div className="table-responsive">
        <table className="table bg-white">
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td></td>
              <td>
                <img
                  src={product}
                  className=""
                  style={{ width: "80px", objectFit: "cover" }}
                />
              </td>
              <td className="align-middle">props.title</td>
              <td className="align-middle">
                <span className="ms-1 mt-3 fs-5">EGP: props.price</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
