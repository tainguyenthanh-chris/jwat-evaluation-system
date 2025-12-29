import { Box } from "@chakra-ui/react";
import ContainerFluid from "./ContainerFluid";

const Footer = () => {
  return (
    <Box
      marginTop="auto"
      padding="16px"
      textAlign="center"
      backgroundColor="bg.panel"
      shadow="sm"
    >
      <ContainerFluid>THIS IS FOOTER</ContainerFluid>
    </Box>
  );
};

export default Footer;
