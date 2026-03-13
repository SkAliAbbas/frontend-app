import { useContext } from "react";
import { AppContext } from "../App";
function Orders() {
  const { orders } = useContext(AppContext);
  return (
    <div>
      <h1>My Orders</h1>
      <ol>
        {orders.map((item) => (
          <li key={item._id}>
            {item.name}-{item.price}-{item.quantity}-{item.quantity * item.price}
          </li>
        ))}
      </ol>
    </div>
  );
}
export default Orders;