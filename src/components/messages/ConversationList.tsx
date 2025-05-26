import React from 'react';
import { User, ChatBot } from '../../types';

interface ConversationListProps {
  items: Array<User | ChatBot>;
  onSelectChat: (item: User | ChatBot) => void;
  selectedChatId: string | undefined;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  items, 
  onSelectChat,
  selectedChatId
}) => {
  // Function to determine if the item is a bot
  const isBot = (item: User | ChatBot): item is ChatBot => {
    return 'bio' in item && 'avatar' in item;
  };
  
  // Get the appropriate image URL depending on item type
  const getImageUrl = (item: User | ChatBot): string => {
    if (isBot(item)) {
      return item.avatar;
    } else {
      return item.profilePicture || '';
    }
  };
  
  return (
    <div className="overflow-y-auto max-h-[calc(100vh-13rem)]">
      {items.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No conversations yet
        </div>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelectChat(item)}
                className={`w-full p-3 flex items-center hover:bg-gray-50 ${
                  selectedChatId === item.id ? 'bg-red-50' : ''
                }`}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                  {getImageUrl(item) ? (
                    <img 
                      src={getImageUrl(item)} 
                      alt={item.username}
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      {item.username.charAt(0)}
                    </div>
                  )}
                  
                  {isBot(item) && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{item.username}</h3>
                    <span className="text-xs text-gray-500">12m</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate">
                    {isBot(item) 
                      ? item.bio
                      : 'Click to start a conversation'}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConversationList;