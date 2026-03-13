import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
function Cart() {
  const { cart, setCart, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();
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

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0),
    );
  }, [cart]);

  const placeOrder = async () => {
    if (user?.email) {
      const url = `${API_URL}/orders`;
      const order = {
        email: user.email,
        items: cart,
        orderValue: orderValue,
        orderDate: Date.now(),
      };
      console.log(url, order);
      const response = await axios.post(url, order);
      setCart([]);
      Navigate("/orders");
    }
  };

  return (
    <div>
      <h1>My Cart</h1>
      <ol>
        {cart && cart.map((item) => (
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
        {user?.email ?  <button onClick={placeOrder}>Place Order</button> :  <button onClick={()=>Navigate("/login")}>Login to Order</button> }
       
      </p>
    </div>
  );
}
export default Cart;