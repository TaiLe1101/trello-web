import Box from "@mui/material/Box";
import AppBar from "~/components/AppBar";

import BoardBar from "./BoardBar";
import BoardBarContent from "./BoardBarContent";
import { mockData } from "~/apis/mock-data";

function Board() {
  return (
    <Box disableGutters sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoardBarContent board={mockData.board} />
    </Box>
  );
}

export default Board;
