import React, { useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebaseConfig from "../firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FirebaseAuth = () => {
    const uiRef = useRef<firebaseui.auth.AuthUI | null>(null);

  useEffect(() => {
    if (!uiRef.current) {
      const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
      ui.start("#firebaseui-auth-container", {
        signInOptions: [
          "password",
        ],
        signInSuccessUrl: "/", // Redirect after successful login
      });

      uiRef.current = ui;
    }
  }, []);

  return <div id="firebaseui-auth-container"></div>;
};

export default FirebaseAuth;
