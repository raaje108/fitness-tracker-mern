import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <div className="pages">
        <Routes>
          {/* If user exists, show Home. If not, force them to Login */}
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          
          {/* If user exists, they don't need to see Login/Signup anymore */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;