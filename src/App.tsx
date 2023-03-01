import { firestore } from "./firebaseConfig";
import { useCallback, useEffect, useState } from "react";

import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "./firebaseConfig";
import SignInButton from "./components/SignInButton";
import { onAuthStateChanged, User } from "firebase/auth";
import SignUpButton from "./components/SignOutButton";

const App = () => {
  const citiesRef = collection(firestore, "cities");
  const docRef = doc(citiesRef, "BJ");
  const [user, setUser] = useState<User | null>(null);
  // const showData = useCallback(async () => {
  //   const docSnap = await getDoc(docRef);
  //   console.log(auth);
  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // }, []);
  const getUser = useCallback(async () => {
    console.log(auth.currentUser);
  }, []);

  useEffect(() => {
    // showData();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    getUser();
  }, [getUser]);
  return <div>{user ? <SignUpButton /> : <SignInButton />}</div>;
};

export default App;
