import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useLogin from "../../hooks/useLogin";

const Login = ({ onClose }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { loading, error, login } = useLogin();

  useEffect(() => {
    // Add event listener to handle clicks outside the form
    const handleClickOutside = (event) => {
      if (!event.target.closest(".login-form")) {
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
    <form className="login-form">
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
        placeholder="Password"
        fontSize={14}
        size={"sm"}
        type="password"
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />
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
        onClick={() => login(inputs)}
      >
        Log in
      </Button>
    </form>
  );
};

export default Login;
