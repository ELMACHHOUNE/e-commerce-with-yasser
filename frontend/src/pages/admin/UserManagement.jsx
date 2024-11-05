import React from 'react';

const UserManagement = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h2 className="text-2xl font-bold">User Management</h2>
      <table className="mt-4 min-w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Role</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example Row */}
          <tr className="border-b border-gray-700 hover:bg-gray-700">
            <td className="p-3">John Doe</td>
            <td className="p-3">john@example.com</td>
            <td className="p-3">Admin</td>
            <td className="p-3">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline ml-4">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
