import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    });
    
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      setUser(json);
      setError(null);
    }
  };

  return (
    <form className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-sm border border-gray-200" onSubmit={handleSubmit}>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Log In</h3>
      
      <label className="block text-sm font-medium text-gray-700 mb-1">Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <label className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        className="w-full p-2 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition-colors">
        Log In
      </button>
      
      {error && <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
    </form>
  );
};

export default Login;