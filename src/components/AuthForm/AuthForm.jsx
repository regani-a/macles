import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { sendEmailVerification } from "firebase/auth";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, loading, error] = useAuthState(auth);
  const [showResendLink, setShowResendLink] = useState(false);
  const { currentUser } = useSignUpWithEmailAndPassword();

  const toggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
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
    <>
      <Box
        border={"1px solid gray"}
        borderRadius={14}
        p={7}
        boxShadow="lg"
        maxW="md"
        mx="auto"
        transition="all 0.3s ease"
        position="relative"
      >
        <VStack spacing={4}>
          <Image src="/logo.png" h={24} cursor={"pointer"} alt="Macles" />

          {isLogin ? (
            <Login onClose={() => {}} />
          ) : (
            <Signup onClose={() => {}} />
          )}

          {/* Resend link */}
          {showResendLink && (
            <Box
              position="absolute"
              bottom={isLogin ? "28%" : undefined} // Position below Login button
              top={!isLogin ? "70%" : undefined} // Position below Signup button
              right={4}
              p={2}
              zIndex={1}
            >
              <Text fontSize={14} color={"gray.500"}>
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

          {/* ---------------- OR -------------- */}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            mt={4}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>

          <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
        </VStack>
      </Box>

      <Box
        border={"1px solid gray"}
        borderRadius={14}
        p={5}
        boxShadow="lg"
        maxW="md"
        mx="auto"
        transition="all 0.3s ease"
      >
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box onClick={toggleForm} color={"blue.500"} cursor={"pointer"}>
            {isLogin ? "Sign up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
