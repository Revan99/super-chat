import { User } from "../types";

type Message = {
  content: string;
  timestamp: string;
  sender: User;
  receiver: User;
};

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
        <h4 style={{ color: "white" }}>{message.content}</h4>
      ))}
    </div>
  );
};

export default MessageComponent;
