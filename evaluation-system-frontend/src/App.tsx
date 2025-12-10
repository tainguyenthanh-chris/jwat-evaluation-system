import { useState } from "react";
import "./App.css";
import { Box, Button, Card, CardActions, CardContent } from "@mui/material";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <Box className="flex justify-center items-center h-screen">
      <Card className="max-w-[300px] w-full me-3 mx-3">
        <CardContent className="text-center">Click count: {count}</CardContent>
        <CardActions className="flex justify-center">
          <Button
            variant="contained"
            color="success"
            onClick={() => setCount(count + 1)}
          >
            Click me !!!
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default App;
