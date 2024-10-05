import {
  Container,
  Flex,
  VStack,
  Box,
  Image,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const AuthPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Box position="fixed" top="1rem" right="1rem">
        <IconButton
          aria-label="Toggle dark mode"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          size="sm"
          isRound
        />
      </Box>

      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          {/* Left hand-side */}
          <Box display={{ base: "none", md: "block" }}>
            <Image src="/auth.png" h={450} alt="Phone img" />
          </Box>

          {/* Right hand-side */}
          <VStack spacing={4} align={"stretch"}>
            <AuthForm />
            <Box textAlign={"center"}>Get the app.</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Image src="/playstore.png" h={"10"} alt="Playstore logo" />
              {/* <Image src="/microsoft.png" h={"10"} alt="Microsoft logo" /> */}
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;
