import React from 'react';

const OrderManagement = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h2 className="text-2xl font-bold">Order Management</h2>
      <table className="mt-4 min-w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left p-3">Order ID</th>
            <th className="text-left p-3">Customer Name</th>
            <th className="text-left p-3">Total</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example Row */}
          <tr className="border-b border-gray-700 hover:bg-gray-700">
            <td className="p-3">#12345</td>
            <td className="p-3">Alice Johnson</td>
            <td className="p-3">$150.00</td>
            <td className="p-3">Pending</td>
            <td className="p-3">
              <button className="text-blue-500 hover:underline">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
