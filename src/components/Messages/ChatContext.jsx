// ChatContext.jsx
import React, { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

const INITIAL_STATE = {
  chatId: null,
  user: {}, // Initialize user object with required fields
};

const chatReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_USER":
      return {
        ...state,
        user: action.payload,
        chatId: determineChatId(state.user.uid, action.payload.uid),
      };
    default:
      return state;
  }
};

const determineChatId = (uid1, uid2) => {
  return uid1 > uid2 ? `${uid1}${uid2}` : `${uid2}${uid1}`;
};

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
