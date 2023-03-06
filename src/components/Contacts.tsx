import { useAppSelector } from "../redux/hooks";
import { ChangeEvent, useState } from "react";
import Friends from "./Freinds";
import UsersToAdd from "./UsersToAdd";
import useDebounce from "../hooks/useDebounce";
import { BiSearchAlt } from "react-icons/bi";

const Contacts = () => {
  const isOpen = useAppSelector((state) => state.contact.isOpen);
  const [value, setValue] = useState("");
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const debouncedValue = useDebounce(value, 200);
  return (
    <div className={`chat-room-contacts ${isOpen ? "open" : "close"}`}>
      <div className="container">
        <label
          htmlFor="contact-search-input"
          className="contact-search-input-container"
        >
          <BiSearchAlt className="search-icon" />
          <input
            id="contact-search-input"
            name="contact-search-input"
            className="contact-search-input"
            type="text"
            onChange={handleChange}
            value={value}
          />
        </label>
        {value ? <UsersToAdd value={debouncedValue} /> : <Friends />}
      </div>
    </div>
  );
};

export default Contacts;
