import { Flex, Box, Text, IconButton, Circle, Avatar } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import ContainerFluid from "./ContainerFluid";
import { FaRegBell } from "react-icons/fa";

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isMobile: boolean | undefined;
}

const Header = ({ isSidebarOpen, setIsSidebarOpen, isMobile }: HeaderProps) => {
  return (
    <Flex
      position="fixed"
      height="72px"
      alignItems="center"
      left="0"
      right="0"
      paddingY="16px"
      backgroundColor="bg.panel"
      shadow="sm"
      zIndex="999"
    >
      <Box
        width={!isMobile ? (isSidebarOpen ? "240px" : 0) : 0}
        textAlign="center"
        overflow="hidden"
        transition="0.3s"
      >
        <Text whiteSpace="nowrap" overflow="hidden">
          EVOLUTION SYSTEM
        </Text>
      </Box>
      <Box flex="1">
        <ContainerFluid>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex gap="16px">
              <IconButton
                size="md"
                variant="ghost"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <GiHamburgerMenu />
              </IconButton>
            </Flex>

            <Flex gap="16px" alignItems="center">
              <IconButton size={"md"} variant="ghost" position="relative">
                <FaRegBell />
                <Circle
                  size={"5"}
                  bg={"red"}
                  color={"white"}
                  position={"absolute"}
                  top={"0"}
                  right={"0"}
                  transform="translate(5%, -5%)"
                  fontSize="xs"
                >
                  3
                </Circle>
              </IconButton>

              <Avatar.Root>
                <Avatar.Fallback name={"Hoang Ha"} />
                <Avatar.Image />
              </Avatar.Root>
            </Flex>
          </Flex>
        </ContainerFluid>
      </Box>
    </Flex>
  );
};

export default Header;
