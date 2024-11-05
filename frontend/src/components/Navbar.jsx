import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/assets/LOGO-white-mode.webp";
import Cart from "../components/Cart";

const Navbar = ({
  cart,
  toggleCart,
  removeFromCart,
  clearCart,
  updateCart,
}) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleToggleCart = () => {
    setIsCartVisible(!isCartVisible);
    toggleCart();
  };

  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={Logo} alt="MR TECHNOLOGIES Logo" className="h-8" loading="lazy" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
<div className="hidden md:flex md:items-center md:gap-8">
  <nav aria-label="Global">
    <ul className="flex items-center gap-8 text-sm">
      {[
        { to: "/", label: "Home", icon: "/svg/home.svg" },
        { to: "/products", label: "Products", icon: "/svg/products.svg" },
        { to: "/categories", label: "Categories", icon: "/svg/categories.svg" },
        { to: "/learn-more", label: "Learn More", icon: "/svg/about.svg" },
      ].map(({ to, label, icon }) => (
        <li key={to} className="relative group">
          <Link to={to} className="flex flex-col items-center transition-transform transform hover:scale-110">
            <img src={icon} alt={`${label} icon`} className="w-8 h-8" loading="lazy" />
            <span className="absolute bottom-[-2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-gray-600">
              {label}
            </span>
          </Link>
        </li>
      ))}
      <li className="relative group">
        <button
          className="text-gray-500 transition-colors hover:text-green-500 relative flex items-center"
          onClick={handleToggleCart}
          aria-label="Toggle Cart"
        >
          <img src="/svg/cart.svg" alt="Cart" className="w-8 h-8" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 rounded-full bg-red-600 text-white text-xs px-2 py-1">
              {cart.length}
            </span>
          )}
        </button>
        <span className="absolute bottom-[-1.5rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-gray-600 text-sm">
          Cart
        </span>
      </li>
    </ul>
  </nav>
</div>


          {/* Action Buttons and Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex sm:gap-4">
              <Link
                className="rounded-md px-5 py-2.5 text-sm font-medium text-white shadow transition bg-[#1b4377] hover:bg-[#154b66]"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="bg-white px-5 py-2.5 text-sm font-medium text-[#1b4377] border border-[#1b4377] rounded shadow hover:bg-gray-100 transition"
                to="/register"
              >
                Register
              </Link>
            </div>

            <div className="block md:hidden">
              <button
                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed top-0 left-0 bottom-0 z-50 bg-white text-gray-800 shadow-xl rounded-r-lg w-72 transition-transform transform translate-x-0">
            <div className="flex flex-col items-center p-6 text-center h-full relative">
              <button
                className="absolute top-4 right-4 p-2 text-red-600 hover:text-red-500"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <nav aria-label="Global" className="mt-12 flex-grow">
                <ul className="flex flex-col gap-4 text-lg">
                  {[ 
                    { to: "/", label: "Home", icon: "/svg/home.svg" },
                    { to: "/products", label: "Products", icon: "/svg/products.svg" },
                    { to: "/categories", label: "Categories", icon: "/svg/categories.svg" },
                    { to: "/learn-more", label: "Learn More", icon: "/svg/about.svg" },
                  ].map(({ to, label, icon }) => (
                    <li key={to} className="flex items-center hover:bg-gray-200 rounded p-2 transition">
                      <Link to={to} onClick={closeMenu} className="flex items-center text-gray-800 w-full">
                        <img src={icon} alt={`${label} icon`} className="w-6 h-6 mr-2" />
                        {label}
                      </Link>
                    </li>
                  ))}
                  <li className="flex items-center hover:bg-gray-200 rounded p-2 transition">
                    <button
                      className="flex items-center text-gray-800 w-full"
                      onClick={handleToggleCart}
                    >
                      <img src="/svg/cart.svg" alt="Cart" className="w-6 h-6 mr-2" />
                      Cart
                    </button>
                  </li>
                  <li>
                    <Link
                      className="rounded-md px-5 py-2.5 text-sm font-medium text-white shadow transition bg-[#1b4377] hover:bg-[#154b66]"
                      to="/login"
                      onClick={closeMenu}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="bg-white px-5 py-2.5 text-sm font-medium text-[#1b4377] border border-[#1b4377] rounded shadow hover:bg-gray-100 transition"
                      to="/register"
                      onClick={closeMenu}
                    >
                      Register
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}

        {/* Cart Component */}
        {isCartVisible && (
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            updateCart={updateCart}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
