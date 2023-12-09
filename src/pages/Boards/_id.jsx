import { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import { mockData } from "~/apis/mock-data";
import AppBar from "~/components/AppBar";
import BoardBar from "./BoardBar";
import BoardBarContent from "./BoardBarContent";
import { fetchBoardDetailAPI } from "~/apis";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "6573eaea3e7b0658d0466ffc";
    fetchBoardDetailAPI(boardId).then((resBoard) => setBoard(resBoard));
  }, []);

  return (
    <Box sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardBarContent board={board} />
    </Box>
  );
}

export default Board;
