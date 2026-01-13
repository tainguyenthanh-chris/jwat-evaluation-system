import {
  Flex,
  Box,
  Text,
  IconButton,
  Circle,
  Avatar,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import ContainerFluid from "./ContainerFluid";
import { FaRegBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toaster } from "./ui/toaster";
import { logoutApi } from "../lib/axiosWithoutAuthentication";

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isMobile: boolean | undefined;
}

const Header = ({ isSidebarOpen, setIsSidebarOpen, isMobile }: HeaderProps) => {
  const navigate = useNavigate();
  const { accessToken, refreshToken, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      if (accessToken && refreshToken) {
        await logoutApi(accessToken, refreshToken);
      }
    } catch (err) {
      console.error("Logout API failed", err);
    } finally {
      logout();
      navigate("/login", { replace: true });

      toaster.create({
        title: "Logged out",
        description: "You have been logged out successfully",
        type: "success",
      });
    }
  };

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
        <Text
          fontSize={15}
          color={"blue.400"}
          fontWeight={"bolder"}
          whiteSpace="nowrap"
          overflow="hidden"
        >
          CLV EVALUATION SYSTEM
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

              <Menu.Root positioning={{ placement: "bottom-end" }}>
                <Menu.Trigger rounded="full" focusRing="outside">
                  <Avatar.Root size="sm">
                    <Avatar.Fallback name={"Hoang Ha"} />
                    <Avatar.Image />
                  </Avatar.Root>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item value="account">Account</Menu.Item>
                      <Menu.Item value="settings">Settings</Menu.Item>
                      <Menu.Separator />
                      <Menu.Item
                        value="logout"
                        color="red.500"
                        onClick={handleLogout}
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Flex>
          </Flex>
        </ContainerFluid>
      </Box>
    </Flex>
  );
};

export default Header;
