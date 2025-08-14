const ChatListSection = () => {
  return (
    <section className="space-y-6">
      {messages.map((message) => (
        <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 sm:max-w-[70%] ${
              message.role === 'user'
                ? 'bg-primary ml-auto text-white'
                : 'border border-gray-200 bg-gray-100 text-gray-900'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start gap-3">
          <div className="rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3">
            <div className="flex gap-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }} />
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }} />
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ChatListSection;
