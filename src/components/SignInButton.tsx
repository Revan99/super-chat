import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { auth, firestore } from "../firebaseConfig";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useAppDispatch } from "../redux/hooks";
import { setCurrentUser } from "../redux/feature/userSlice";

type User = {
  name: string;
  friends: User[];
  messages: string[];
};
const SignInButton = () => {
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={async () => {
        try {
          setLoading(true);
          const data = await signInWithPopup(auth, provider);
          await setDoc(doc(firestore, "users", data.user.email!), {
            name: data.user.displayName,
            friends: [],
            messages: [],
          });
          const docRef = doc(firestore, "users", auth.currentUser!.email!);
          const currentUserQuerySnapshot = await getDoc(docRef);
          if (currentUserQuerySnapshot.exists()) {
            dispatch(setCurrentUser(currentUserQuerySnapshot.data() as User));
          }
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {loading ? "loading..." : "Sign In"}
    </button>
  );
};

export default SignInButton;
