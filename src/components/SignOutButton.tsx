import { auth } from "../firebaseConfig";

const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>Logout</button>;
};

export default SignOutButton;
