import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../firebaseConfig";
import { setFriendToChat, unFollowFriend } from "../redux/feature/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type User = {
  name: string;
  friends: User[];
  messages: string[];
};

const Friends = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const unFollow = (user: User) => async () => {
    await updateDoc(doc(firestore, "users", auth.currentUser?.email!), {
      friends: arrayRemove(user),
    });
    dispatch(unFollowFriend(user));
  };
  return (
    <>
      {currentUser?.friends.map((userToChat) => (
        <div className="user">
          <h4 className="friend-name">{userToChat.name}</h4>
          <div className="button-container">
            <button
              className="btn"
              onClick={() => dispatch(setFriendToChat(userToChat))}
            >
              Chat
            </button>
            <button className="btn" onClick={unFollow(userToChat)}>
              Un Follow
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Friends;
