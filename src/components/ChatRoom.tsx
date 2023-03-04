import { useState } from "react";
import ChatRoomContent from "./ChatRoomContent";
import ChatRoomHeader from "./ChatRoomHeader";

const ChatRoom = () => {
  return (
    <div className="chat-room">
      <ChatRoomHeader />
      <ChatRoomContent />
    </div>
  );
};

export default ChatRoom;
