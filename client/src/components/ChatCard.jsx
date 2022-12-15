const ChatCard = ({ chat }) => {
  console.log("chat", chat);

  return (
    <div className="chat-card">
      <div className="chat-card__header">
        {chat.data.user}: {chat.data.message}
      </div>
    </div>
  );
}
export default ChatCard