import { Flex, Box, useBreakpointValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import ContainerFluid from "./ContainerFluid";

const DashboardLayout = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <Flex direction="column" height="100vh" backgroundColor="bg.muted">
      <Sidebar isMobile={isMobile} isSidebarOpen={isSidebarOpen} />
      <Flex
        marginLeft={!isMobile ? (isSidebarOpen ? "240px" : 0) : 0}
        transition="0.3s"
        direction="column"
        gap="16px"
        flex="1"
      >
        <Header
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <Flex marginTop="72px" direction="column" gap="16px">
          <Box paddingY="16px">
            <ContainerFluid>
              <Outlet />
            </ContainerFluid>
          </Box>
        </Flex>

        <Footer />
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
