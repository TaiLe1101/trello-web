import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import Column from "./ListColumns/Column";
import Card from "./ListColumns/Column/ListCards/Card";

import {
  DndContext,
  DragOverlay,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { mapOrder } from "~/utils/sorts";
import ListColumns from "./ListColumns";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function BoardBarContent({ board }) {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const [orderedColumns, setOrderedColumns] = useState([]);

  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card?._id)?.includes(cardId)
    );
  };

  const handleDragStart = (e) => {
    setActiveDragItemId(e?.active?.id);

    setActiveDragItemType(
      e?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );

    setActiveDragItemData(e?.active?.data?.current);
  };

  const handleDragOver = (e) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const { active, over } = e;

    if (!over || !active) return;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;

    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns((prevColumns) => {
        const overCardIndex = overColumn.cards?.findIndex(
          (card) => card._id === overCardId
        );

        let newCardIndex;

        const isBelowOverItem =
          active?.rect?.current?.translated &&
          active?.current?.translated?.top >
            over?.rect?.top + over?.rect?.height;

        const modifier = isBelowOverItem ? 1 : 0;
        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn?.cards?.length + 1;

        const nextColumns = cloneDeep(prevColumns);

        const nextActiveColumn = nextColumns.find(
          (column) => column._id === activeColumn._id
        );

        const nextOverColumn = nextColumns.find(
          (column) => column._id === overColumn._id
        );

        // Old Column
        if (nextActiveColumn) {
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          );

          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card) => card._id
          );
        }

        // New Column
        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          );

          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            activeDraggingCardData
          );

          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
            (card) => card._id
          );
        }

        return nextColumns;
      });
    }
  };

  const handleDragEnd = (e) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log(
        "%c" + "[INFO] 👇\n",
        "color: #17a2b8; font-weight: 700;",
        "Kéo card và không làm gì cả"
      );
      return;
    }

    const { active, over } = e;

    if (!over || !active) return;

    if (active.id !== over.id) {
      // Find old position
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);

      // Find new position
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id);

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
      setOrderedColumns(dndOrderedColumns);
    }

    setActiveDragItemType(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      sensors={sensors}
    >
      <Box
        sx={{
          width: "100%",
          height: (theme) => theme.trello.boardContentHeight,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          p: "10px 0",
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}
BoardBarContent.propTypes = {};

export default BoardBarContent;
