'use client';

import { createContext, useContext, useState } from 'react';

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
}

type ChatPageContextType = {
  chats: Chat[];
  currentChatId: string | null;
  currentChat: Chat | null;
  createNewChat: (message: Message) => void;
  addMessageToChat: (message: Message) => void;
  deleteChat: (chatId: string) => void;
  setCurrentChatId: (chatId: string | null) => void;
};

const ChatPageStateContext = createContext<ChatPageContextType | null>(null);

// TODO: 추후 실제 로직 들어오면 메모이제이션, 함수 분리 등으로 리팩토링
export const ChatPageStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId) || null;

  const createNewChat = (message: Message) => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: message.content.slice(0, 30) + (message.content.length > 30 ? '...' : ''),
      messages: [message],
      createdAt: new Date(),
    };
    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const addMessageToChat = (message: Message) => {
    if (!currentChatId) return;
    setChats((prev) =>
      prev.map((chat) => (chat.id === currentChatId ? { ...chat, messages: [...chat.messages, message] } : chat)),
    );
  };

  const deleteChat = (chatId: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  return (
    <ChatPageStateContext.Provider
      value={{
        chats,
        currentChatId,
        currentChat,
        createNewChat,
        addMessageToChat,
        deleteChat,
        setCurrentChatId,
      }}
    >
      {children}
    </ChatPageStateContext.Provider>
  );
};

export const useChatPageState = () => {
  const context = useContext(ChatPageStateContext);
  if (!context) throw new Error('useChatPageState must be used within ChatPageStateProvider');
  return context;
};
