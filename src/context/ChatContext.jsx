import { createContext, useContext, useState, useCallback } from 'react';
import {
  getChatList,
  ChatMessage,
  newChatRoom,
  sendMessage,
} from '../api/chat/chatApi';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [chatList, setChatList] = useState([]);
  const [msgList, setMsgList] = useState([]);
  const [msg, setMsg] = useState(null);

  // 채팅 목록
  const fetchChatList = useCallback(async () => {
    try {
      const data = await getChatList();
      setChatList(data);
      console.log(data);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, []);

  // 메시지 목록
  const fetchMessageList = useCallback(async (chatRoomId) => {
    try {
      const data = await ChatMessage(chatRoomId);
      setMsgList(Array.isArray(data) ? [...data] : []);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, []);

  const sendMessages = useCallback(async (chatRoomId, content) => {
    try {
      setMsg(content);
      const data = await sendMessage(chatRoomId, content);
      await fetchMessageList(chatRoomId);
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, []);

  const value = {
    fetchChatList,
    chatList,
    fetchMessageList,
    msgList,
    sendMessages,
    msg,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('ChatContext');
  return ctx;
}
