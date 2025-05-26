import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-700 flex flex-col justify-center items-center p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-10 h-10 text-white fill-white" />
          <h1 className="text-3xl font-bold text-white ml-2">LoveMatch</h1>
        </div>
        <p className="text-white text-lg">Find your perfect match today</p>
      </div>
      
      {isLogin ? (
        <LoginForm onToggleForm={toggleForm} />
      ) : (
        <SignupForm onToggleForm={toggleForm} />
      )}
      
      <div className="mt-8 text-center text-white text-sm">
        <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  );
};

export default AuthPage;