import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
function Orders() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    console.log("User:", user);
    if (!user || !user.email || !user.token) {
      console.error("User not logged in");
      return;
    }
    try {
      console.log("Fetching orders for", user.email);
      const url = `${API_URL}/orders/${user.email}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log("Orders response:", response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Optionally set orders to [] or show message
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>My Orders</h1>
      <div>
        {!user || !user.email ? (
          <p>Please log in to view your orders.</p>
        ) : orders && orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id}>
              <h3>Order Id: {order.orderDate}</h3>
              <ol>
                {order.items && order.items.map((item) => (
                  <li key={item._id}>
                    {item.name}-{item.price}-{item.quantity}-
                    {item.price * item.quantity}
                  </li>
                ))}
              </ol>
              <h3>Order Value: {order.orderValue}</h3>
              <hr />
            </div>
          ))
        ) : (
          <p>No orders found. Please place an order first.</p>
        )}
      </div>
    </div>
  );
}
export default Orders;