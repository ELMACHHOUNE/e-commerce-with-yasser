import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Logo from '/public/assets/LOGO-dark-mode.webp';

const AdminDashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <aside className="w-64 bg-gray-900 text-white shadow-lg">
        <div className="flex items-center justify-center h-20 border-b border-gray-800">
          <img src={Logo} alt="Logo" className="h-16" />
        </div>
        <nav className="flex flex-col p-4">
          <a href="/admin/users" className="py-2 hover:bg-gray-700 rounded transition duration-300">User Management</a>
          <a href="/admin/products" className="py-2 hover:bg-gray-700 rounded transition duration-300">Product Management</a>
          <a href="/admin/orders" className="py-2 hover:bg-gray-700 rounded transition duration-300">Order Management</a>
        </nav>
      </aside>

      <div className="flex-grow p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your application efficiently.</p>
        </header>

        <main className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold">Welcome to the Admin Dashboard</h2>
          <p className="mt-2 text-gray-700">Here you can manage users, products, and orders.</p>

          {/* Nested routes will be rendered here */}
          <div className="mt-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
