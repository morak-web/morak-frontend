import MainLayout from '../../components/layout/MainLayout';
import { useChat } from '../../context/ChatContext';
import { useEffect, useState } from 'react';
import morakAI from '../../assets/morak-ai.png';
import sendIcon from '../../assets/send-icon.png';

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
      <div className="w-full min-h-[calc(100vh-64px)] bg-[#F2F3FA] flex justify-center items-center">
        <div className="w-[1209px] h-[770px] bg-white py-[39px] px-[50px] rounded-[10px] shadow-lg flex">
          <div className="w-[300px] mr-[21px]">
            <h1 className="mb-[37px] text-[20px] font-bold text-[#525466]">
              채팅 목록
            </h1>
            <div className="overflow-y-auto h-[650px] flex flex-col gap-[30px]">
              {chatList?.map((item) => (
                <button
                  type="button"
                  onClick={() => {
                    setChatRoomId(item.chatRoomId);
                    console.log(item.chatRoomId);
                  }}
                  key={item.chatRoomId}
                  className="w-[290px] h-[70px] flex items-center cursor-pointer"
                >
                  <img
                    src={item.profileImageUrl}
                    className="w-[54px] h-[54px] rounded-[50%] bg-red-200 mr-[17px]"
                  />
                  <div className="flex flex-col mr-[5px] w-[220px]">
                    <div className="flex justify-between">
                      <h1 className="text-[15px] text-[#525466] font-medium">
                        {item?.partnerName}
                      </h1>
                      <p className="text-[11px] font-light text-[#525466]">
                        {item?.updatedAt.slice(0, 10).replaceAll('-', '.')}
                      </p>
                    </div>
                    <div className="flex items-start justify-between">
                      <p className="flex text-[13px] w-[190px] font-light text-[#525466]">
                        {item?.lastMessage.content.slice(0, 17)}...
                      </p>
                      <h1 className="w-[15px] mt-[2px] h-[15px] rounded-[50%] bg-red-400 text-white flex justify-center items-center text-[10px]">
                        {item?.unreadCount}2
                      </h1>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-[#5254664d] w-[1px] h-full" />
          {chatRoomId === '' ? (
            <div className="w-full pb-[200px] flex flex-col gap-[20px] justify-center items-center">
              <img
                src={morakAI}
                alt=""
                className="w-[130px] h-[130px] rounded-[50%]"
              />
              <h1 className="text-[#525466] text-[20px]">
                새로운 채팅을 시작하세요!
              </h1>
            </div>
          ) : (
            <div className="px-[21px] w-[780px]">
              <div className="h-[107px] px-[12px] py-[20px] border-b-[1px] border-[#5254664d] flex gap-[27px]">
                <img
                  src={showChat?.profileImageUrl}
                  alt="profileImageUrl"
                  className="w-[71px] h-[71px] rounded-[50%] bg-blue-200"
                />
                <div>
                  <h1 className="text-[#525466] text-[20px]">
                    {' '}
                    {showChat?.partnerName}
                  </h1>
                  <p className="font-light text-[#525466] text-[15px]">
                    {showChat?.projectTitle}
                  </p>
                </div>
              </div>
              <div className="h-[570px] flex flex-col justify-end gap-[24px]">
                <div className="flex flex-col h-[475px] gap-[29px] overflow-y-auto custom-scrollbar px-[15px]">
                  {msgList?.map((item) => (
                    <div key={item.content}>
                      {item.senderRole === 'CLIENT' ? (
                        <div className="flex items-end justify-end gap-[5px]">
                          <h1 className="text-[11px] mb-[5px] text-[#525466] font-light">
                            {item.sentAt.slice(11, 16)}
                          </h1>
                          <div className="px-[26px] py-[18px] rounded-[26px] bg-[#E6EFFF]">
                            <h1 className="text-[14px] text-[#525466]">
                              {item.content}
                            </h1>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-end justify-start ">
                          <img
                            src={item.profileImageUrl}
                            alt="profileImageUrl"
                            className="w-[42px] h-[42px] bg-blue-200 rounded-[50%]"
                          />
                          <div className="px-[26px] py-[18px] rounded-[26px] bg-[#F7F8FC] mr-[5px] ml-[13px]">
                            <h1 className="text-[14px] text-[#525466]">
                              {item.content}
                            </h1>
                          </div>
                          <h1 className="text-[11px] mb-[5px] text-[#525466] font-light">
                            {item.sentAt.slice(11, 16)}
                          </h1>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={onSubmit}
                  className="self-center ml-[36px] w-[700px] h-[51px] bg-[#EBEEFA] rounded-[35px] flex items-center justify-between px-[15px]"
                >
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="h-[40px] w-[600px] text-[#525466] border-none outline-none"
                  />
                  <button type="submit" className="cursor-pointer">
                    <img
                      src={sendIcon}
                      alt="sendIcon"
                      className="w-[24px] h-[24px]"
                    />
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
