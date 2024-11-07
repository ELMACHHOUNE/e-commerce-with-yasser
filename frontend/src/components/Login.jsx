import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import logo from '/assets/Mobile-login.webp';

const Login = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleRegisterRedirect = (event) => {
    event.preventDefault();
    navigate('/register');
  };

  const handleDismiss = () => {
    setSuccess(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      setError('Please fill out all required fields.');
      setSuccess(null);
      return;
    }

    try {
      const data = await authService.login(email, password);
      setError(null);
      setSuccess('Successfully logged in.');

      // Store the token in local storage (or session storage for temporary sessions)
      localStorage.setItem('token', data.token); // Assuming `data.token` is the JWT

      // Check if the user is an admin and navigate accordingly
      if (data.isAdmin) {
        navigate('/admin'); // Admin dashboard route
      } else {
        navigate('/'); // Regular user route (home page)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login.');
      setSuccess(null);
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
              Welcome Back
            </h2>
            <p className="mt-4 text-white/90">
              Sign in to access your account and continue where you left off.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-lg w-full">
            {success && (
              <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4 mb-4">
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
                  <button className="text-gray-500 transition hover:text-gray-600" onClick={handleDismiss}>
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
              <div role="alert" className="rounded-xl border border-red-100 bg-red-50 p-4 mb-4">
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
                  <button className="text-red-500 transition hover:text-red-600">
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
              <div className="col-span-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white text-base text-gray-700 py-3 px-4 shadow-sm placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                  placeholder="Enter email"
                  required
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
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white text-base text-gray-700 py-3 px-4 shadow-sm placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                  placeholder="Enter password"
                  required
                />
              </div>

              <div className="col-span-6">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-gray-900 px-12 py-3 text-sm font-medium text-white shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300 ease-in-out"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              No account?{' '}
              <a href="/register" className="font-medium text-gray-900 hover:text-gray-700" onClick={handleRegisterRedirect}>
                Sign up
              </a>
            </p>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;
