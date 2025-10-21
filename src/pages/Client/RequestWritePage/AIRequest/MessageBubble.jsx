export default function MessageBubble({ message }) {
  return (
    <div className="flex flex-col gap-3">
      {message?.answer === null && message?.parentQuestionId !== null && (
        <div className="inline-block bg-neutral-100 px-4 py-3 rounded-2xl self-start max-w-2xl">
          <h1 className="text-xs font-medium text-neutral-500 mb-2">
            모락 AI · {message?.createdAt.slice(0, 10).replaceAll('-', '.')}{' '}
            {message?.createdAt.slice(11, 16)}
          </h1>
          <p className="text-sm text-neutral-900 leading-relaxed">{message.question}</p>
        </div>
      )}
      {message?.answer !== null && (
        <div className="inline-block px-4 py-3 rounded-2xl self-end max-w-2xl" style={{ backgroundColor: '#0284C7' }}>
          <h1 className="text-xs font-medium mb-2" style={{ color: '#E0F2FE' }}>
            나 · {message?.createdAt.slice(0, 10).replaceAll('-', '.')}{' '}
            {message?.createdAt.slice(11, 16)}
          </h1>
          <p className="text-sm text-white leading-relaxed">{message.answer}</p>
        </div>
      )}
    </div>
  );
}
