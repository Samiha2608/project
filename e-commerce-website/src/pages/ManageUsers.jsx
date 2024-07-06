import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, deleteUser, updateUser } from '../redux/slices/usersSlice';

const ManageUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSaveUser = (user) => {
    if (currentUser) {
      dispatch(updateUser(user));
    } else {
      dispatch(addUser(user));
    }
    setCurrentUser(null);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <UserForm
        currentUser={currentUser}
        onSave={handleSaveUser}
      />
      <h2 className="text-2xl font-bold mt-8">User List</h2>
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.role}</td>
              <td className="py-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserForm = ({ currentUser, onSave }) => {
  const [name, setName] = useState(currentUser ? currentUser.name : '');
  const [email, setEmail] = useState(currentUser ? currentUser.email : '');
  const [role, setRole] = useState(currentUser ? currentUser.role : 'user');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      id: currentUser ? currentUser.id : Date.now(),
      name,
      email,
      role,
    };
    onSave(user);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{currentUser ? 'Edit User' : 'Add User'}</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {currentUser ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};

export default ManageUsers;
