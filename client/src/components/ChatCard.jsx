const ChatCard = ({ chat }) => {
  const { name, message} = chat;

  return (
    <div className="chat-card">
      <div className="chat-card__header">
        {name}: {message}
      </div>
    </div>
  );
}
export default ChatCard