import apiClient from '../client';

// [GET] /api/chats
export const getChatList = async () => {
  try {
    const { data } = await apiClient.get('/api/chats');
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// [POST] /api/chats
export const newChatRoom = async (content) => {
  try {
    const { data } = await apiClient.get('/api/chats', content);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// [GET] /api/chats/{chatRoomId}/messages
export const ChatMessage = async (chatRoomId) => {
  try {
    const { data } = await apiClient.get(`/api/chats/${chatRoomId}/messages`);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// [POST] /api/chats/{chatRoomId}/messages
export const sendMessage = async (chatRoomId, content) => {
  try {
    const { data } = await apiClient.post(
      `/api/chats/${chatRoomId}/messages`,
      content
    );
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
