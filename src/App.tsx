import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import AuthPage from './components/auth/AuthPage';
import DiscoverPage from './components/discover/DiscoverPage';
import MessagesPage from './components/messages/MessagesPage';
import ProfilePage from './components/profile/ProfilePage';
import Navbar from './components/layout/Navbar';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { currentUser } = useAuth();
  
  return (
    <Router>
      {currentUser && <Navbar />}
      <Routes>
        <Route path="/auth" element={currentUser ? <Navigate to="/" /> : <AuthPage />} />
        
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <DiscoverPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/messages" 
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <AppRoutes />
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;