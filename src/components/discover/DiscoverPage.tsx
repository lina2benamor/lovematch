import React, { useState } from 'react';
import { Heart, X, MessageCircle } from 'lucide-react';
import { User } from '../../types';

// Mock user data
const mockUsers: User[] = [
  {
    id: 'user1',
    username: 'Emma',
    email: 'emma@example.com',
    profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    bio: 'Adventure seeker and coffee enthusiast. Love hiking and photography.',
    age: 27,
    location: 'Los Angeles',
    interests: ['hiking', 'photography', 'travel'],
    createdAt: new Date()
  },
  {
    id: 'user2',
    username: 'Alex',
    email: 'alex@example.com',
    profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    bio: 'Music lover and coffee addict. Always looking for new adventures.',
    age: 30,
    location: 'Chicago',
    interests: ['music', 'coffee', 'art'],
    createdAt: new Date()
  },
  {
    id: 'user3',
    username: 'Sophia',
    email: 'sophia@example.com',
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    bio: 'Bookworm and yoga instructor. Love quiet evenings and deep conversations.',
    age: 28,
    location: 'New York',
    interests: ['yoga', 'reading', 'cooking'],
    createdAt: new Date()
  },
  {
    id: 'user4',
    username: 'James',
    email: 'james@example.com',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    bio: 'Tech enthusiast and foodie. Looking for someone to explore new restaurants with.',
    age: 32,
    location: 'San Francisco',
    interests: ['technology', 'food', 'hiking'],
    createdAt: new Date()
  },
  {
    id: 'user5',
    username: 'Olivia',
    email: 'olivia@example.com',
    profilePicture: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    bio: 'Artist and animal lover. Spend most of my weekends at art galleries or dog parks.',
    age: 26,
    location: 'Portland',
    interests: ['art', 'animals', 'nature'],
    createdAt: new Date()
  }
];

const DiscoverPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedUsers, setLikedUsers] = useState<string[]>([]);
  const [matches, setMatches] = useState<User[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  
  const currentUser = mockUsers[currentIndex];
  
  const handleLike = () => {
    setLikedUsers(prev => [...prev, currentUser.id]);
    
    // Simulate a match (50% chance)
    if (Math.random() > 0.5) {
      setMatchedUser(currentUser);
      setMatches(prev => [...prev, currentUser]);
      setShowMatchModal(true);
    }
    
    goToNextUser();
  };
  
  const handleDislike = () => {
    goToNextUser();
  };
  
  const goToNextUser = () => {
    if (currentIndex < mockUsers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reset to the beginning when we've gone through all users
      // In a real app, you'd fetch more users from the API
      setCurrentIndex(0);
    }
  };
  
  const closeMatchModal = () => {
    setShowMatchModal(false);
    setMatchedUser(null);
  };
  
  return (
    <div className="container mx-auto max-w-md pt-16 pb-24 px-4">
      <div className="mb-6 flex justify-center">
        <h1 className="text-2xl font-bold text-red-600">Discover</h1>
      </div>
      
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-96 relative">
          <img
            src={currentUser.profilePicture}
            alt={currentUser.username}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
            <h2 className="text-2xl font-bold">{currentUser.username}, {currentUser.age}</h2>
            <p className="text-sm">{currentUser.location}</p>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <h3 className="font-semibold mb-1">About</h3>
            <p className="text-gray-700">{currentUser.bio}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-1">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {currentUser.interests?.map((interest, index) => (
                <span 
                  key={index} 
                  className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center p-4 gap-6">
          <button 
            onClick={handleDislike}
            className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition"
          >
            <X className="w-7 h-7 text-gray-500" />
          </button>
          
          <button 
            onClick={handleLike}
            className="w-14 h-14 rounded-full bg-red-600 shadow-md flex items-center justify-center hover:bg-red-700 transition"
          >
            <Heart className="w-7 h-7 text-white" />
          </button>
        </div>
      </div>
      
      {showMatchModal && matchedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-red-100 animate-ping opacity-25"></div>
              <div className="relative rounded-full overflow-hidden border-4 border-red-500">
                <img 
                  src={matchedUser.profilePicture} 
                  alt={matchedUser.username} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-red-600 mb-2">It's a Match!</h2>
            <p className="text-gray-700 mb-6">You and {matchedUser.username} liked each other</p>
            
            <div className="flex gap-3">
              <button
                onClick={closeMatchModal}
                className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Keep Swiping
              </button>
              
              <button
                onClick={closeMatchModal}
                className="flex-1 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center justify-center"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;