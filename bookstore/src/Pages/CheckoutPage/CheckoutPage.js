import React, { useState } from "react";

function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="checkout-page">
      <div className="container py-4">
        <div className="mx-auto bg-white rounded shadow p-5">
          <div className="row px-lg-5 px-1">
            <h2 className="mt-3 mb-4">Checkout</h2>
            <div className="col-lg-6">
              <h6 className="mt-1">Billing details</h6>
              <hr></hr>
              <form
                onSubmit={handleSubmit}
                className="shipping-information-form"
              >
                <div className="form-group row mb-2">
                  <div className="col-6">
                    <label htmlFor="fullName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="fullName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      required
                    />
                  </div>
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="address">Country / Region</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="state">Home address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Home"
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="country">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Phone"
                    required
                  />
                </div>
              </form>
              <h2 className="mt-4">Payment Details</h2>
              <form onSubmit={handleSubmit} className="payment-details-form">
                <div className="form-group mb-2">
                  <label>Select Payment Method:</label>
                  <div className="d-flex justify-content-between mt-2">
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="cardMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={handlePaymentMethodChange}
                      />
                      <label className="form-check-label" htmlFor="cardMethod">
                        Debit or Credit card
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="paypalMethod"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={handlePaymentMethodChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="paypalMethod"
                      >
                        Paypal
                      </label>
                    </div>
                  </div>
                </div>
                {paymentMethod === "card" && (
                  <div>
                    <div className="form-group mb-2">
                      <label htmlFor="cardHolderName">Cardholder Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cardHolderName"
                        required
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        required
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input
                        type="text"
                        className="form-control"
                        id="expiryDate"
                        required
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cvv"
                        required
                      />
                    </div>
                  </div>
                )}
                {paymentMethod === "paypal" && (
                  <div>{/* Paypal form fields */}</div>
                )}
              </form>
            </div>
            <div className="col-lg-5 mt-md-4 ms-auto">
              <div className="card p-4">
                <form onSubmit={handleSubmit} className="payment-details-form">
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
