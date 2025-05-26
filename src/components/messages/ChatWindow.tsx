import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { User, ChatBot, Message } from '../../types';

interface ChatWindowProps {
  recipient: User | ChatBot;
  isBot: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ recipient, isBot }) => {
  const { currentUser } = useAuth();
  const { getConversation, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const messages = getConversation(recipient.id);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !currentUser) return;
    
    sendMessage(recipient.id, newMessage, isBot);
    setNewMessage('');
  };
  
  // Scroll to bottom of messages on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  if (!currentUser) return null;
  
  // Function to format timestamp
  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          {isBot ? (
            <img 
              src={(recipient as ChatBot).avatar} 
              alt={recipient.username}
              className="w-full h-full object-cover" 
            />
          ) : (
            <img 
              src={(recipient as User).profilePicture || ''} 
              alt={recipient.username}
              className="w-full h-full object-cover" 
            />
          )}
        </div>
        
        <div>
          <h2 className="font-semibold">{recipient.username}</h2>
          <p className="text-xs text-gray-500">
            {isBot ? 'Bot' : 'Online'}
          </p>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>No messages yet. Say hello!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message: Message) => (
              <div 
                key={message.id}
                className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                    message.senderId === currentUser.id 
                      ? 'bg-red-500 text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p>{message.content}</p>
                  <div 
                    className={`text-xs mt-1 ${
                      message.senderId === currentUser.id ? 'text-red-100' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={`Message ${recipient.username}...`}
          className="flex-1 py-2 px-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <button 
          type="submit" 
          disabled={!newMessage.trim()}
          className="ml-2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;