// AuthGuard.js

import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast"; // Import your toast hook or component
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const showToast = useShowToast(); // Your toast hook or component

  useEffect(() => {
    if (user && !user.emailVerified) {
      // User is logged in but email is not verified
      // Show toast error message
      // showToast("Error", "Please verify your email to log in", "error");
    }
  }, [user, showToast]);

  if (loading) {
    // You can show a loading indicator while checking authentication state
    return <p>Loading...</p>;
  }

  if (user && !user.emailVerified) {
    // If the user is not verified, redirect to the login page or a verification page
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
