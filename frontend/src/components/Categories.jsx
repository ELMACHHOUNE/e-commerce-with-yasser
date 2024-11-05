import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from '../components/ScrollToTopButton';

// Sample categories data
const categories = [
  {
    id: 1,
    name: "Laptops",
    description: "Find the best laptops for all your needs.",
    image: "laptops.webp",
    link: "/products?category=laptops",
  },
  {
    id: 2,
    name: "Accessories",
    description: "Explore various accessories for your devices.",
    image: "accessoires.webp",
    link: "/products?category=accessories",
  },
  {
    id: 3,
    name: "Monitors",
    description: "High-quality monitors for gaming and work.",
    image: "monitor.webp",
    link: "/products?category=monitors",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  // State to track image loading
  const [loading, setLoading] = useState(true);

  // Function to handle image load
  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <section className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 min-h-screen">
      <header className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Categories
        </h2>
        <p className="mt-4 max-w-md text-gray-800 mx-auto">
          Explore a variety of categories to suit your technological needs.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative block border border-gray-200 p-4 rounded-lg shadow-lg cursor-pointer overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            onClick={() => navigate(category.link)}
          >
            <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
              <img
                src={`/Photos_Categories/${category.image}`}
                alt={category.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  loading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={handleImageLoad}
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                  <svg
                    className="animate-spin h-8 w-8 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 0115.8-1.14A6 6 0 0012 18a6 6 0 00-6-6z"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
            <div className="mt-3">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:underline transition-colors duration-300">
                {category.name}
              </h3>
              <p className="mt-1 text-sm text-gray-700">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
      <ScrollToTopButton/>
    </section>
  );
};

export default Categories;
