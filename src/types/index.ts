export interface User {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  age?: number;
  location?: string;
  interests?: string[];
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isBot: boolean;
  read: boolean;
}

export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  createdAt: Date;
}

export interface Like {
  id: string;
  userId: string;
  likedUserId: string;
  photoId?: string;
  createdAt: Date;
}

export interface Photo {
  id: string;
  userId: string;
  url: string;
  description?: string;
  createdAt: Date;
}

export interface ChatBot {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}