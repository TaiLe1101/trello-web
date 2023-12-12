import { isEmpty } from "lodash";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import {
  createNewCardAPI,
  createNewColumnAPI,
  fetchBoardDetailAPI,
  updateBoardAPI,
  updateColumnAPI,
} from "~/apis";
import AppBar from "~/components/AppBar";
import { generatePlaceholderCard } from "~/utils/formatters";
import { mapOrder } from "~/utils/sorts";
import BoardBar from "./BoardBar";
import BoardBarContent from "./BoardBarContent";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "657491f9daa438e92de43144";
    fetchBoardDetailAPI(boardId).then((resBoard) => {
      resBoard.columns = mapOrder(
        resBoard?.columns,
        resBoard?.columnOrderIds,
        "_id"
      );

      resBoard?.columns.forEach((column) => {
        //Xử lý column rỗng khi refresh website
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
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
    updateBoardAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds,
    });
  };

  const moveCardInTheSameColumn = (
    dndOrderedCards,
    dndOrderedCardIds,
    columnId
  ) => {
    // Update state board
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    );

    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards;
      columnToUpdate.cardOrderIds = dndOrderedCardIds;
    }

    setBoard(newBoard);

    // Gọi api
    updateColumnAPI(columnId, {
      cardOrderIds: dndOrderedCardIds,
    });
  };

  if (!board) {
    return (
      <Box
        sx={{
          px: "15px",
          bgcolor: (theme) => theme.palette.primary.light,
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <Skeleton
              height={50}
              width={30}
              sx={{ bgcolor: "#fff" }}
            ></Skeleton>
            <Skeleton
              height={50}
              sx={{ bgcolor: "#fff" }}
              width={50}
            ></Skeleton>
            <Skeleton
              height={50}
              sx={{ bgcolor: "#fff" }}
              width={70}
            ></Skeleton>
            <Skeleton
              height={50}
              sx={{ bgcolor: "#fff" }}
              width={70}
            ></Skeleton>
            <Skeleton
              height={50}
              sx={{ bgcolor: "#fff" }}
              width={70}
            ></Skeleton>
            <Skeleton
              height={50}
              sx={{ bgcolor: "#fff" }}
              width={70}
            ></Skeleton>
            <Skeleton
              height={50}
              sx={{ bgcolor: "#fff" }}
              width={70}
            ></Skeleton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <Skeleton
              height={50}
              sx={{ bgcolor: "#fff" }}
              width={120}
            ></Skeleton>
            <Skeleton
              height={50}
              sx={{ bgcolor: "#fff" }}
              width={100}
            ></Skeleton>
            <Skeleton
              height={50}
              sx={{ bgcolor: "#fff" }}
              width={30}
            ></Skeleton>
            <Skeleton
              height={50}
              sx={{ bgcolor: "#fff" }}
              width={30}
            ></Skeleton>
            <Skeleton
              height={30}
              sx={{ bgcolor: "#fff" }}
              width={30}
              variant="circular"
            ></Skeleton>
          </Box>
        </Box>
        <Box
          sx={{
            padding: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 4,
            }}
          >
            <Skeleton
              height={50}
              sx={{ bgcolor: "#fff" }}
              width={70}
            ></Skeleton>
            <Skeleton
              height={50}
              sx={{ bgcolor: "#fff" }}
              width={50}
            ></Skeleton>
            <Skeleton
              height={50}
              sx={{ bgcolor: "#fff" }}
              width={70}
            ></Skeleton>
            <Skeleton
              height={50}
              sx={{ bgcolor: "#fff" }}
              width={70}
            ></Skeleton>
            <Skeleton
              height={50}
              sx={{ bgcolor: "#fff" }}
              width={50}
            ></Skeleton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <Skeleton
              height={50}
              sx={{ bgcolor: "#fff" }}
              width={120}
            ></Skeleton>
            <Skeleton
              height={30}
              sx={{ bgcolor: "#fff" }}
              width={30}
              variant="circular"
            ></Skeleton>
          </Box>
        </Box>
        <Box
          sx={{
            padding: 1,
            display: "flex",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: "250px",
              height: "fit-content",
              bgcolor: "rgba(255,255,255,1)",
              p: 2,
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Skeleton width={180}></Skeleton>
              <Skeleton width={20}></Skeleton>
            </Box>
            <Box>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
            </Box>
          </Box>
          <Box
            sx={{
              width: "250px",
              height: "fit-content",
              bgcolor: "rgba(255,255,255,1)",
              p: 2,
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Skeleton width={180}></Skeleton>
              <Skeleton width={20}></Skeleton>
            </Box>
            <Box>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
            </Box>
          </Box>
          <Box
            sx={{
              width: "250px",
              height: "fit-content",
              bgcolor: "rgba(255,255,255,1)",
              p: 2,
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Skeleton width={180}></Skeleton>
              <Skeleton width={20}></Skeleton>
            </Box>
            <Box>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
            </Box>
          </Box>
          <Box
            sx={{
              width: "250px",
              height: "fit-content",
              bgcolor: "rgba(255,255,255,1)",
              p: 2,
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Skeleton width={180}></Skeleton>
              <Skeleton width={20}></Skeleton>
            </Box>
            <Box>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
            </Box>
          </Box>

          <Box
            sx={{
              width: "250px",
              height: "fit-content",
              bgcolor: "rgba(255,255,255,1)",
              p: 2,
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Skeleton width={180}></Skeleton>
              <Skeleton width={20}></Skeleton>
            </Box>
            <Box>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
            </Box>
          </Box>

          <Box
            sx={{
              width: "250px",
              height: "fit-content",
              bgcolor: "rgba(255,255,255,1)",
              p: 2,
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Skeleton width={180}></Skeleton>
              <Skeleton width={20}></Skeleton>
            </Box>
            <Box>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
              <Skeleton height={70} sx={{ p: 0, m: 0 }}></Skeleton>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardBarContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumn={moveColumn}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
      />
    </Box>
  );
}

export default Board;
