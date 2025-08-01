export default function MessageBubble({ message }) {
  const isUser = message.sender === 'user';
  return (
    <div
      className={`flex text-[#525466] ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className="inline-block bg-white px-[14px] py-[11px]  rounded-[12px]">
        <h1 className="text-[14px] font-medium">
          {message.name} / {message.timestamp}
        </h1>
        <p className="text-[16px]">{message.text}</p>
      </div>
    </div>
  );
}
