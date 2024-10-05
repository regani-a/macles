import React, { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import useSearchUser from "../../hooks/useSearchUser";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

const Search = ({ isOpen, onOpen, onClose }) => {
  const searchRef = useRef(null);
  const { user, isLoading, getUserProfile, setUser } = useSearchUser();

  const handleSearchUser = (e) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
          <ModalHeader>Search user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSearchUser}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input placeholder="Search for user" ref={searchRef} />
              </FormControl>

              <Flex w={"full"} justifyContent={"flex-end"}>
                <Button
                  type="submit"
                  ml={"auto"}
                  size={"sm"}
                  my={4}
                  isLoading={isLoading}
                >
                  Search
                </Button>
              </Flex>
            </form>
            {user && <SuggestedUser user={user} setUser={setUser} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
