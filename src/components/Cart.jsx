import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, setCart, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id) => {
    setCart(
      cart.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      }),
    );
  };
  const decrement = (id) => {
    setCart(
      cart.map((item) => {
        if (item._id === id && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      }),
    );
  };

  const placeOrder = async () => {
    const orderData = {
      items: cart,
      orderValue: orderValue,
      userEmail: user.email,
      orderDate: new Date().toISOString(),
    };
    console.log("Placing order with data:", orderData);
    try {
      const response = await axios.post(`${API_URL}/orders`, orderData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log("Order placed successfully:", response.data);
      // Clear the cart after successful order
      setCart([]);
      // Navigate to orders page
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0),
    );
  }, [cart]);

  return (
    <div>
      <h1>My Cart</h1>
      <ol>
        {cart.map((item) => (
          <li key={item._id}>
            {item.name}-{item.price}-
            <button onClick={() => decrement(item._id)}>-</button>
            {item.quantity}
            <button onClick={() => increment(item._id)}>+</button>-
            {item.quantity * item.price}
          </li>
        ))}
      </ol>
      <p>
        <strong>Order Value:{orderValue}</strong>
      </p>
      <p>
        <button onClick={placeOrder}>Place Order</button>
      </p>
    </div>
  );
}
export default Cart;