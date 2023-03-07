import {
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  arrayUnion,
} from "@firebase/firestore";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { firestore } from "../firebaseConfig";
import { useAppSelector } from "../redux/hooks";
import { Message, User } from "../types";
import MessageComponent from "./MessageComponent";

const Content = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const friendToChat = useAppSelector((state) => state.user.friendToChat);
  const [senderMessages, setSenderMessages] = useState<Message[]>([]);
  const [receiverMessages, setReceiverMessages] = useState<Message[]>([]);
  const messages = useMemo<Message[]>(
    () =>
      [...senderMessages, ...receiverMessages].sort(
        (a, b) => a.timestamp - b.timestamp
      ),
    [senderMessages, receiverMessages]
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateDoc(doc(firestore, "users", currentUser!.email!), {
      messages: arrayUnion({
        content: inputRef.current!.value,
        receiver: friendToChat!.name,
        timestamp: new Date().getTime(),
      }),
    });
  };

  const getMessages = useCallback(async () => {
    onSnapshot(
      doc(firestore, "users", friendToChat!.email!),
      (querySnapshot) => {
        setSenderMessages(
          (querySnapshot.data() as User)!.messages!.filter(
            (message) => message!.receiver === currentUser!.name!
          )
        );
      }
    );

    onSnapshot(
      doc(firestore, "users", currentUser!.email!),
      (querySnapshot) => {
        setReceiverMessages(
          (querySnapshot.data() as User)!.messages!.filter(
            (message) => message!.receiver! === friendToChat!.name!
          )
        );
      }
    );
  }, [currentUser, friendToChat]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

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
