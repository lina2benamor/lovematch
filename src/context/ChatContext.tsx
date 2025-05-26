import React, { createContext, useContext, useState, useEffect } from 'react';
import { Message, User, ChatBot } from '../types';
import { useAuth } from './AuthContext';

interface ChatContextType {
  messages: Record<string, Message[]>;
  sendMessage: (receiverId: string, content: string, isBot?: boolean) => void;
  getConversation: (userId: string) => Message[];
  chatBots: ChatBot[];
  recentChats: Array<User | ChatBot>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// Sample chat bots
const sampleBots: ChatBot[] = [
  {
    id: 'bot1',
    name: 'LoveBot',
    avatar: 'https://images.pexels.com/photos/7242908/pexels-photo-7242908.jpeg',
    bio: 'I can help you find your perfect match!'
  },
  {
    id: 'bot2',
    name: 'DateAdvisor',
    avatar: 'https://images.pexels.com/photos/8438923/pexels-photo-8438923.jpeg',
    bio: 'Dating tips and advice just for you'
  },
  {
    id: 'bot3',
    name: 'Cupid',
    avatar: 'https://images.pexels.com/photos/8090137/pexels-photo-8090137.jpeg',
    bio: 'Let me match you with your soulmate'
  }
];

// Mock user data for conversations
const mockUsers: User[] = [
  {
    id: 'user1',
    username: 'emma',
    email: 'emma@example.com',
    profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    bio: 'Adventure seeker',
    age: 27,
    location: 'Los Angeles',
    interests: ['hiking', 'yoga', 'travel'],
    createdAt: new Date()
  },
  {
    id: 'user2',
    username: 'alex',
    email: 'alex@example.com',
    profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    bio: 'Music lover and coffee addict',
    age: 30,
    location: 'Chicago',
    interests: ['music', 'coffee', 'art'],
    createdAt: new Date()
  }
];

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [recentChats, setRecentChats] = useState<Array<User | ChatBot>>([]);

  // Initialize with mock data
  useEffect(() => {
    if (currentUser) {
      // Load messages from localStorage or initialize with mock data
      const storedMessages = localStorage.getItem('messages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        // Create some mock messages
        const initialMessages: Record<string, Message[]> = {};
        
        // Messages with users
        mockUsers.forEach(user => {
          initialMessages[user.id] = [
            {
              id: `msg-${Date.now()}-1`,
              senderId: user.id,
              receiverId: currentUser.id,
              content: `Hi ${currentUser.username}! How are you?`,
              timestamp: new Date(Date.now() - 3600000),
              isBot: false,
              read: true
            },
            {
              id: `msg-${Date.now()}-2`,
              senderId: currentUser.id,
              receiverId: user.id,
              content: 'I\'m good, thanks for asking! How about you?',
              timestamp: new Date(Date.now() - 3000000),
              isBot: false,
              read: true
            }
          ];
        });
        
        // Messages with bots
        sampleBots.forEach(bot => {
          initialMessages[bot.id] = [
            {
              id: `msg-${Date.now()}-3`,
              senderId: bot.id,
              receiverId: currentUser.id,
              content: `Hello ${currentUser.username}! I'm ${bot.name}. How can I help you today?`,
              timestamp: new Date(Date.now() - 7200000),
              isBot: true,
              read: true
            }
          ];
        });
        
        setMessages(initialMessages);
        localStorage.setItem('messages', JSON.stringify(initialMessages));
      }

      // Set recent chats
      setRecentChats([...mockUsers, ...sampleBots].slice(0, 5));
    }
  }, [currentUser]);

  const sendMessage = (receiverId: string, content: string, isBot = false) => {
    if (!currentUser) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      content,
      timestamp: new Date(),
      isBot,
      read: false
    };
    
    setMessages(prev => {
      const conversation = prev[receiverId] || [];
      const updated = {
        ...prev,
        [receiverId]: [...conversation, newMessage]
      };
      
      localStorage.setItem('messages', JSON.stringify(updated));
      return updated;
    });
    
    // For bot messages, simulate a response
    if (isBot) {
      setTimeout(() => {
        const botResponses = [
          "That's interesting! Tell me more about yourself.",
          "I think you might like some of our new members. Want to see?",
          "Based on your profile, I can suggest some great matches for you!",
          "Have you updated your profile recently? It helps find better matches.",
          "What are you looking for in a potential match?"
        ];
        
        const botMessage: Message = {
          id: `msg-${Date.now()}-response`,
          senderId: receiverId,
          receiverId: currentUser.id,
          content: botResponses[Math.floor(Math.random() * botResponses.length)],
          timestamp: new Date(),
          isBot: true,
          read: false
        };
        
        setMessages(prev => {
          const conversation = prev[receiverId] || [];
          const updated = {
            ...prev,
            [receiverId]: [...conversation, botMessage]
          };
          
          localStorage.setItem('messages', JSON.stringify(updated));
          return updated;
        });
      }, 1000);
    }
  };

  const getConversation = (userId: string): Message[] => {
    return messages[userId] || [];
  };

  const value = {
    messages,
    sendMessage,
    getConversation,
    chatBots: sampleBots,
    recentChats
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};