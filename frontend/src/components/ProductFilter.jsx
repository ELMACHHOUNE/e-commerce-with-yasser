import React, { useState } from "react";

const ProductFilter = ({ onFilter, onClear, onClose }) => {
  const [filterName, setFilterName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleApplyFilters = () => {
    onFilter({ filterName, minPrice, maxPrice, category });
    onClose();
  };

  const handleClearFilters = () => {
    setFilterName("");
    setMinPrice("");
    setMaxPrice("");
    setCategory("");
    onClear();
    onClose();
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg mb-8 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-900">Filter Products</h3>
      <div className="mt-4 space-y-4">
        {/* Product Name Filter */}
        <div>
          <label htmlFor="filterName" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            id="filterName"
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="Search by name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        {/* Price Range Filter */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
              Minimum Price
            </label>
            <input
              id="minPrice"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
              Maximum Price
            </label>
            <input
              id="maxPrice"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="1000"
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
          >
            <option value="">All Categories</option>
            <option value="laptops">Laptops</option>
            <option value="accessories">Accessories</option>
            <option value="monitors">Monitors</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleApplyFilters}
            className="block w-full bg-green-500 text-white py-2 text-sm font-semibold text-center rounded shadow-lg hover:bg-green-600 transition-all"
          >
            Apply Filters
          </button>

          <button
            onClick={handleClearFilters}
            className="block w-full bg-gray-300 text-gray-700 py-2 text-sm font-semibold text-center rounded shadow-lg hover:bg-gray-400 transition-all"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
