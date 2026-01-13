import { Box, Heading, Input, InputGroup, Text } from "@chakra-ui/react";
import SummaryTable from "./components/SummaryTable";
import type { SummaryTableQuery } from "../../api/summaryTableApi";
import { useSummaryTable } from "../../hooks/useSummaryTable";
import { LuSearch } from "react-icons/lu";
import { useMemo, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import type { EvaluationQuery } from "../../hooks/useEvaluation";

const HistoryPage = () => {
  const { employeeNo } = useParams<{
    employeeNo: string;
  }>();
  const location = useLocation();

  const employeeName = location.state?.employeeName as string | undefined;
  const employeeNoList = (location.state?.employeeNoList as string[]) ?? [];

  if (employeeNo && !employeeNoList.includes(employeeNo)) {
    console.log("403:" + employeeNo);
    console.log(employeeNoList);
    return <Navigate to="/403" replace />;
  }

  const employeeInfo = {
    employeeNo: employeeNo ? employeeNo : "258157",
  };
  const summaryTableQuery: SummaryTableQuery = {
    employeeNo: employeeInfo.employeeNo,
  };
  const { data } = useSummaryTable(summaryTableQuery);
  // console.log("data:" + JSON.stringify(data, null, 2));
  const [searchInput, setSearchInput] = useState<string>("");
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchInput) return data;

    return data.filter((item) => item.reviewDate.includes(searchInput));
  }, [data, searchInput]);

  return (
    <Box
      maxW="1200px"
      mx="auto"
      p={6}
      bg="white"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading>
        Evaluation History {employeeName && "of " + employeeName}
      </Heading>
      <Box ml={"auto"} w={"40%"}>
        <InputGroup startElement={<LuSearch />}>
          <Input
            placeholder="Search by review date"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </InputGroup>
      </Box>

      <Box mt={"40px"}>
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((item) => (
            <SummaryTable
              key={item.formSubmissionId}
              reviewDate={item.reviewDate}
              summaryData={item.summaryData}
              formSubmissionId={item.formSubmissionId}
            />
          ))
        ) : (
          <Text textAlign="center" color="gray.500">
            No data found
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default HistoryPage;
