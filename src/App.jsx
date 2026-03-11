import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Orders from "./components/Orders";

function App() {
  return (
    <div>
      <Header />
      <Content />
      <Login/>
      <Register/>
      <Cart/>
      <Orders/>
      <Footer />
    </div>
  );
}
export default App;