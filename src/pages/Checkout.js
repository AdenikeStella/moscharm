// src/pages/Checkout.js
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useTitle } from "../hooks/useTitle";
import { PaystackButton } from "react-paystack";
import { Link } from "react-router-dom";

export const Checkout = () => {
  const { total, cartList } = useCart();
  useTitle("Checkout");
  const [successModal, setSuccessModal] = useState(false);

  // Form state
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Paystack config
  const publicKey = "pk_test_4fdfdaa28789d5e5bb78a219877093d86e40b1a7"; // replace with your public key
  const amount = total * 100; // Paystack expects amount in kobo

  const componentProps = {
    email: customer.email,
    amount,
    publicKey,
    text: "Pay Now",
    onSuccess: () => setSuccessModal(true),
    onClose: () => alert("Payment closed"),
  };

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
              type="text"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={customer.email}
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="tel"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
            />
          </div>
        </form>

        {/* Paystack Button */}
        <PaystackButton {...componentProps} />
      </section>

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
