import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bg="gray.50"
      px={4}
    >
      <Heading size="2xl" color="red.500">
        403
      </Heading>

      <Heading size="md" mt={4}>
        Access Denied
      </Heading>

      <Text mt={2} color="gray.600">
        You do not have permission to access this page.
      </Text>

      <Button mt={6} colorScheme="blue" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  );
};

export default Forbidden;
