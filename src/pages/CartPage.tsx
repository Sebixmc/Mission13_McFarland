import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.bookId} className="card mb-2 p-2">
              <h5>{item.title}</h5>
              <p>Author: {item.author}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
              <button className="btn btn-danger" onClick={() => removeFromCart(item.bookId)}>Remove</button>
            </div>
          ))}
          <h4>Total: ${total.toFixed(2)}</h4>
        </>
      )}

      <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Continue Shopping</button>
    </div>
  );
}

export default CartPage;
