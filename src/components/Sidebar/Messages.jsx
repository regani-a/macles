import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const Messages = () => {
  const authUser = useAuthStore((state) => state.user);

  return (
    <Tooltip
      hasArrow
      label={"Explore"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link to={`/${authUser?.username}/messages`}>
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <FaEnvelope size={25} />
          <Box display={{ base: "none", md: "block" }}>Messages</Box>
        </Flex>
      </Link>
    </Tooltip>
  );
};

export default Messages;
