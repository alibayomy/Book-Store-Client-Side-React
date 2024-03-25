import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAxios from "../../Network/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../Context/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CheckoutPage() {
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const current_user =
  useContext(AuthContext).user !== null
    ? useContext(AuthContext).user.user_id
    : 0;
  const [items, setItems] = useState([]);
  const history=useHistory()

  const [formData, setFormData] = useState({
    country: "",
    city: "",
    address: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  
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
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataObject = {
      address: {
        country: formData.country,
        city: formData.city,
        street: formData.street,
        phone: formData.phone,
      },
      payment: {
        card_number: formData.cardNumber,
        expire: formData.expiryDate,
        security_code: formData.cvv,
      },
    };
    // console.log("Form data:", formDataObject);



    let data = JSON.stringify(formDataObject);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    api
      .post(
        `http://127.0.0.1:8000/api-order/${user.user_id}/orders/create`,
        data,
        config
      )
      .then((res) =>(history.push('/orders')))
      .catch((err) => console.log(err));
  };
  console.log(items)
  return (
    <div className="checkout-page">
      <div className="container py-4">
        <div className="mx-auto bg-white rounded shadow p-5">
          <form  action={`http://127.0.0.1:8000/api-order/${user.user_id}/orders/create`}  method="POST"  className="shipping-information-form">
            <div className="row px-lg-5 px-1">
              <h2 className="mt-3 mb-4">Checkout</h2>
              <div className="col-lg-6">
                <h6 className="mt-1">Billing details</h6>
                <hr></hr>
                <div className="form-group mb-2">
                  <label htmlFor="address">Country / Region</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="street">Street address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="country">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
           
              </div>

              <div className="col-lg-5 mt-md-4 ms-auto">
                <div className="card p-4">
                  <div className="order-summary">
                    <h6 className="mb-4">Your order</h6>
                    <div className="px-2">
                      <div className="d-flex justify-content-between">
                        <p>Product</p>
                        <p>Subtotal</p>
                      </div>
                      <hr className="mt-0 mb-3"></hr>
                      <div className="d-flex justify-content-between">
                        <p>The Throned Mirror × 1</p>
                        <p>EGP23.00</p>
                      </div>
                      <hr className="mt-0 mb-3"></hr>
                      <div className="d-flex justify-content-between">
                        <p>Subtotal</p>
                        <p>EGP23.00</p>
                      </div>
                      <hr className="mt-0 mb-3"></hr>
                      <div className="d-flex justify-content-between">
                        <p>Total</p>
                        <p>EGP23.00</p>
                      </div>
                    </div>
                    <button type="submit" className="outline-button w-100 mb-1">
                      Palce Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;