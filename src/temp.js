//App.jsx
import { useState, createContext } from "react";
export const AppContext = createContext();
export default function App() {
  const [user, setUser] = useState();
  return (
    <>
      <AppContext.Provider value={{ user }}>
        <Register />
      </AppContext.Provider>
    </>
  );
}

// Register.jsx
import { AppContext } from "./App";
import { useContext } from "react";
export default function Register() {
  const { user } = useContext(AppContext);
  return (
    <>
      <h2>Hello {user}</h2>
    </>
  );
}