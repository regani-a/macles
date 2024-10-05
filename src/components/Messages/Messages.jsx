import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "./ChatContext";
import { firestore } from "../../firebase/firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (data.chatId) {
      const unSub = onSnapshot(
        doc(firestore, "chats", data.chatId),
        (doc) => {
          if (doc.exists()) {
            setMessages(doc.data().messages);
          } else {
            console.log(`No such document with id: ${data.chatId}`);
          }
        },
        (error) => {
          console.error("Error fetching messages: ", error);
        }
      );

      return () => {
        unSub();
      };
    } else {
      console.log("No chatId provided in context.");
    }
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.length > 0 ? (
        messages.map((m) => <Message message={m} key={m.id} />)
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
};

export default Messages;
