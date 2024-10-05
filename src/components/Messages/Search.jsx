import React, { useContext, useState } from "react";
import { Avatar } from "@chakra-ui/react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { AuthContext } from "./AuthContext";
import { ChatContext } from "./ChatContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    const q = query(
      collection(firestore, "users"),
      where("username", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } else {
        setErr(true);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    console.log("handleSelect triggered");

    if (!user || !currentUser) {
      console.error("User not found or not authenticated");
      return;
    }

    console.log("Current user:", currentUser);
    console.log("Selected user:", user);

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(firestore, "chats", combinedId));
      console.log("Chat document existence:", res.exists());

      if (!res.exists()) {
        console.log("Creating new chat document");
        await setDoc(doc(firestore, "chats", combinedId), { messages: [] });

        await updateDoc(doc(firestore, "userChats", currentUser.uid), {
          [`${combinedId}.userInfo`]: {
            uid: user.uid,
            displayName: user.username,
            photoURL: user.profilePicURL,
          },
          [`${combinedId}.date`]: serverTimestamp(),
        });

        await updateDoc(doc(firestore, "userChats", user.uid), {
          [`${combinedId}.userInfo`]: {
            uid: currentUser.uid,
            displayName: currentUser.username,
            photoURL: currentUser.profilePicURL,
          },
          [`${combinedId}.date`]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error("Error creating chat:", err);
    }

    dispatch({ type: "CHANGE_USER", payload: user });

    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <Avatar src={user.profilePicURL} alt="" />
          <div className="userChatInfo">
            <span>{user.username}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
