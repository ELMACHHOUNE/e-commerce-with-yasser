import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Categories from "./components/Categories";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Registration from "./components/Register";
import ErrorPage from "./components/ErrorPage";
import LearnMore from "./components/LearnMore";
import ViewProduct from "./components/ViewProduct";
import ProductsByCategory from "./components/ProductsByCategory";

// Import Admin Components
import AdminDashboard from "./pages/admin/AdminDashboard";
import DashboardHome from "./components/admin/DashboardHome";
import AdminProducts from "./components/admin/AdminProducts";
import AdminUsers from "./components/admin/AdminUsers";
import AdminOrders from "./components/admin/AdminOrders";

const App = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // User state for login status

  // Fetch user state from localStorage if exists on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Here you can call an API to validate the token and set the user
      setUser({ token: storedToken, role: 'admin' }); // Replace with actual user data
    }
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateCart = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Protecting admin routes
  const ProtectedAdminRoute = ({ children }) => {
    if (!user || user.role !== "admin") {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar
        cart={cart}
        toggleCart={() => {}}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        updateCart={updateCart}
      />

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/products/category/:category" element={<ProductsByCategory addToCart={addToCart} />} />
          <Route path="/view-product/:productId" element={<ViewProduct addToCart={addToCart} />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} updateCart={updateCart} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="*" element={<ErrorPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>}>
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
