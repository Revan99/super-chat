import { useAppSelector } from "../redux/hooks";
import { ChangeEvent, useState } from "react";
import Friends from "./Freinds";
import UsersToAdd from "./UsersToAdd";
import useDebounce from "../hooks/useDebounce";

const Contacts = () => {
  const isOpen = useAppSelector((state) => state.contact.isOpen);
  const [value, setValue] = useState("");
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const debouncedValue = useDebounce(value, 200);
  return (
    <div className={`chat-room-contacts ${isOpen ? "open" : "close"}`}>
      <input type="text" onChange={handleChange} value={value} />
      {value ? <UsersToAdd value={debouncedValue} /> : <Friends />}
    </div>
  );
};

export default Contacts;
