import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
// import { useAuthStore } from "@/store/authStore";

const protectedMenuListAll = [
  "home",
  "review",
  "my-employee-list",
  "form-builder",
  "evaluation-progress",
  "history",
  "admin/employee",
];

const protectedMenuListOfEmployee = ["home", "review", "history"];

const protectedMenuListOfLeader = [
  "home",
  "review",
  "history",
  "employee-list",
  "admin",
];
const protectedMenuListOfAdmin = ["form-builder"];

type Props = {
  menuKey: string;
  children: ReactNode;
};

export const protectedMenuList = protectedMenuListAll;

const ProtectedRoute = ({ menuKey, children }: Props) => {
  const userMenus = protectedMenuList;
  // const userMenus = useAuthStore((state) => state.permissions);
  console.log("userMenus: " + JSON.stringify(userMenus, null, 2));
  if (!userMenus?.some((m) => m.toLowerCase() === menuKey.toLowerCase())) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
