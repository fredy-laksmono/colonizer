import ChatCard from "./ChatCard"
import { useState, useEffect } from "react"

const ChatWindow = ({socket, user, room}) => {

    const[chatInput, setChatInput] = useState("")
    const[chatList, setChatList] = useState([])

    // let chats = [
    //     {name: "Bob", message: "Hello"},
    //     {name: "Alice", message: "Hi"},
    //     {name: "Bob", message: "How are you?"},
    //     {name: "Alice", message: "I'm good, how are you?"},
    //     {name: "Bob", message: "I'm good, thanks"},
    //     {name: "Alice", message: "That's good to hear"},
    // ]

    const handleChatInput = (e) => {
        setChatInput(e.target.value)
    }

    const handleSend = () => {
        console.log("sending", chatInput)
        console.log("by", user.name)
        console.log("in", room)
        socket.emit("chat_send", {message: chatInput, user: user.name, room: room})
        setChatInput("")
        // socket.emit("chat_send",{chatInput,room})
    }
    
    useEffect(() => {
        socket.on("chat_recieve", (data) => {
            console.log("received", data)
            console.log("chatList", chatList)
            setChatList(chatList => [...chatList, {data}])
        })
        // socket.on("receive_message", (data) => {
        //     console.log("received", data)
        //     // console.log("chatList", chatList)
        //     // setChatList(chatList => [...chatList, {data}])
        // })
    },[socket])

    let chatListRender = (<div>
        {chatList.map((chat)=>(
                <ChatCard chat={chat} />
            ))}
    </div>)
    let chatInputRender = (<div>
        <input onChange={handleChatInput} type="text" placeholder="Message" /><button onClick={handleSend}>Send</button>
    </div>)

    let toRender = (<div>
        <div>{chatListRender}</div>
        <div>{chatInputRender}</div>
    </div>)
    return toRender
}

export default ChatWindow