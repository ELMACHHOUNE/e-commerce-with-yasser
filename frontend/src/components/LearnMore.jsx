import React, { useEffect } from 'react';
import Logo from '/public/assets/LOGO-dark-mode.webp'; 
import ReviewImage from '/public/assets/Review.webp'; 
import 'keen-slider/keen-slider.min.css';
import KeenSlider from 'https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/+esm';
import ScrollToTopButton from '../components/ScrollToTopButton';

const testimonials = [
  {
    name: "OUSSAMA EZITOUNI",
    occupation: "Software Engineer",
    review: "This store is fantastic! The selection is incredible and the service is top-notch. Highly recommend to anyone looking for quality tech products.",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQHnezsPP4zFNg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722161912259?e=1730937600&v=beta&t=orCsKmJDWua7uGqlCAN09SpsvvKqXaBW9_VWAcNS858",
    stars: 5,
  },
  {
    name: "ISSAM ELJAOUHARI",
    occupation: "Full-stack developer",
    review: "Absolutely love shopping here! The customer service is exceptional,  Will definitely be a repeat customer.",
    image: "https://media.licdn.com/dms/image/v2/D4E35AQGQqAqfymnbqA/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1726779831296?e=1727452800&v=beta&t=Kb4rL8btnHisvpNahTL_71bkJvEKZ9AVy-scIFRYUcs",
    stars: 5,
  },
  {
    name: "AZEDDINE AIT TAAKAT",
    occupation: "Full-stack developer",
    review: "The variety of tech products available is impressive, and the prices are competitive. A go-to store for all my tech needs.",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQHz0uPasUf6Eg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1721308931577?e=1730937600&v=beta&t=d9In-TXDC7gPJngddrQ4nlJbyHjrgpZlHyd0ctmZ1pI",
    stars: 5,
  },
  {
    name: "YASSINE EL MOUSS",
    occupation: "Web Developer FULLSTACK & Software instructor",
    review: "Great experience shopping here. The website is user-friendly, Highly recommend for tech enthusiasts.",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQFrWsPmXQgbPw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720787326813?e=1730937600&v=beta&t=kYYvXqCsWBRDZFyHkEhDv9AOz40rB_4ZBUE3RgYEclU",
    stars: 5,
  }
];

const LearnMore = () => {
  useEffect(() => {
    const keenSlider = new KeenSlider(
      '#keen-slider',
      {
        loop: true,
        slides: {
          origin: 'center',
          perView: 1,
          spacing: 16,
        },
        breakpoints: {
          '(min-width: 1024px)': {
            slides: {
              origin: 'auto',
              perView: 1.5,
              spacing: 32,
            },
          },
        },
      }
    );

    const keenSliderPrevious = document.getElementById('keen-slider-previous');
    const keenSliderNext = document.getElementById('keen-slider-next');

    keenSliderPrevious.addEventListener('click', () => keenSlider.prev());
    keenSliderNext.addEventListener('click', () => keenSlider.next());
  }, []);

  return (
    <>
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-lg text-center">
            <img src={Logo} alt="Logo" className="mx-auto mb-6 h-24" loading="lazy"/>
            <h2 className="text-3xl font-bold sm:text-4xl">Learn More About us</h2>
            <p className="mt-4 text-gray-300">
              Welcome to MR TECHNOLOGIES! We offer the latest in technology hardware, from laptops to accessories, with a focus on quality and affordability. Explore our store to find products that meet your needs and discover how we can help you with your tech requirements.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-blue-500 hover:shadow-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 3v6h2V5h4v4h2V5h4v4h2V3H5zm0 8h14v2H5v-2zm0 4h14v2H5v-2zM3 14h18v6H3v-6z" />
              </svg>
              <h3 className="mt-4 text-xl font-bold text-white">Shipping Information</h3>
              <p className="mt-1 text-sm text-gray-300">We offer fast and reliable shipping options to ensure that your orders reach you on time. Enjoy free shipping on orders over a certain amount and track your package every step of the way.</p>
            </div>

            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-blue-500 hover:shadow-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm6.5-5.5l-1.4 1.4 1.4 1.4 1.4-1.4-1.4-1.4z" />
              </svg>
              <h3 className="mt-4 text-xl font-bold text-white">Pricing Information</h3>
              <p className="mt-1 text-sm text-gray-300">We offer competitive pricing on all our products. Check out our special promotions and discounts to get the best value for your money.</p>
            </div>

            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-blue-500 hover:shadow-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="size-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z" />
              </svg>
              <h3 className="mt-4 text-xl font-bold text-white">Product Categories</h3>
              <p className="mt-1 text-sm text-gray-300">Explore our wide range of product categories, including laptops, accessories, and more. Find exactly what you're looking for with our easy-to-navigate categories.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:py-16 xl:py-24">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            {/* Image on the left */}
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
              <img
                src={ReviewImage}
                alt="Customer Reviews"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>

            {/* Review Slider on the right */}
            <div className="lg:w-1/2">
            
              <div className="flex justify-between items-end">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Read trusted reviews from our customers
                </h2>

                <div className="mt-8 flex gap-4 lg:mt-0">
                  <button aria-label="Previous slide" id="keen-slider-previous" className="rounded-full border border-blue-600 p-3 text-blue-600 transition hover:bg-blue-600 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 rtl:rotate-180">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  <button aria-label="Next slide" id="keen-slider-next" className="rounded-full border border-blue-600 p-3 text-blue-600 transition hover:bg-blue-600 hover:text-white">
                    <svg className="size-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 19.5l7.5-7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>
              </div>

              <div id="keen-slider" className="keen-slider mt-8">
                {testimonials.map((testimonial, index) => (
                  <div className="keen-slider__slide" key={index}>
                    <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md">
                      <img
                        className="w-24 h-24 rounded-full object-cover"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <h3 className="mt-4 text-lg font-bold text-white">{testimonial.name}</h3>
                      <p className="mt-1 text-sm text-gray-400">{testimonial.occupation}</p>
                      <p className="mt-4 text-base text-gray-300">{testimonial.review}</p>
                      <div className="mt-4 flex space-x-1 text-yellow-400">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ScrollToTopButton/>
        
      </section>
    </>
  );
};

export default LearnMore;
