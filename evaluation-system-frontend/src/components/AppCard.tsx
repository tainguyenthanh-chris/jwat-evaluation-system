import { Flex, type FlexProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface AppCardProps extends FlexProps {
  children: ReactNode;
  bg?: string;
}

const AppCard = ({ children, bg = "bg.panel", ...props }: AppCardProps) => {
  return (
    <Flex
      direction={"column"}
      gap={"16px"}
      background={bg}
      shadow={"sm"}
      padding={"16px"}
      rounded={"sm"}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default AppCard;
