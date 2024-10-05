import React, { useState, useEffect } from "react";
import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { FaCompass } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase"; // Update path as per your project structure

const Explore = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(firestore, "posts"); // Replace 'posts' with your Firestore collection name
        const snapshot = await getDocs(postsCollection);
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Tooltip
      hasArrow
      label={"Explore"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Flex
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <FaCompass size={25} />
        <Box display={{ base: "none", md: "block" }}>Explore</Box>
      </Flex>
    </Tooltip>
  );
};

export default Explore;
