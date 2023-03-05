import { useCallback, useEffect, useState } from "react";
import { auth, firestore } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addFriend,
  setCurrentUser,
  setFriendToChat,
} from "../redux/feature/userSlice";

type Props = {
  value: string;
};

type User = {
  name: string;
  friends: User[];
  messages: string[];
};

const UsersToAdd: React.FC<Props> = ({ value }) => {
  const [usersToAdd, setUsersToAdd] = useState<User[]>([]);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  console.log(currentUser);
  const handleAdd = (user: User) => async () => {
    await updateDoc(doc(firestore, "users", auth.currentUser?.email!), {
      friends: arrayUnion(user),
    });
    dispatch(addFriend(user));
  };
  const getUsersToAdd = useCallback(async () => {
    const getUsersQuery = query(
      collection(firestore, "users"),
      where("name", "<=", value),
      where("name", "!=", auth.currentUser?.displayName)
    );
    const querySnapshot = await getDocs(getUsersQuery);
    const usersArray: User[] = [];
    querySnapshot.forEach((doc) => {
      usersArray.push(doc.data() as User);
    });
    setUsersToAdd(usersArray);
  }, [value]);
  useEffect(() => {
    getUsersToAdd();
  }, [getUsersToAdd]);
  return (
    <div className="users-to-add">
      {usersToAdd.map((userToAdd) => (
        <div className="user" key={userToAdd.name}>
          <h3>{userToAdd.name}</h3>
          <button
            onClick={
              currentUser?.friends.find(
                (friend) => friend.name === userToAdd.name
              )
                ? () => {
                    dispatch(setFriendToChat(userToAdd));
                  }
                : handleAdd(userToAdd)
            }
          >
            {currentUser?.friends.find(
              (friend) => friend.name === userToAdd.name
            )
              ? "Chat"
              : "Follow"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UsersToAdd;
