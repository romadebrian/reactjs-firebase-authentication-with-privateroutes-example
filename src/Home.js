import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "./firebase";

export const Home = () => {
  return (
    <div>
      <h1> Welcome </h1>
      <button onClick={() => signOut(getAuth())}> SignOut </button>
    </div>
  );
};
