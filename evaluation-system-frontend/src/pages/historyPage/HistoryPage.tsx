import {
  Box,
  Heading,
  Input,
  InputGroup,
  useStatStyles,
} from "@chakra-ui/react";
import SummaryTable from "./components/SummaryTable";
import type { SummaryTableQuery } from "../../api/summaryTableApi";
import { useSummaryTable } from "../../hooks/useSummaryTable";
import { LuSearch } from "react-icons/lu";
import { useMemo, useState } from "react";

const HistoryPage = () => {
  const employeeInfo = {
    employeeNo: "258157",
  };
  const summaryTableQuery: SummaryTableQuery = {
    employeeNo: employeeInfo.employeeNo,
  };
  const { data } = useSummaryTable(summaryTableQuery);
  console.log("data:" + JSON.stringify(data, null, 2));
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
      <Heading>Evaluation History</Heading>
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
        {filteredData?.map((item) => (
          <SummaryTable
            key={item.formSubmissionId}
            reviewDate={item.reviewDate}
            summaryData={item.summaryData}
            formSubmissionId={item.formSubmissionId}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HistoryPage;
