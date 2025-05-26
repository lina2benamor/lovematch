import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, MessageCircle, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  
  if (!currentUser) return null;
  
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-3 md:top-0 md:bottom-auto md:border-t-0 md:border-b z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="hidden md:block">
            <Link to="/" className="text-red-600 font-bold text-xl">LoveMatch</Link>
          </div>
          
          <div className="flex justify-around w-full md:w-auto md:gap-6">
            <Link 
              to="/" 
              className={`flex flex-col items-center text-sm ${location.pathname === '/' ? 'text-red-600' : 'text-gray-500'}`}
            >
              <Heart className="w-6 h-6" />
              <span className="mt-1">Discover</span>
            </Link>
            
            <Link 
              to="/messages" 
              className={`flex flex-col items-center text-sm ${location.pathname.includes('/messages') ? 'text-red-600' : 'text-gray-500'}`}
            >
              <MessageCircle className="w-6 h-6" />
              <span className="mt-1">Messages</span>
            </Link>
            
            <Link 
              to="/profile" 
              className={`flex flex-col items-center text-sm ${location.pathname === '/profile' ? 'text-red-600' : 'text-gray-500'}`}
            >
              <User className="w-6 h-6" />
              <span className="mt-1">Profile</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <button 
              onClick={logout}
              className="flex items-center text-gray-500 hover:text-red-600"
            >
              <LogOut className="w-5 h-5 mr-1" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;