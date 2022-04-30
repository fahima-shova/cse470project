import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";

//context api
export const UserContext = createContext();

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({
    name: null,
    email: null,
    photoURL: null,
    isSignedIn: false,
  });
  const [orders, setOrders] = useState({});

  return (
    <UserContext.Provider
      value={{
        loginState: [loggedInUser, setLoggedInUser],
        orderState: [orders, setOrders],
      }}
    >
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="productlist" element={<ProductList type={"items"} />} />
        <Route path="product" element={<Product />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
