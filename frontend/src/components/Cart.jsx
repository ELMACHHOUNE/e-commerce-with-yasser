import React, { useState } from "react";
import PropTypes from "prop-types";

const Cart = ({ cart, removeFromCart, clearCart, updateCart }) => {
  const [clientInfo, setClientInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phoneNumber: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(true);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCart(productId, newQuantity);
    }
  };

  const generateWhatsAppMessage = () => {
    let message = `Hello, this is ${clientInfo.firstName} ${clientInfo.lastName} from ${clientInfo.city}. I would like to place an order for the following items:\n\n`;

    cart.forEach((item) => {
      message += `${item.name} - Quantity: ${item.quantity}\n`;
    });

    const totalPrice = cart.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);
    
    const shippingPrice = 40; // Fixed shipping price
    const grandTotal = totalPrice + shippingPrice;

    message += `\nSubtotal: ${totalPrice.toFixed(2)} DH\nShipping: ${shippingPrice.toFixed(2)} DH\nGrand Total: ${grandTotal.toFixed(2)} DH\n\nContact Email: ${clientInfo.email}\nPhone Number: ${clientInfo.phoneNumber}\nThank you!`;
    return encodeURIComponent(message);
  };

  const handleCheckout = () => {
    const message = generateWhatsAppMessage();
    const phoneNumber = "+212649455082";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank");
    clearCart();
    setShowForm(false);
    setIsCartVisible(false);
  };

  const handleCloseCart = () => {
    setIsCartVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientInfo((prev) => ({ ...prev, [name]: value }));
  };

  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price);
    return total + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);
  
  const shippingPrice = 40; // Fixed shipping price
  const grandTotal = totalPrice + shippingPrice;

  if (!isCartVisible) return null;

  return (
    <section className={`fixed top-0 right-0 w-full max-w-md h-full bg-white border-l border-gray-300 shadow-lg z-50 transition-transform ${isCartVisible ? "translate-x-0" : "translate-x-full"} py-4 sm:py-8 px-4 sm:px-6 lg:px-8`}>
      <header className="relative text-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your Cart</h1>
        <button onClick={handleCloseCart} className="absolute top-4 right-4 text-gray-600 transition hover:text-red-600" aria-label="Close cart">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="sr-only">Close cart</span>
        </button>
      </header>

      {cart.length > 0 ? (
        <div className="flex flex-col h-full">
          <ul className="space-y-4 sm:space-y-6 overflow-y-auto flex-grow pr-2">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-md">
                <img src={`/Photos_Products/${item.imageFront}`} alt={item.name} className="h-16 w-16 sm:h-20 sm:w-20 rounded object-cover border border-gray-300" />
                <div className="flex flex-col flex-1">
                  <h3 className="text-md sm:text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-700 mb-2">Price: {item.price.toFixed(2)} DH</p>
                  <div className="mb-4">
                    <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
                    <div className="flex items-center gap-2">
                      <button type="button" className="text-gray-600 hover:bg-gray-200 rounded p-2 transition" onClick={() => handleQuantityChange(item.id, Math.max(item.quantity - 1, 1))}>-</button>
                      <input type="text" id={`quantity-${item.id}`} value={item.quantity} readOnly className="w-12 sm:w-16 text-center border-gray-300 border rounded-md shadow-sm sm:text-sm" />
                      <button type="button" className="text-gray-600 hover:bg-gray-200 rounded p-2 transition" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-600" aria-label="Remove item">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="sr-only">Remove item</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 sm:mt-8 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md sticky bottom-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="text-gray-700 mb-2"><span>Subtotal:</span> <span>{totalPrice.toFixed(2)} DH</span></div>
            <div className="text-gray-700 mb-2"><span>Shipping:</span> <span>{shippingPrice.toFixed(2)} DH</span></div>
            <div className="text-gray-900 font-bold text-lg sm:text-xl"><span>Total:</span> <span>{grandTotal.toFixed(2)} DH</span></div>
            <button onClick={() => setShowForm(true)} className="mt-4 w-full text-[#18476f] py-2 text-sm font-semibold border border-[#18476f] rounded shadow-md hover:bg-[#18476f] hover:text-white transition-all">Proceed to Checkout</button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-16">
          <img src="/svg/empty-cart.webp" alt="Empty Cart" className="w-50 h-50 mb-4" />
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Checkout</h2>
            <form>
              <div className="space-y-5">
                {[{ id: "firstName", label: "First Name", type: "text" }, { id: "lastName", label: "Last Name", type: "text" }, { id: "email", label: "Email", type: "email" }, { id: "city", label: "City", type: "text" }, { id: "phoneNumber", label: "Phone Number", type: "text" }].map(({ id, label, type }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input type={type} id={id} name={id} value={clientInfo[id] || ""} onChange={handleChange} className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#18476f] transition duration-150 ease-in-out" placeholder={label} required />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <button type="button" onClick={handleCheckout} className="w-full bg-[#18476f] hover:bg-[#154b66] text-white py-2 text-sm font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#18476f] transition duration-150 ease-in-out">Confirm Order</button>
                <button type="button" onClick={() => setShowForm(false)} className="w-full bg-red-600 text-white py-2 text-sm font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
};

export default Cart;
