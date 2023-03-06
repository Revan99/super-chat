import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "@firebase/firestore";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { firestore } from "../firebaseConfig";
import { useAppSelector } from "../redux/hooks";
import { User } from "../types";
import MessageComponent from "./MessageComponent";

type Message = {
  content: string;
  timestamp: string;
  sender: User;
  receiver: User;
};

const Content = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const friendToChat = useAppSelector((state) => state.user.friendToChat);
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addDoc(collection(firestore, "message"), {
      content: inputRef.current!.value,
      sender: currentUser!.name,
      receiver: friendToChat!.name,
      timestamp: serverTimestamp(),
    });
  };

  const getMessages = useCallback(async () => {
    const getUsersQuery = query(
      collection(firestore, "message"),
      where("receiver", "==", friendToChat?.name),
      where("receiver", "==", currentUser?.name),
      where("sender", "==", currentUser?.name),
      where("sender", "==", friendToChat?.name)
    );
    const querySnapshot = await getDocs(getUsersQuery);
    const messagesArray: Message[] = [];
    querySnapshot.forEach((doc) => {
      messagesArray.push(doc.data() as Message);
    });
    setMessages(messagesArray);
  }, [currentUser, friendToChat]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  console.log(messages);

  return (
    <div className="chat-room-messages">
      <div className="messages">
        {messages.length && friendToChat && (
          <MessageComponent messages={messages} />
        )}
        {!messages.length && friendToChat && (
          <h2 style={{ color: "white" }}>
            {" "}
            Send Message to {friendToChat?.name}
          </h2>
        )}
      </div>
      <form className="message-form" onSubmit={handleSubmit}>
        <input
          className="message-input"
          type="text"
          name="message-input"
          id="message-input"
          ref={inputRef}
        />
        <button className="send-button">Send</button>
      </form>
    </div>
  );
};

export default Content;
