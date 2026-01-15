import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

const HomePage = () => {
  const navigate = useNavigate();

  const menuList = useAuthStore((s) => s.permissions);

  if (!menuList) navigate("/login");

  useEffect(() => {
    if (!menuList || menuList.length === 0) return;

    navigate(menuList[0], { replace: true });
  }, [menuList, navigate]);

  return null;
  // return <Box>Home Page</Box>;
};

export default HomePage;
