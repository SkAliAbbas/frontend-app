import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import App, { AppContext } from "../App";
function Logout() {
  const { user, setUser } = useContext(AppContext);
  const Navigate = useNavigate();
  useEffect(() => {
    setUser({});
    Navigate("/");
  }, []);
  return <h2>Logout Page</h2>;
}
export default Logout;