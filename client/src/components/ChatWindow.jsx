import ChatCard from "./ChatCard"

const ChatWindow = () => {

    let chats = [
        {name: "Bob", message: "Hello"},
        {name: "Alice", message: "Hi"},
        {name: "Bob", message: "How are you?"},
        {name: "Alice", message: "I'm good, how are you?"},
        {name: "Bob", message: "I'm good, thanks"},
        {name: "Alice", message: "That's good to hear"},
    ]
    return <div>
            <div>
            {chats.map((chat)=>(
        <ChatCard chat={chat} />
    ))}
            </div>
        </div>
}

export default ChatWindow