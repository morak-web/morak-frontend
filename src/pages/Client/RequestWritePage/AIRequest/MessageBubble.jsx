export default function MessageBubble({ message }) {
  return (
    <div className={`flex flex-col text-[#525466] gap-[20px]`}>
      {message?.answer === null && message?.parentQuestionId !== null && (
        <div className="inline-block bg-[#F7F8FC] px-[14px] py-[11px]  rounded-[12px]  self-start">
          <h1 className="text-[14px] font-medium">
            모락 AI / {message?.createdAt.slice(0, 10).replaceAll('-', '.')}
            {'   '}
            {message?.createdAt.slice(11, 16)}
          </h1>
          <p className="text-[16px]">{message.question}</p>
        </div>
      )}
      {message?.answer !== null ? (
        <div className="inline-block bg-[#F7F8FC] px-[14px] py-[11px]  rounded-[12px] self-end">
          <h1 className="text-[14px] font-medium">
            나 / {message?.createdAt.slice(0, 10).replaceAll('-', '.')}
            {'   '}
            {message?.createdAt.slice(11, 16)}
          </h1>
          <p className="text-[16px]">{message.answer}</p>
        </div>
      ) : (
        // <div className="inline-block bg-[#F7F8FC] px-[14px] py-[11px]  rounded-[12px] self-end">
        //   <h1 className="text-[14px] font-medium">
        //     나 / {message?.createdAt.slice(0, 10).replaceAll('-', '.')}
        //     {'   '}
        //     {message?.createdAt.slice(11, 16)}
        //   </h1>
        //   <p className="text-[16px]">{message.answer}</p>
        // </div>
        ''
      )}
    </div>
  );
}
