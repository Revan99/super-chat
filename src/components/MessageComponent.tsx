import { Key } from "react";
import { Message, User } from "../types";

type Props = {
  messages: Message[];
};

const MessageComponent = ({ messages }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      {messages.map((message) => (
        <h4 key={message.timestamp} style={{ color: "white" }}>
          {message.content}
        </h4>
      ))}
    </div>
  );
};

export default MessageComponent;
