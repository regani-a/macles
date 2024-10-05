import React from "react";
import Sidebar from "../../components/Messages/Sidebar";
import Chat from "../../components/Messages/Chat";
import "./style.scss";

const MessagePage = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default MessagePage;
