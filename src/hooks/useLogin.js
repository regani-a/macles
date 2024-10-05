import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useLogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (userCredential.user) {
        if (!userCredential.user.emailVerified) {
          setShowResendLink(true);
          showToast(
            "Info",
            "Please verify your email to login. Check your email inbox for verification instructions.",
            "info"
          );
          // showToast(
          //   "Error",
          //   "Please verify your email before logging in",
          //   "error"
          // );
          return;
        }

        const docRef = doc(firestore, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
          loginUser(docSnap.data());
          showToast("Success", "Logged in successfully!");
          navigate("/"); // Redirect to homepage after successful login
        } else {
          showToast("Error", "User data not found", "error");
        }
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { loading, error, login };
};

export default useLogin;
