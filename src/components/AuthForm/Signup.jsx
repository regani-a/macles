import {
  Alert,
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Signup = ({ onClose }) => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, signup } = useSignUpWithEmailAndPassword();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(inputs); // Call the signup function passed as a prop
  };

  useEffect(() => {
    // Add event listener to handle clicks outside the form
    const handleClickOutside = (event) => {
      if (!event.target.closest(".signup-form")) {
        onClose(); // Close the form if click is outside
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <form className="signup-form">
      <Input
        border="none"
        boxShadow="md"
        variant="filled"
        _focus={{
          borderColor: "blue.500",
          boxShadow: "outline",
        }}
        mb={4}
        placeholder="Email"
        fontSize={14}
        type="email"
        size={"sm"}
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <Input
        border="none"
        boxShadow="md"
        variant="filled"
        _focus={{
          borderColor: "blue.500",
          boxShadow: "outline",
        }}
        mb={4}
        placeholder="Username"
        fontSize={14}
        type="text"
        size={"sm"}
        value={inputs.username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
      />
      <Input
        border="none"
        boxShadow="md"
        variant="filled"
        _focus={{
          borderColor: "blue.500",
          boxShadow: "outline",
        }}
        mb={4}
        placeholder="Full Name"
        fontSize={14}
        type="text"
        size={"sm"}
        value={inputs.fullName}
        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
      />
      <InputGroup size="sm">
        <Input
          border="none"
          boxShadow="md"
          variant="filled"
          _focus={{
            borderColor: "blue.500",
            boxShadow: "outline",
          }}
          mb={4}
          placeholder="Password"
          fontSize={14}
          type={showPassword ? "text" : "password"}
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <InputRightElement width="3rem">
          <Button
            h="1.5rem"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}

      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        isLoading={loading}
        onClick={handleSignup}
      >
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
