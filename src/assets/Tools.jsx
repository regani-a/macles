import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Flex,
  Box,
  IconButton,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { FaSearch, FaTools } from "react-icons/fa";
import {
  SunIcon,
  MoonIcon,
  QuestionOutlineIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { keyframes } from "@emotion/react";
import Search from "./../components/Sidebar/Search";

import { useLocation } from "react-router-dom";

const Tools = ({ isAuthenticated }) => {
  const spinAnimation = keyframes`
  0% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateX(-80%) translateY(-20%); /* Move to the left */
  }
  100% {
    transform: translateX(-50%) translateY(0%); /* Move to the bottom */
  }
`;

  const calculatePosition = (index, totalButtons) => {
    const angle =
      ((totalButtons - index - 1) / (totalButtons - 1)) * (Math.PI / 2); // Adjust angle for quarter circle
    const radius = 5; // Adjust the radius as needed
    const x = -radius * Math.cos(angle); // Negative x-axis to reverse direction
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  // Custom hook to detect clicks outside a specified element
  const useOutsideClick = (ref, callback) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
          setIsToolActive(false);
        }
      };

      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [ref, callback, setIsToolActive]);
  };

  const location = useLocation();
  // Conditionally render based on the current route and authentication state
  if (location.pathname === "/auth" || !isAuthenticated) {
    return null;
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showButtons, setShowButtons] = useState(false);
  const [isToolActive, setIsToolActive] = useState(false);
  const toolsButtonRef = useRef();
  const { colorMode, toggleColorMode } = useColorMode();
  // Custom hook usage to close buttons when clicking outside the Tools icon
  useOutsideClick(toolsButtonRef, () => {
    setShowButtons(false);
    setIsToolActive(false);
  });

  const toggleButtons = () => {
    setShowButtons(!showButtons);
    setIsToolActive(true);
  };

  const handleIconClick = (index, event) => {
    event.stopPropagation(); // Prevent event bubbling

    switch (index) {
      case 0:
        console.log("Clicked Setting Icon");
        break;
      case 1:
        console.log("Clicked Help Icon");

        break;
      case 2:
        toggleColorMode();

        break;
      case 3:
        if (isToolActive) {
          onOpen(); // Open the modal only if FaTools is active
        }
        break;
      default:
        break;
    }
  };

  const icons = [SettingsIcon, QuestionOutlineIcon, SunIcon, FaSearch]; // Array of icons

  return (
    <>
      <Search isOpen={isOpen} onClose={onClose} />

      <IconButton
        ref={toolsButtonRef}
        icon={<FaTools />}
        size="md"
        isRound
        onClick={toggleButtons}
        style={{
          position: "sticky",
          left: "99.5%",
          top: "3%",
          transform: "translate(-50%, -50%)",
        }} // Main button position
      />
      {icons.map((Icon, index) => (
        <IconButton
          key={index}
          icon={
            index === 2 ? (
              colorMode === "light" ? (
                <MoonIcon />
              ) : (
                <SunIcon />
              )
            ) : (
              <Icon />
            )
          }
          size="sm"
          isRound
          style={{
            position: "sticky",
            left: "97%",
            top: "3%",
            transform: showButtons
              ? `translate(${calculatePosition(index, icons.length).x}rem, ${
                  calculatePosition(index, icons.length).y
                }rem) translate(-50%, -50%)`
              : "translate(-50%, -100%)", // Off-screen when not shown
            opacity: showButtons ? 1 : 0, // Initially hidden
            transition: `transform 0.5s ease ${
              index * 0.1
            }s, opacity 0.3s ease ${index * 0.1}s`, // Smooth animation with delay
          }}
          onClick={() => handleIconClick(index, event)}
        />
      ))}
    </>
  );
};

export default Tools;
