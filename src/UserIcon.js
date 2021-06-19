import { signInWithGoogle, firebase } from "./Firebase";
import { useState } from "react";

const UserIcon = () => {
  const [currentUser, setCurrentUser] = useState();
  const auth = firebase.auth();

  auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
    // console.log(user.uid)
  });

  if (currentUser) {
    console.log(currentUser);
    return (
      <div id="UserIcon">
        <img src={currentUser.photoURL} onClick={() => signInWithGoogle()} />
      </div>
    );
  }
  if (!currentUser) {
    return (
      <div id="UserIcon">
        <button onClick={() => signInWithGoogle()}>Login</button>
      </div>
    );
  }
};

export default { UserIcon };
