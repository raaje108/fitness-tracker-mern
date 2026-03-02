import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    // Remove token from local storage and clear global state
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Fit<span className="text-blue-600">Track</span>
          </h1>
        </Link>
        <nav className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <button onClick={handleLogout} className="border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-50 transition-colors">Log out</button>
            </div>
          )}
          {!user && (
            <div className="flex gap-4">
              <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">Login</Link>
              <Link to="/signup" className="text-gray-600 hover:text-blue-600 transition-colors">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;