import { useMutation, useQuery } from "@tanstack/react-query";
import { getEmployee  } from "../api/adminEmployeeApi";
import { getReviewingEmployee, type AdminReviewingEmployeeQuery } from "../api/adminEvaluationProgress";


export const useAdminReviewingEmployee = (query: AdminReviewingEmployeeQuery) => {
  return useQuery({
    queryKey: ["admin-reviewing-employee", query],
    queryFn: () => getReviewingEmployee(query),
  });
};

