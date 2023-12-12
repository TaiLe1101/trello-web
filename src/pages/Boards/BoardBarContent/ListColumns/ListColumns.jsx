import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import CloseIcon from "@mui/icons-material/Close";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useState } from "react";
import Column from "./Column";
import { toast } from "react-toastify";

function ListColumns({ columns, createNewColumn, createNewCard }) {
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleOpenNewColumnForm = () =>
    setOpenNewColumnForm(!openNewColumnForm);

  const handleAddNewColumn = () => {
    if (!newColumnTitle) {
      toast.error('Vui lòng nhập "Column Title"');
      return;
    }

    // Tạo dữ liệu gọi column api
    const newColumnData = {
      title: newColumnTitle,
    };

    createNewColumn(newColumnData);

    toggleOpenNewColumnForm();
    setNewColumnTitle("");
  };

  return (
    <SortableContext
      items={columns?.map((column) => column._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          "&::-webkit-scrollbar-track": {
            m: 2,
          },
        }}
      >
        {columns?.map((column) => (
          <Column
            key={column._id}
            column={column}
            createNewCard={createNewCard}
          />
        ))}

        {/* Box add new column */}

        {!openNewColumnForm ? (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
            }}
          >
            <Button
              onClick={toggleOpenNewColumnForm}
              sx={{
                color: "white",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
              }}
              startIcon={<NoteAddIcon />}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              p: 1,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              label="Enter column title"
              variant="outlined"
              autoFocus
              type="text"
              size="small"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                "& label": {
                  color: "white",
                },
                "&  input": {
                  color: "white",
                },
                "&  label.Mui-focused": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{
                  boxShadow: "none",
                  border: "0.5px solid",
                  borderColor: (theme) => theme.palette.success.main,
                  "&:hover": { bgcolor: (theme) => theme.palette.success.main },
                }}
                onClick={handleAddNewColumn}
              >
                Add Column
              </Button>
              <CloseIcon
                fontSize="small"
                sx={{
                  color: "white",
                  cursor: "pointer",
                  "&:hover": { color: (theme) => theme.palette.warning.light },
                }}
                onClick={toggleOpenNewColumnForm}
              ></CloseIcon>
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
}

ListColumns.propTypes = {};
export default ListColumns;
