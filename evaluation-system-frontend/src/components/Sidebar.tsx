import {
  Box,
  Flex,
  IconButton,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import {
  FaHome,
  FaChevronUp,
  FaChevronDown,
  FaWpforms,
  FaUsers,
  FaRegChartBar,
  FaCheckDouble,
} from "react-icons/fa";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useState } from "react";
import type { IconType } from "react-icons";

interface SidebarChild {
  name: string;
  href: string;
  Icon?: IconType;
}

interface SidebarItemData {
  name: string;
  Icon?: IconType;
  href?: string;
  children?: SidebarChild[];
}

interface SidebarProps {
  isSidebarOpen: boolean;
  isMobile?: boolean | undefined;
}

interface SidebarItemProps {
  item: SidebarChild | SidebarItemData;
}

const Sidebar = ({ isSidebarOpen }: SidebarProps) => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const sidebarItems: SidebarItemData[] = [
    {
      name: "Home",
      Icon: FaHome,
      href: "/",
    },
    {
      name: "Review",
      Icon: FaCheckDouble,
      href: "/review",
    },
    { name: "Form Builder", Icon: FaWpforms, href: "/form-builder" },
    {
      name: "Evaluation Progress",
      Icon: FaRegChartBar,
      href: "/evaluation-progress",
    },
    {
      name: "Employees",
      Icon: FaUsers,
      href: "/employees-list",
    },
  ];

  const toggleGroup = (name: string): void => {
    setOpenGroups((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const renderItem = (item: SidebarItemData) => {
    const allowedChildren = item.children || [];
    const isOpen = openGroups[item.name];

    if (allowedChildren.length > 0) {
      return (
        <Box key={item.name}>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            cursor="pointer"
            padding="5px 10px"
            onClick={() => toggleGroup(item.name)}
          >
            <Flex alignItems="center" gap="8px">
              {item.Icon && <item.Icon size={14} />}
              <Text>{item.name}</Text>
            </Flex>
            <IconButton size="xs" variant="ghost">
              {isOpen ? <FaChevronDown /> : <FaChevronUp />}
            </IconButton>
          </Flex>

          {isOpen && (
            <Flex flexDirection="column" gap="8px" paddingLeft="6px">
              {allowedChildren.map((child) => (
                <SidebarItem key={child.name} item={child} />
              ))}
            </Flex>
          )}
        </Box>
      );
    }

    return <SidebarItem key={item.name} item={item} />;
  };

  return (
    <Box
      position="fixed"
      top="0"
      bottom="0"
      padding="16px"
      width="240px"
      backgroundColor="bg.panel"
      shadow="sm"
      transition="0.3s"
      transform={isSidebarOpen ? "translateX(0)" : "translateX(-240px)"}
      zIndex="998"
      marginTop="72px"
      overflowY="auto"
    >
      <Flex flexDirection="column" gap="8px">
        {sidebarItems.map(renderItem)}
      </Flex>
    </Box>
  );
};

const SidebarItem = ({ item }: SidebarItemProps) => {
  const IconComponent = item.Icon;
  const location = useLocation();
  const isActive = item.href ? location.pathname === item.href : false;

  if (!item.href) return <></>;

  return (
    <ChakraLink
      asChild
      display="block"
      padding="5px 10px"
      _hover={{ bg: "blue.500", color: "white" }}
      textDecoration="none"
      backgroundColor={isActive ? "blue.500" : undefined}
      color={isActive ? "white" : undefined}
      fontWeight={isActive ? "semibold" : "normal"}
    >
      <RouterLink to={item.href}>
        <Flex gap="8px" alignItems="center">
          {IconComponent && <IconComponent />}
          {item.name}
        </Flex>
      </RouterLink>
    </ChakraLink>
  );
};

export default Sidebar;
