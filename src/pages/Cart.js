import { useCart } from "../context/CartContext";
import { useTitle } from "../hooks/useTitle";
import { CartCard } from "../components";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { total, cartList } = useCart();
  useTitle("Cart");


  
  return (
    <main>
      <section className="cart">
        <h1>Cart Items: {cartList.length} / N{total}</h1>
        { cartList.map((product) => (
          <CartCard key={product.id} product={product} />
        )) }     
        <Link to="/checkout">
        <button disabled={cartList.length === 0} className="checkoutButton">
          Proceed to checkout
        </button>
        </Link>
      </section>
    </main>
  )
}