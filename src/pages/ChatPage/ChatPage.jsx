import MainLayout from '../../components/layout/MainLayout';
import { useChat } from '../../context/ChatContext';
import { useEffect, useState } from 'react';
import morakAI from '../../assets/morak-ai.png';

export default function ChatPage() {
  const [chatRoomId, setChatRoomId] = useState('');
  const [message, setMessage] = useState('');
  const {
    fetchChatList,
    chatList,
    fetchMessageList,
    msgList,
    sendMessages,
    msg,
  } = useChat();
  useEffect(() => {
    fetchChatList();
  }, []);
  useEffect(() => {
    fetchMessageList(chatRoomId);
  }, [chatRoomId]);

  const showChat = chatList?.find((item) => item.chatRoomId === chatRoomId);
  const onSubmit = async (e) => {
    e.preventDefault();
    const content = message.trim();
    try {
      await sendMessages(chatRoomId, content);
      await fetchMessageList(chatRoomId);
      setMessage('');
    } catch (e) {
      console.error(e);
      return null;
    }
  };
  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-64px)] bg-gradient-to-b from-sky-50 to-white flex justify-center items-center py-8">
        <div className="w-full max-w-6xl h-[770px] bg-white rounded-2xl shadow-xl border border-neutral-100 flex overflow-hidden">
          <div className="w-80 border-r border-neutral-200 flex flex-col bg-neutral-50">
            <h1 className="p-6 text-xl font-bold text-neutral-900 border-b border-neutral-200 bg-white">
              채팅 목록
            </h1>
            <div className="overflow-y-auto flex-1 flex flex-col custom-scrollbar">
              {chatList?.map((item) => (
                <button
                  type="button"
                  onClick={() => {
                    setChatRoomId(item.chatRoomId);
                    console.log(item.chatRoomId);
                  }}
                  key={item.chatRoomId}
                  className={`w-full p-4 flex items-center hover:bg-neutral-50 transition-colors ${
                    chatRoomId === item.chatRoomId ? 'bg-primary-50' : ''
                  }`}
                >
                  <img
                    src={item.profileImageUrl}
                    className="w-12 h-12 rounded-full bg-neutral-200 mr-3 object-cover"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h1 className="text-sm text-neutral-900 font-semibold truncate">
                        {item?.partnerName}
                      </h1>
                      <p className="text-xs text-neutral-400 ml-2 flex-shrink-0">
                        {item?.updatedAt.slice(0, 10).replaceAll('-', '.')}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-neutral-500 truncate flex-1">
                        {item?.lastMessage.content.slice(0, 20)}...
                      </p>
                      {item?.unreadCount > 0 && (
                        <span className="ml-2 w-5 h-5 rounded-full bg-error-500 text-white flex justify-center items-center text-xs font-medium flex-shrink-0">
                          {item?.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          {chatRoomId === '' ? (
            <div className="flex-1 flex flex-col gap-6 justify-center items-center">
              <img
                src={morakAI}
                alt=""
                className="w-32 h-32 rounded-full shadow-lg"
              />
              <h1 className="text-neutral-600 text-lg font-medium">
                새로운 채팅을 시작하세요!
              </h1>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="h-28 px-6 py-5 border-b border-neutral-200 flex items-center gap-4">
                <img
                  src={showChat?.profileImageUrl}
                  alt="profileImageUrl"
                  className="w-16 h-16 rounded-full bg-neutral-200 object-cover"
                />
                <div>
                  <h1 className="text-neutral-900 text-lg font-semibold">
                    {showChat?.partnerName}
                  </h1>
                  <p className="text-neutral-500 text-sm">
                    {showChat?.projectTitle}
                  </p>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-end">
                <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar px-6 py-4 flex-1">
                  {msgList?.map((item, idx) => (
                    <div key={idx}>
                      {item.senderRole === 'CLIENT' ? (
                        <div className="flex items-end justify-end gap-2">
                          <span className="text-xs text-neutral-400 mb-1">
                            {item.sentAt.slice(11, 16)}
                          </span>
                          <div className="px-4 py-3 rounded-2xl bg-primary-600 text-white max-w-md">
                            <p className="text-sm leading-relaxed">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-end justify-start gap-2">
                          <img
                            src={item.profileImageUrl}
                            alt="profileImageUrl"
                            className="w-8 h-8 bg-neutral-200 rounded-full object-cover"
                          />
                          <div className="px-4 py-3 rounded-2xl bg-neutral-100 max-w-md">
                            <p className="text-sm text-neutral-900 leading-relaxed">
                              {item.content}
                            </p>
                          </div>
                          <span className="text-xs text-neutral-400 mb-1">
                            {item.sentAt.slice(11, 16)}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={onSubmit}
                  className="px-6 py-4 border-t border-neutral-200 flex items-center gap-3"
                >
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 h-12 px-4 bg-neutral-100 rounded-xl border-none outline-none text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-neutral-50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="p-3 bg-sky-600 hover:bg-sky-700 rounded-xl transition-all hover:scale-105"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
