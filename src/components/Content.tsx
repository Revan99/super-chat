import {
  CSSProperties,
  DetailedHTMLProps,
  FormEvent,
  InputHTMLAttributes,
} from "react";
import { useAppSelector } from "../redux/hooks";

const Content = () => {
  const isOpen = useAppSelector((state) => state.contact.isOpen);

  const style = {
    "--border-radius": `${isOpen ? "0px" : "10px"}`,
  } as CSSProperties;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="chat-room-messages">
      <div className="messages"></div>
      <form className="message-form" onSubmit={handleSubmit}>
        <input
          className="message-input"
          type="text"
          name="message-input"
          id="message-input"
          style={style}
        />
        <button className="send-button">Send</button>
      </form>
    </div>
  );
};

export default Content;
