import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";

import AppCard from "../../components/AppCard";
import EmployeeTable from "./EmployeeTable";
import type { EmployeeBackend } from "../../types/emp";
import { axiosInstant } from "../../lib/axios";

const EmpTablePage = () => {
  const [employees, setEmployees] = useState<EmployeeBackend[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "My Employee List";
  }, []);

  const getEmployeesByBoss = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstant.get("/emp/by-boss");
      setEmployees(res.data.data);
    } catch (err) {
      setError("Failed to load employees");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployeesByBoss();
  }, []);

  return (
    <AppCard>
      <Flex alignItems="center" justifyContent="space-between" gap="16px">
        <Flex alignItems="center" gap="16px">
          <IconButton aria-label="back" variant="ghost">
            <FaArrowLeft />
          </IconButton>
          <Heading>Employee List</Heading>
        </Flex>
      </Flex>

      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {!isLoading && !error && (
        <EmployeeTable employees={employees} onRefresh={getEmployeesByBoss} />
      )}
    </AppCard>
  );
};

export default EmpTablePage;
