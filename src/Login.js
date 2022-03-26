import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "firebase/auth";
import { useCallback, useEffect } from "react";
import { useAuthState } from "./firebase";

export const Login = () => {
  // useEffect(() => {
  //   onAuthStateChanged(getAuth(), (currentUser) => {
  //     console.log("data user", currentUser?.email);
  //   });
  // }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const [email, password] = e.target.elements;
    const auth = getAuth();

    // console.log(email.value, password.value);

    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      console.log("login succes");
    } catch (e) {
      alert(e.message);
    }
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="email" type="email" />
        <input name="password" placeholder="password" type="password" />
        <button type="submit"> Login </button>
      </form>
    </div>
  );
};
