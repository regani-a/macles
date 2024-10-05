import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MessagesPage from "./pages/MessagePage/MessagePage";
import AuthGuard from "./components/AuthForm/AuthGuard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import Tools from "./assets/Tools"; // Ensure correct import path for Tools component

function App() {
  const [authUser] = useAuthState(auth);

  return (
    <PageLayout>
      <Tools isAuthenticated={!!authUser} /> {/* Pass isAuthenticated prop */}
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <AuthGuard>
                <HomePage />
              </AuthGuard>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/auth"
          element={
            <AuthGuard>
              <AuthPage />
            </AuthGuard>
          }
        />
        <Route path="/:username" element={<ProfilePage />} />

        <Route path="/:username/messages" element={<MessagesPage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
