import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const ViewProduct = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState(null); // Combined success and error messages

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/Products.json"); // Update with actual path
        const products = await response.json();
        const foundProduct = products.find(
          (prod) => prod.id === parseInt(productId)
        );
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
        setMessage({ type: "error", text: "Failed to load product data." });
      }
    };

    fetchProduct();
  }, [productId]);

  // Add product to cart
  const handleAddToCart = () => {
    if (!product) {
      setMessage({ type: "error", text: "Product data is not available." });
      return;
    }

    if (quantity < 1) {
      setMessage({ type: "error", text: "Quantity must be at least 1." });
      return;
    }

    addToCart({ ...product, quantity });
    setMessage({
      type: "success",
      text: "Product added to cart successfully!",
    });

    // Hide the message after 2 seconds
    setTimeout(() => setMessage(null), 2000);
  };

  if (!product) {
    return (
      <div className="py-16 bg-gray-100 text-center">
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-100">
      {/* Message Alert */}
      {message && (
        <div
    role="alert"
    className="fixed inset-x-4 top-4 max-w-md mx-auto z-50 bg-[#1b4377] border border-gray-100 rounded-xl p-4 shadow-lg"
  >
    <div className="flex items-start gap-4">
      <span className="text-green-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>

      <div className="flex-1">
        <strong className="block font-medium text-white">
          Product added to cart
        </strong>
        <p className="mt-1 text-sm text-white">
          The product has been successfully added to your cart.
        </p>
      </div>

      <button
        onClick={() => setMessage(null)}
        className=" text-white p-0.5 rounded transition hover:bg-red-400 focus:outline-none"
      >
        <span className="sr-only">Dismiss popup</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

    </div>
  </div>
      )}

<div className="max-w-7xl mx-auto px-6">

  <Link 
    to="/products"
    className="inline-flex items-center text-[#18476f] hover:text-[#1f6c8b] font-semibold mb-4 transition duration-300 ease-in-out border-b border-transparent hover:border-b-2 hover:border-[#1f6c8b] p-1 rounded"
  >


    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block h-5 w-5 mr-2 transition-transform duration-300 ease-in-out"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7.707 14.707a1 1 0 01-1.414-1.414L9.586 10 6.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4z"
        clipRule="evenodd"
      />
    </svg>
    <span className="transition-transform duration-300 ease-in-out">Back to Products</span>
    
  </Link>

  <div className="flex flex-col md:flex-row mt-6">
    <div className="w-full md:w-1/2">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {[product.imageFront, product.imageBack, ...product.additionalImages].map((img, idx) => (
          <SwiperSlide key={idx} className="relative aspect-w-1 aspect-h-1 overflow-hidden">
            <img
              src={`/Photos_Products/${img}`}
              alt={img === product.imageFront ? product.name : `${product.name} additional ${idx}`}
              className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-110"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    <div className="w-full md:w-1/2 md:pl-6">
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      {/* Separator Line */}
      <span className="flex items-center mb-4">
        <span className="h-px flex-1 bg-gray-300"></span>
      </span>
      <p className="text-lg text-gray-700 mb-4">{product.description}</p>
      {/* Separator Line */}
      <span className="flex items-center mb-4">
        <span className="h-px flex-1 bg-gray-300"></span>
      </span>
      <p className="text-xl font-bold text-gray-900 mb-4">{product.price.toFixed(2)} DH</p>
      
      

      <div className="mb-4">
        <label htmlFor="Quantity" className="sr-only">Quantity</label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="text-gray-600 hover:bg-gray-200 rounded p-2"
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            -
          </button>
          <input
            type="text"
            id="Quantity"
            value={quantity}
            readOnly
            className="w-12 text-center border-gray-300 border rounded"
          />
          <button
            type="button"
            className="text-gray-600 hover:bg-gray-200 rounded p-2"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-4 block w-full bg-white border border-gray-300 text-gray-800 py-2 text-sm font-semibold text-center rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-[#18476f] hover:text-white"
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>

    </div>
  );
};

export default ViewProduct;
