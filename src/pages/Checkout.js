// src/pages/Checkout.js
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useTitle } from "../hooks/useTitle";
import { PaystackButton } from "react-paystack";
import { Link } from "react-router-dom";

export const Checkout = () => {
  const { total, cartList } = useCart();
  useTitle("Checkout");
  const [successModal, setSuccessModal] = useState(false);
  const [error, setError] = useState("")
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const errors = {};
  if (!customer.name.trim()) errors.name = "Name is required";
  if (!/\S+@\S+\.\S+/.test(customer.email)) errors.email = "Enter a valid email";
  if (customer.phone && !/^\+?\d{10,15}$/.test(customer.phone))
    errors.phone = "Enter a valid phone number";

  const handleChange = (e) => {
    setError("");
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY
  const amount = total * 100;

  const handlePaymentSuccess = (response) => {
    try {
      setSuccessModal(true);
    }
    catch (error) {
      setError("There was an error while trying to complete payment. Please try again")
    }
  };



  const componentProps = {
    email: customer.email,
    amount,
    publicKey,
    text: "Pay Now",
    onSuccess: handlePaymentSuccess,
    onClose: () => setError("There was an error while trying to complete payment. Please try again")
  };

  if (cartList.length === 0 && !successModal) {
    return (
      <main>
        <p>Your cart is empty.</p>
        <Link to="/">Continue shopping</Link>
      </main>
    );
  }

  return (
    <main>
      <section className="checkout">
        <h1>Checkout</h1>
        <h2>Total: ₦{total}</h2>

        {/* Cart Summary */}
        <ul>
          {cartList.map((item) => (
            <li key={item.id}>
              {item.name} - ₦{item.price}
            </li>
          ))}
        </ul>

        {/* Customer Details Form */}
        <form className="checkout-form">
          <div>
            <label>Name:</label>
            <input
            id="name"
            name="name"
              type="text"
              value={customer.name}
              onChange={handleChange}
            />
            {errors.name && <p role="alert">{errors.name}</p>}
          </div>
          <div>
            <label>Email:</label>
            <input
            id="email"
            name="email"
              type="email"
              value={customer.email}
              onChange={handleChange}
            />
            {errors.email && <p role="alert">{errors.email}</p>}

          </div>
          <div>
            <label>Phone Number:</label>
            <input
            id="phone"
            name="phone"
              type="tel"
              value={customer.phone}
              onChange={handleChange}
            />
            {errors.phone && <p role="alert">{errors.phone}</p>}
          </div>
        </form>

        {/* Paystack Button */}
        <PaystackButton {...componentProps} />
      </section>

      {/* error modal */}
      {error && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          <div className="modal">
            <p>
                                    {error}
            </p>
                      <Link to="/" className="modal-btn">Go back Home</Link>

          </div>
        </div>
      )}

      {/* Success Modal */}
      {successModal && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          <div className="modal">
            <div className="modal-icon">
              <svg
                width="32"
                height="32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 id="success-title">Payment Successful</h2>

            <p>
              Thank you, <strong>{customer.name}</strong>! Please check your email (
              <strong>{customer.email}</strong>) for your receipt.
            </p>

            <Link to="/" className="modal-btn" >
              Back to Homepage
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};
