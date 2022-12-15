import ChatCard from "./ChatCard"
import { useState, useEffect } from "react"
const uuid = require('uuid')

const ChatWindow = ({socket, user, room}) => {

    const[chatInput, setChatInput] = useState("")
    const[chatList, setChatList] = useState([])

    const handleChatInput = (e) => {
        setChatInput(e.target.value)
    }

    const handleSend = (e) => {
        e.preventDefault()
        socket.emit("chat_send", {message: chatInput, user: user.name, room: room})
        setChatInput("")
    }
    
    useEffect(() => {
        socket.on("chat_recieve", (data) => {
            setChatList(chatList => [...chatList, {data}])
        })
    },[socket])

    let chatListRender = (<div className="chat-window-frame">
        <div></div>
        <div className="chat-window">
        {chatList.map((chat)=>(
                <ChatCard key={uuid.v4()} chat={chat} />
            ))}
        </div>
        <div></div>
    </div>)
    let chatInputRender = (<div className="chat-input-frame">
        <div></div>
        <form onSubmit={handleSend}>
            <input className="chat-input" onChange={handleChatInput} value={chatInput} type="text" placeholder="Message" /><button>Send</button>
        </form>
        <div></div>
    </div>)

    let toRender = (<div>
        <div>{chatListRender}</div>
        <div>{chatInputRender}</div>
    </div>)
    return toRender
}

export default ChatWindow