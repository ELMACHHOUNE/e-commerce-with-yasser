import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-lg px-4 py-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            We can't find that page.
          </h1>
          <p className="mt-4 text-gray-500">
            Try searching again, or return home to start from the beginning.
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </a>
        </div>
      </div>
      <img
        src="/assets/Error.webp"
        alt="Error Page"
        className="w-full h-60 object-cover mb-6" // Shorter height
      />
    </div>
  );
};

export default ErrorPage;
