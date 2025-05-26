import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { User, ChatBot } from '../../types';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';

const MessagesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { recentChats, chatBots } = useChat();
  const [selectedChat, setSelectedChat] = useState<User | ChatBot | null>(null);
  const [activeTab, setActiveTab] = useState<'recent' | 'bots'>('recent');
  
  if (!currentUser) return null;
  
  return (
    <div className="container mx-auto max-w-5xl pt-16 pb-24 px-4 h-screen flex flex-col">
      <div className="bg-white rounded-lg shadow-md flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-80 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-red-600">Messages</h1>
            
            <div className="flex mt-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('recent')}
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === 'recent' 
                    ? 'text-red-600 border-b-2 border-red-600' 
                    : 'text-gray-500'
                }`}
              >
                Recent
              </button>
              <button
                onClick={() => setActiveTab('bots')}
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === 'bots' 
                    ? 'text-red-600 border-b-2 border-red-600' 
                    : 'text-gray-500'
                }`}
              >
                Bots
              </button>
            </div>
          </div>
          
          <ConversationList
            items={activeTab === 'recent' ? recentChats : chatBots}
            onSelectChat={setSelectedChat}
            selectedChatId={selectedChat?.id}
          />
        </div>
        
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <ChatWindow 
              recipient={selectedChat}
              isBot={'bio' in selectedChat && 'avatar' in selectedChat}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-red-600 text-2xl">💬</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">Your Messages</h2>
              <p className="text-gray-600 max-w-sm">
                Select a conversation to start chatting or discover new people to connect with
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;