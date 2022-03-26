import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useCallback } from "react";

export const SignUp = () => {
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const [email, password] = e.target.elements;
    const auth = getAuth();
    try {
      createUserWithEmailAndPassword(auth, email.value, password.value);
    } catch (e) {
      alert(e.message);
    }
  }, []);

  return (
    <>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="email" type="email" />
        <input name="password" placeholder="password" type="password" />
        <button type="submit"> SignUp </button>
      </form>
    </>
  );
};
