import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import CreateUser from "./pages/createUser/CreateUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import CreateProduct from "./pages/createProduct/CreateProduct";
import EditProduct from "./pages/editProduct/EditProduct";
import Login from "./pages/login/Login";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(false);
  if (!login) {
    return <Login setLogin={setLogin} />;
  }
  return (
    <Router>
      <Topbar setLogin={setLogin} />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/product/edit/:productId" element={<EditProduct />} />
          <Route path="/createProduct" element={<CreateProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

/* <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/product/edit/:productId" element={<EditProduct />} />
          <Route path="/createProduct" element={<CreateProduct />} />
        </Routes>
      </div>
    </Router> */
