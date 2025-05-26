import React, { useState } from 'react';
import { Camera, Edit2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [age, setAge] = useState(currentUser?.age || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [interests, setInterests] = useState(currentUser?.interests?.join(', ') || '');
  
  const handleSave = async () => {
    try {
      await updateProfile({
        bio,
        age: Number(age),
        location,
        interests: interests.split(',').map(i => i.trim()).filter(i => i),
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real app, you'd upload this file to a server
    // For now, we'll just create a local URL for preview
    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target?.result) {
        await updateProfile({
          profilePicture: event.target.result as string,
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  if (!currentUser) return null;
  
  return (
    <div className="container mx-auto max-w-2xl pt-16 pb-24 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-red-400 to-red-600">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200">
              {currentUser.profilePicture ? (
                <img 
                  src={currentUser.profilePicture} 
                  alt={currentUser.username} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Photo
                </div>
              )}
              
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center cursor-pointer">
                <Camera className="w-4 h-4 text-white" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        </div>
        
        <div className="pt-20 px-6 pb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{currentUser.username}</h1>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="text-red-600 flex items-center"
            >
              <Edit2 className="w-4 h-4 mr-1" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
          
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Interests (comma-separated)</label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. hiking, movies, cooking"
                />
              </div>
              
              <button
                onClick={handleSave}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">About Me</h2>
                <p className="text-gray-700">{currentUser.bio || 'No bio yet'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-600">Age</h3>
                  <p>{currentUser.age || 'Not specified'}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-600">Location</h3>
                  <p>{currentUser.location || 'Not specified'}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-600">Interests</h3>
                {currentUser.interests && currentUser.interests.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentUser.interests.map((interest, index) => (
                      <span 
                        key={index} 
                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p>No interests specified</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">My Photos</h2>
        <div className="grid grid-cols-3 gap-2">
          {currentUser.profilePicture && (
            <div className="aspect-square rounded-md overflow-hidden">
              <img 
                src={currentUser.profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <label className="aspect-square rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
            <Camera className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-sm text-gray-500">Add Photo</span>
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;