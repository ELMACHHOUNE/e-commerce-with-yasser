import React, { useState, useEffect } from "react";
import ProductFilter from "./ProductFilter";
import { Link, useLocation } from "react-router-dom";
import productsData from "../../public/Products.json"; // Adjust the import if necessary
import Pagination from "./Pagination"; // Import the Pagination component
import ScrollToTopButton from '../components/ScrollToTopButton';

const Products = ({ addToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({
    filterName: "",
    minPrice: "",
    maxPrice: "",
    category: "",
  });
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Set number of products per page

  // Load products data on component mount
  useEffect(() => {
    setProducts(productsData);
  }, []);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromQuery = queryParams.get("category");

  useEffect(() => {
    const { filterName, minPrice, maxPrice, category } = filter;

    const filtered = products.filter((product) => {
      const matchesCategory = categoryFromQuery
        ? product.category.toLowerCase() === categoryFromQuery.toLowerCase()
        : category
        ? product.category.toLowerCase() === category.toLowerCase()
        : true;

      const matchesName = product.name
        .toLowerCase()
        .includes(filterName.toLowerCase());

      const matchesPrice =
        (minPrice ? product.price >= minPrice : true) &&
        (maxPrice ? product.price <= maxPrice : true);

      return matchesName && matchesPrice && matchesCategory;
    });

    setFilteredProducts(filtered);
  }, [filter, products, categoryFromQuery]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleFilterApply = (filterValues) => {
    setFilter(filterValues);
    closeFilter();
  };

  const handleFilterClear = () => {
    setFilter({ filterName: "", minPrice: "", maxPrice: "", category: "" });
  };

  const openFilter = () => {
    setFilterVisible(true);
  };

  const closeFilter = () => {
    setFilterVisible(false);
  };

  const openDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeDetails = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart({ ...product, quantity });
    setSuccess("Product added to cart successfully!");

    setTimeout(() => {
      setSuccess(null);
    }, 2000);

    closeDetails();
  };

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      currentProducts.forEach((product) => {
        const imgFront = new Image();
        imgFront.src = `Photos_Products/${product.imageFront}`;
        const imgBack = new Image();
        imgBack.src = `Photos_Products/${product.imageBack}`;
      });
    };

    preloadImages();
  }, [currentProducts]);

  return (
    <section>
     {/* Success Alert */}
{success && (
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
        onClick={() => setSuccess(null)}
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


      <div className="relative mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Product Collection
            </h2>
            <p className="mt-4 max-w-md text-gray-500">
              Discover our premium collection of laptops designed to suit all your technology needs.
            </p>
          </div>
          <button
  onClick={openFilter}
  className="ml-4 block rounded-lg border border-[#18476f] text-[#18476f] bg-white py-2 px-4 text-sm font-semibold text-center shadow-lg transition duration-300 ease-in-out hover:bg-[#18476f] hover:text-white"
  style={{ width: "auto" }}
>
  Filter Products
</button>


        </header>

        {/* Filter Modal */}
        {isFilterVisible && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="relative bg-white p-8 rounded-lg w-full max-w-md mx-4 sm:mx-6">
              <button
                onClick={closeFilter}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <ProductFilter
                onFilter={handleFilterApply}
                onClear={handleFilterClear}
                onClose={closeFilter}
              />
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="group relative block border border-gray-200 p-4 rounded-xl shadow-xl transition hover:border-blue-300 hover:shadow-[#18476f] cursor-pointer"
            >
              <Link
                to={`/view-product/${product.id}`}
                className="cursor-pointer"
              >
                <div className="relative w-full h-64 sm:h-72 lg:h-80">
                  <img
                    src={`Photos_Products/${product.imageFront}`}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                  />
                  <img
                    src={`Photos_Products/${product.imageBack}`}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                <div className="mt-3">
                  <h3 className="text-sm text-gray-700 group-hover:underline">
                    {product.name}
                  </h3>
                  <span className="flex items-center mb-4">
        <span className="h-px flex-1 bg-gray-300"></span>
      </span>
                  <p className="mt-1.5 text-xs text-gray-500">
                    {product.description}
                  </p>

                  <p className="text-lg font-bold text-gray-900">
                    {product.price.toFixed(2)} DH
                  </p>
                </div>
              </Link>

              <button
  onClick={() => openDetails(product)}
  className="mt-4 block w-full bg-white border border-gray-300 text-gray-800 py-2 text-sm font-semibold text-center rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-[#18476f] hover:text-white"
>
  Add to Cart
</button>

            </div>
          ))}
        </div>
        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />

<ScrollToTopButton />
        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="relative bg-white p-8 rounded-lg w-full max-w-md mx-4 sm:mx-6">
              <button
                onClick={closeDetails}
                className="absolute p-0.5 rounded transition top-3 right-3 hover:bg-red-400 text-gray-500 hover:bg-red-400" 
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex flex-col items-center">
                <div className="relative w-full h-64 sm:h-72 lg:h-80">
                  <img
                    src={`Photos_Products/${selectedProduct.imageFront}`}
                    alt={selectedProduct.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  {selectedProduct.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {selectedProduct.description}
                </p>
                <p className="mt-2 text-lg font-bold text-gray-900">
                  {selectedProduct.price.toFixed(2)} DH
                </p>

                <div className="mt-4 flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                    className="bg-gray-200 border border-gray-300 rounded px-4 py-2 text-gray-800 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-16 text-center border border-gray-300 rounded"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 border border-gray-300 rounded px-4 py-2 text-gray-800 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleAddToCart(selectedProduct, quantity)}
                  className="mt-4 block w-full bg-white border border-gray-300 text-gray-800 py-2 text-sm font-semibold text-center rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-[#18476f] hover:text-white"
                >
                  Add to Cart
                </button>
              </div>
            </div>
      
            
          </div>
          
        )}
        
      </div>
    </section>
  );
};

export default Products;
