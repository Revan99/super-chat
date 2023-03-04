import { toggle } from "../redux/feature/contactSlice";
import { useAppDispatch } from "../redux/hooks";
import SignOutButton from "./SignOutButton";

const ChatRoomHeader = () => {
  const dispatch = useAppDispatch();

  const toggleContact = () => {
    dispatch(toggle());
  };
  return (
    <div className="chat-room-header">
      <button className="contact-toggler-button" onClick={toggleContact}>
        +
      </button>
      <SignOutButton />
    </div>
  );
};

export default ChatRoomHeader;
