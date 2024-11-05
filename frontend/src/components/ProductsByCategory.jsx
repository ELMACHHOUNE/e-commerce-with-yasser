import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productsData from "../../public/Products.json"; // Adjust import as necessary

const ProductsByCategory = ({ addToCart }) => {
  const { category } = useParams(); // Extract the category parameter from the URL
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Filter products based on the category from URL
    const filtered = productsData.filter(
      (product) => product.category === category
    );
    setFilteredProducts(filtered);
  }, [category]);

  return (
    <section>
      {/* Display filtered products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 p-4 rounded-lg shadow-lg"
          >
            <img
              src={`Photos_Products/${product.imageFront}`}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-lg font-bold">{product.price.toFixed(2)} DH</p>
            <button
              onClick={() => addToCart({ ...product, quantity: 1 })}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsByCategory;
