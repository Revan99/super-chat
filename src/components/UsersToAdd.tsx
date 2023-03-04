import { useCallback, useEffect, useState } from "react";
import { auth, firestore } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  console.log(currentUser);

  const handleAdd = (user: User) => () => {
    console.log(user);
    console.log(currentUser);
  };
  const getUsersToAdd = useCallback(async () => {
    const getUsersQuery = query(
      collection(firestore, "users"),
      where("name", "<=", value),
      where("name", "!=", auth.currentUser?.displayName)
    );
    const querySnapshot = await getDocs(getUsersQuery);
    const docRef = doc(firestore, "users", auth.currentUser!.email!);
    const currentUserQuerySnapshot = await getDoc(docRef);
    if (currentUserQuerySnapshot.exists()) {
      setCurrentUser(currentUserQuerySnapshot.data() as User);
    }
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
        <div className="user">
          <h3>{userToAdd.name}</h3>
          <button
            onClick={handleAdd(userToAdd)}
            disabled={
              !!currentUser?.friends.find(
                (friend) => friend.name === userToAdd.name
              )
            }
          >
            {currentUser?.friends.find(
              (friend) => friend.name === userToAdd.name
            )
              ? "Followed"
              : "Follow"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UsersToAdd;
