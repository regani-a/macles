import { Button, Container, Flex, Image, Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Login from "../AuthForm/Login";
import Signup from "../AuthForm/Signup";
import GoogleAuth from "../AuthForm/GoogleAuth";
import { sendEmailVerification } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [prefix, setPrefix] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [showResendLink, setShowResendLink] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setPrefix("Log in");
    setShowSignup(false); // Close signup form when toggling login
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
    setPrefix("Sign up");
    setShowLogin(false); // Close login form when toggling signup
  };

  const handleCloseForms = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleResendClick = async () => {
    try {
      await sendEmailVerification(currentUser); // Firebase API to resend verification email
      console.log("Verification email resent successfully");
    } catch (error) {
      console.error("Error resending verification email:", error);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (user) {
        setShowResendLink(!user.emailVerified);
      } else {
        setShowResendLink(false);
      }
    }
  }, [user, loading]);

  return (
    <Container maxW={"container.lg"} my={4}>
      <Flex
        w={"full"}
        justifyContent={{ base: "center", sm: "space-between" }}
        alignItems={"center"}
      >
        <Image
          src="/logo.png"
          h={20}
          display={{ base: "none", sm: "block" }}
          cursor={"pointer"}
        />
        <Flex gap={4}>
          <Button colorScheme={"blue"} size={"sm"} onClick={toggleLogin}>
            Login
          </Button>
          <Button variant={"outline"} size={"sm"} onClick={toggleSignup}>
            Signup
          </Button>
        </Flex>
      </Flex>

      {/* Conditional rendering of OR divider and Google Auth */}
      {showLogin || showSignup ? (
        <Box mt={4} p={5} border="1px solid gray" borderRadius={14}>
          {showLogin && <Login onClose={handleCloseForms} />}
          {showSignup && <Signup onClose={handleCloseForms} />}

          {/* Resend link */}
          {showResendLink && (
            <Box
              bottom={showLogin ? "70%" : undefined} // Position below Login button
              top={showSignup ? "40%" : undefined} // Position below Signup button
              right={8}
              p={2}
              zIndex={1}
              textAlign="right"
            >
              <Text fontSize={15} color={"gray.500"} mb={-30}>
                Mail tidak masuk ?{" "}
                <a
                  href="#"
                  onClick={handleResendClick}
                  style={{ textDecoration: "underline" }}
                >
                  Resend
                </a>
              </Text>
            </Box>
          )}

          <Flex
            mt={5}
            alignItems={"center"}
            justifyContent={"center"}
            mb={4}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>
          <GoogleAuth prefix={prefix} />
        </Box>
      ) : null}
    </Container>
  );
};

export default Navbar;
