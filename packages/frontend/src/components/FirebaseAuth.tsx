import React, { useState, useContext, createContext, useEffect, ReactNode } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebaseConfig from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface AuthContextType {
  user: User | null;
  loadingAuth: boolean;
}

const AuthContext = createContext<AuthContextType>({user: null, loadingAuth: true});

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoadingAuth(false);
    });

    return () => unsubcribe();
  }, []);

  return <AuthContext.Provider value={{user, loadingAuth}}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);