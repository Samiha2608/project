import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


const AdminLogin = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginAdmin({ username, password }));
    setUsername('');
    setPassword('');
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-8">Admin Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-xs">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="p-2 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
