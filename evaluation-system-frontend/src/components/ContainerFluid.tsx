import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface ContainerFluidProps {
  children: ReactNode;
}

const ContainerFluid = ({ children }: ContainerFluidProps) => {
  return <Box margin="0 16px">{children}</Box>;
};

export default ContainerFluid;
