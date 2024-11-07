import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure you have installed Axios
import logo from '/assets/Sign-up.webp';

const Register = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleLoginRedirect = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();

    // Clear previous messages
    setError(null);
    setSuccess(null);

    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill out all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Call the registration API (adjust the URL according to your backend)
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.data.success) {
        setSuccess('Your account has been created successfully.');
        // Optionally redirect to login after successful registration
        navigate('/login');
      } else {
        setError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error(err);
    }
  };

  return (
    <section className="relative bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Background"
            src={logo}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Create Your Account
            </h2>
            <p className="mt-4 text-white/90">
              Sign up to start your journey with us. Enjoy personalized features and updates.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-lg w-full">
            {success && (
              <div role="alert" aria-live="assertive" className="rounded-xl border border-gray-100 bg-white p-4 mb-4">
                <div className="flex items-start gap-4">
                  <span className="text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <strong className="block font-medium text-gray-900"> Success </strong>
                    <p className="mt-1 text-sm text-gray-700">{success}</p>
                  </div>
                  <button
                    onClick={() => setSuccess(null)}
                    className="text-gray-500 transition hover:text-gray-600"
                  >
                    <span className="sr-only">Dismiss popup</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div role="alert" aria-live="assertive" className="rounded-xl border border-red-100 bg-red-50 p-4 mb-4">
                <div className="flex items-start gap-4">
                  <span className="text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <strong className="block font-medium text-gray-900"> Something went wrong </strong>
                    <p className="mt-1 text-sm text-red-700">{error}</p>
                  </div>
                  <button
                    onClick={() => setError(null)}
                    className="text-red-500 transition hover:text-red-600"
                  >
                    <span className="sr-only">Dismiss popup</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white text-base text-gray-700 py-3 px-4 shadow-sm placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white text-base text-gray-700 py-3 px-4 shadow-sm placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email.address@example.com"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white text-base text-gray-700 py-3 px-4 shadow-sm placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white text-base text-gray-700 py-3 px-4 shadow-sm placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white text-base text-gray-700 py-3 px-4 shadow-sm placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                />
              </div>

              <div className="col-span-6">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={handleLoginRedirect}
                className="text-blue-600 hover:text-blue-500 font-semibold"
              >
                Log In
              </button>
            </p>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Register;
