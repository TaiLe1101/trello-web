import { isEmpty } from "lodash";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import {
  createNewCardAPI,
  createNewColumnAPI,
  fetchBoardDetailAPI,
  updateBoardAPI,
} from "~/apis";
import AppBar from "~/components/AppBar";
import { generatePlaceholderCard } from "~/utils/formatters";
import BoardBar from "./BoardBar";
import BoardBarContent from "./BoardBarContent";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "657491f9daa438e92de43144";
    fetchBoardDetailAPI(boardId).then((resBoard) => {
      //Xử lý column rỗng khi refresh website
      resBoard.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        }
      });
      setBoard(resBoard);
    });
  }, []);

  const createNewColumn = async (newColumnData) => {
    const data = {
      ...newColumnData,
      boardId: board._id,
    };

    const createdColumn = await createNewColumnAPI(data);

    // Xử lý tạo column rỗng kéo thả card
    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];

    // Cập nhật lại ui
    const newBoard = { ...board };
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);
    setBoard(newBoard);
  };

  const createNewCard = async (newCardData) => {
    const data = {
      ...newCardData,
      boardId: board._id,
    };

    const createdCard = await createNewCardAPI(data);
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === createdCard.columnId
    );

    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard);
      columnToUpdate.cardOrderIds.push(createdCard._id);
    }

    setBoard(newBoard);
  };

  const moveColumn = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);

    // Cập nhật lại giao diện board
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    //Gọi api
    await updateBoardAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds,
    });
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardBarContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumn={moveColumn}
      />
    </Box>
  );
}

export default Board;
