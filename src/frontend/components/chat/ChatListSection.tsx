import ChatMessage from './ChatMessage';

const ChatListSection = () => {
  return (
    <section className="space-y-6">
      {messages.map((message) => (
        <ChatMessage />
      ))}
    </section>
  );
};

export default ChatListSection;
