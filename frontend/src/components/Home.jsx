import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "/assets/LOGO-dark-mode.webp";
import Banner1 from "/assets/banner1.webp";
import Banner2 from "/assets/banner2.webp";
import Banner3 from "/assets/banner3.webp";

const Home = () => {
  const banners = [Banner1, Banner2, Banner3];
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleNext = () => {
    setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
  };

  const handlePrevious = () => {
    setCurrentBanner((prevBanner) => (prevBanner - 1 + banners.length) % banners.length);
  };

  return (
    <section className="relative mx-auto min-h-screen" style={{ backgroundColor: '#111827' }}>
      {/* Preload important images */}
      <link rel="preload" href={Logo} as="image" />
      <link rel="preload" href={Banner1} as="image" />
      <link rel="preload" href={Banner2} as="image" />
      <link rel="preload" href={Banner3} as="image" />

      {/* Banner Section */}
      <div className="relative mx-auto max-w-7xl h-56 sm:h-72 lg:h-80 overflow-hidden rounded-lg shadow-lg mb-8">
        {banners.map((banner, index) => (
          <img
            key={index}
            srcSet={`
              ${banner} 1200w,
              ${banner} 800w,
              ${banner} 480w
            `}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            src={banner}
            alt={`Banner ${index + 1}`}
            loading={index === currentBanner ? "eager" : "lazy"} // Load current banner eagerly
            className={`w-full h-full object-cover absolute transition-opacity duration-1000 ease-in-out ${
              index === currentBanner ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 rounded-full p-2 text-white shadow-lg hover:bg-opacity-90 transition"
          aria-label="Previous Banner"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 rounded-full p-2 text-white shadow-lg hover:bg-opacity-90 transition"
          aria-label="Next Banner"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Content Section */}
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Background Blur */}
        <div
          className="absolute inset-0 rounded-lg backdrop-blur-md z-0"
          style={{
            backgroundColor: '#111827',
            opacity: 0.7, // Adjusted for better visibility
          }}
        ></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* Logo */}
          <div className="flex justify-center lg:justify-end mb-8 lg:mb-0">
            <img
              src={Logo}
              alt="Logo"
              className="max-w-xs"
              loading="eager" // Load logo eagerly
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4 leading-tight">
              Welcome to <br /><strong className="text-yellow-400">MR TECHNOLOGIES</strong>
            </h1>

            <p className="text-gray-200 sm:text-lg mb-8 sm:leading-relaxed">
              Discover a wide range of products tailored to your needs. Experience quality and innovation like never before.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                to="/products"
                className="rounded-full bg-yellow-400 px-8 py-3 text-sm font-medium text-gray-800 shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-50"
                aria-label="Shop Now"
              >
                Shop Now
              </Link>

              <Link
                to="/learn-more"
                className="rounded-full bg-white px-8 py-3 text-sm font-medium text-gray-800 shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                aria-label="Learn More"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
