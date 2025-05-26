import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, you'd make an API call here
      const mockUser: User = {
        id: '1',
        username: 'testuser',
        email,
        profilePicture: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
        bio: 'I love hiking and photography',
        age: 28,
        location: 'New York',
        interests: ['hiking', 'photography', 'travel'],
        createdAt: new Date(),
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setCurrentUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock signup function
  const signup = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, you'd make an API call here
      const mockUser: User = {
        id: Date.now().toString(),
        username,
        email,
        createdAt: new Date(),
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setCurrentUser(mockUser);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!currentUser) return;
    
    try {
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};