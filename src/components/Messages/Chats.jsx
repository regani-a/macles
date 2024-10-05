// Chats.jsx
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "./ChatContext";
import { AuthContext } from "./AuthContext";
import { firestore } from "../../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { data, dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getChats = () => {
      if (!currentUser || !currentUser.uid) {
        console.log("User not authenticated or user data not available");
        return;
      }

      const unsubscribe = onSnapshot(
        doc(firestore, "userChats", currentUser.uid),
        (doc) => {
          if (doc.exists()) {
            setChats(doc.data());
          } else {
            console.log("No such document!");
          }
        }
      );

      return () => {
        unsubscribe();
      };
    };

    getChats();
  }, [currentUser]);

  const handleSelect = (userInfo) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
