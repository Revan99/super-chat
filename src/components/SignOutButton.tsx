import { auth } from "../firebaseConfig";

const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>SignOutButton</button>;
};

export default SignOutButton;
