import { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import { fetchBoardDetailAPI } from "~/apis";
import AppBar from "~/components/AppBar";
import BoardBar from "./BoardBar";
import BoardBarContent from "./BoardBarContent";
import { mockData } from "~/apis/mock-data";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "657491f9daa438e92de43144";
    fetchBoardDetailAPI(boardId).then((resBoard) => setBoard(resBoard));
  }, []);

  return (
    <Box sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoardBarContent board={mockData.board} />
    </Box>
  );
}

export default Board;
