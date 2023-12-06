import Box from "@mui/material/Box";

import AppBar from "~/components/AppBar";
import { mockData } from "~/apis/mock-data";
import BoardBar from "./BoardBar";
import BoardBarContent from "./BoardBarContent";

function Board() {
  return (
    <Box sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoardBarContent board={mockData.board} />
    </Box>
  );
}

export default Board;
