// ChatDisplay.jsx
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "./ChatContext";
import { firestore } from "../../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Messages from "./Messages";
import Input from "./Input";
import Cam from "./img/cam.png";
import Add from "./img/add.png";
import More from "./img/more.png";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data.chatId) {
      const unsubscribe = onSnapshot(
        doc(firestore, "chats", data.chatId),
        (doc) => {
          if (doc.exists()) {
            setMessages(doc.data().messages);
          } else {
            console.log("No such document!");
          }
        }
      );

      return () => unsubscribe();
    }
  }, [data.chatId]);

  return (
    <div className="chat">
      <div className="chatInfo">
        {data.user.username ? (
          <div className="chatIcons">
            {messages.map((msg, index) => (
              <p key={index}>{msg.text}</p>
            ))}
            <img src={Cam} alt="" />
            <img src={Add} alt="" />
            <img src={More} alt="" />
          </div>
        ) : (
          <span>Select a user to start chatting</span>
        )}
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
