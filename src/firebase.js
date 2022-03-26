import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyC9l1t-l55GCkR71kt_xhB-Npa5E6sOIUs",
  authDomain: "testfirebase-5d3b6.firebaseapp.com",
  databaseURL: "https://testfirebase-5d3b6.firebaseio.com",
  projectId: "testfirebase-5d3b6",
  storageBucket: "testfirebase-5d3b6.appspot.com",
  messagingSenderId: "799266533322",
  appId: "1:799266533322:web:e6f1c2292b346cc098e933",
  measurementId: "G-H9NLL1YNME"
});

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  console.log("datauser", user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser);
    return () => unsubscribe;
  }, []);

  return <AuthContext.Provider value={user} {...props} />;
};

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  const result = auth != null;

  return { ...auth, isAuthenticated: auth != null };
};
