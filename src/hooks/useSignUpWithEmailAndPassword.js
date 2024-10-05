import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import useShowToast from "./useShowToast";
import { useState, useEffect } from "react";

const useSignUpWithEmailAndPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const showToast = useShowToast();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // State to hold current user
  const [emailVerifiedToastShown, setEmailVerifiedToastShown] = useState(false);

  // Effect to monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // if (user && user.emailVerified && !emailVerifiedToastShown) {
      //   setEmailVerifiedToastShown(true);
      //   showToast("Success", "Email successfully verified!", "success");
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 3000);
      // }
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  const checkEmailVerification = (user) => {
    const intervalId = setInterval(async () => {
      await user.reload();
      if (user.emailVerified && !emailVerifiedToastShown) {
        clearInterval(intervalId);
        setEmailVerifiedToastShown(true);
        showToast("Success", "Email successfully verified!", "success");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }, 3000); // Check every 3 seconds
  };

  const signup = async (inputs) => {
    setLoading(true);
    setError(null);
    try {
      if (
        !inputs.email ||
        !inputs.password ||
        !inputs.username ||
        !inputs.fullName
      ) {
        setLoading(false);
        showToast("Error", "Please fill all the fields", "error");
        return false;
      }

      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("username", "==", inputs.username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        showToast("Error", "Username already exists", "error");
        setLoading(false);
        return false;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );

      const newUser = userCredential.user; // Access the user from the userCredential

      // Update the user's profile with the display name
      await updateProfile(newUser, {
        displayName: inputs.fullName,
      });

      // Wait for currentUser to be updated after createUserWithEmailAndPassword
      await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user); // Update currentUser state
          resolve(); // Resolve the promise when currentUser is updated
        });
        return unsubscribe; // Cleanup function
      });

      if (!newUser) {
        showToast("Error", "User creation failed", "error");
        return false;
      }

      // Send email verification
      await sendEmailVerification(newUser);
      setIsEmailSent(true); // Update state after email is sent
      console.log("Verification email sent successfully.");

      const userDoc = {
        uid: newUser.uid,
        email: inputs.email,
        username: inputs.username,
        usernameLowercase: inputs.username.toLowerCase(),
        fullName: inputs.fullName,
        bio: "",
        profilePicURL: "",
        followers: [],
        following: [],
        posts: [],
        createdAt: Date.now(),
      };
      try {
        // Set users document
        await setDoc(doc(firestore, "users", newUser.uid), userDoc);
        showToast(
          "Success",
          "User created successfully! Please check your email for verification."
        );

        // Update local storage with user info
        localStorage.setItem("user-info", JSON.stringify(userDoc));

        await setDoc(doc(firestore, "userChats", newUser.uid), {});
        console.log("userChats document created successfully.");
      } catch (error) {
        console.error("Error setting documents:", error);
        // Handle error (show message to user, retry, etc.)
      }

      checkEmailVerification(newUser);

      return newUser;
    } catch (error) {
      showToast("Error", error.message, "error");
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, signup, isEmailSent, currentUser };
};

export default useSignUpWithEmailAndPassword;
