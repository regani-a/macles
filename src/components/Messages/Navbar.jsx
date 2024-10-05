// Navbar.js
import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";

import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="navbar">
      <span className="logo">Macles</span>
      <div className="user">
        {currentUser && (
          <>
            <Avatar src={currentUser.profilePicURL} size={"sm"} />
            <span>{currentUser.username}</span>
            <button onClick={handleSignOut}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
