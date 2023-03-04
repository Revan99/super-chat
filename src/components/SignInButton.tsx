import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { auth, firestore } from "../firebaseConfig";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
const SignInButton = () => {
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(false);
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
