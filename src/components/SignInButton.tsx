import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseConfig";
const SignInButton = () => {
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          setLoading(true);
          await signInWithPopup(auth, provider);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {loading ? "loading..." : "Sign In"}
    </button>
  );
};

export default SignInButton;
