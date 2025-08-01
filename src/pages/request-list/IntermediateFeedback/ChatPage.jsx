import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';

import arrowIcon from '../../../assets/RequestList/IntermediateFeedback/arrow-icon.png';
import folderIcon from '../../../assets/RequestList/IntermediateFeedback/folder-icon.png';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState([
    {
      sender: 'bot',
      name: '김락모',
      text: '안녕하세요! 무엇을 도와드릴까요?',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  const handleSendMessage = (userText) => {
    const now = new Date().toLocaleTimeString();

    setMessage((prev) => [
      ...prev,
      {
        sender: 'user',
        name: '김모락',
        text: userText,
        timestamp: now,
      },
    ]);
    setTimeout(() => {
      setMessage((prev) => [
        ...prev,
        {
          sender: 'bot',
          name: '김락모',
          text: `"${userText}"에 대해 확인해보겠습니다.`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }, 1000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    handleSendMessage(input);
    setInput('');
  };
  return (
    <div className="bg-[#F7F8FC] h-[270px] rounded-[15px] pl-[30px] pr-[10px] pt-[20px] pb-[10px] flex flex-col justify-between">
      <div
        className={`h-[80%] pr-[18px] custom-scrollbar overflow-y-auto flex flex-col mb-[10px] gap-[10px]`}
      >
        {message.map((msg, i) => (
          <div className={`${message.length <= 2 && i <= 1 ? 'mt-auto' : ''} `}>
            <MessageBubble message={msg} key={i} />
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <div className=" flex h-[20%] bg-[#EDEFF7] items-center rounded-[35px] px-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="w-[95%] h-[50px] rounded-[35px] outline-none px-[10px]"
        />
        <div className="flex gap-[10px]">
          <button className="w-[24px] h-[24px]">
            <img src={folderIcon} alt="folderIcon" />
          </button>
          <button
            onClick={handleSend}
            className="w-[24px] h-[24px] cursor-pointer"
          >
            <img src={arrowIcon} alt="arrowIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}
