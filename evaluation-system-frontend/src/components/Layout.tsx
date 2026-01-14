import {
  Flex,
  Box,
  useBreakpointValue,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import ContainerFluid from "./ContainerFluid";
import {
  useProgressingEvaluation,
  type EvaluationQuery,
} from "../hooks/useEvaluation";

const DashboardLayout = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const HIDE_FLOATING_BOX_PATHS = ["/review", "/login"];
  const shouldHideFloatingBox = HIDE_FLOATING_BOX_PATHS.some((path) =>
    location.pathname.startsWith(path)
  );
  const query: EvaluationQuery = {};

  const { data } = useProgressingEvaluation(query);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <Flex direction="column" minHeight="100vh" backgroundColor="bg.muted">
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
        {data?.submissionStatus === "PENDING" && !shouldHideFloatingBox && (
          <Box
            position="fixed"
            right="40px"
            bottom="40px"
            width="360px"
            borderRadius="lg"
            p={4}
            bg={data?.submissionStatus === "PENDING" ? "green.100" : "blue.100"}
            boxShadow="lg"
          >
            {data?.submissionStatus === "PENDING" ? (
              <VStack align="stretch">
                <Text fontWeight="bold" fontSize="md" color="green">
                  You have new review session
                </Text>

                {/* <Text fontSize="sm" color="green.700">
                  Due date: {reviewDate}
                </Text> */}

                <Button
                  mt={2}
                  colorScheme="green"
                  colorPalette={"green"}
                  size="sm"
                  borderRadius="md"
                  onClick={() => navigate("/review")}
                >
                  Review now
                </Button>
              </VStack>
            ) : (
              <VStack align="stretch">
                <Text fontWeight="bold" fontSize="md" color="blue.800">
                  Boss is reviewing you
                </Text>

                <Text fontSize="sm" color="blue.700">
                  Next Boss: {data?.submissionStatus}
                </Text>
              </VStack>
            )}
          </Box>
        )}

        <Footer />
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
