import { firestore } from "./firebaseConfig";
import { useCallback, useEffect, useState } from "react";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { auth } from "./firebaseConfig";
import SignInButton from "./components/SignInButton";
import { onAuthStateChanged } from "firebase/auth";
import ChatRoom from "./components/ChatRoom";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setCurrentUser } from "./redux/feature/userSlice";

type User = {
  name: string;
  friends: User[];
  messages: string[];
};

const App = () => {
  const citiesRef = collection(firestore, "cities");
  const docRef = doc(citiesRef);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const showData = useCallback(async () => {
    // const docSnap = await getDoc(docRef);
    const q = query(
      collection(firestore, "cities"),
      where("capital", "==", true)
    );
    const querySnapshot = await getDocs(q);
    const array: DocumentData = [];
    // console.log(docSnap.data());
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      array.push(doc.data());
    });
    console.log(array);
    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
  }, []);

  useEffect(() => {
    showData();
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(firestore, "users", currentUser!.email!);
        const currentUserQuerySnapshot = await getDoc(docRef);
        if (currentUserQuerySnapshot.exists()) {
          dispatch(setCurrentUser(currentUserQuerySnapshot.data() as User));
        }
      } else {
        setUser(null);
      }
    });
  }, [showData]);
  return (
    <div className="page-container">
      {currentUser ? <ChatRoom /> : <SignInButton />}
    </div>
  );
};

export default App;
