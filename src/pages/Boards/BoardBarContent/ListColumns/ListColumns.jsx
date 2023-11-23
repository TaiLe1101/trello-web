import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import NoteAddIcon from "@mui/icons-material/NoteAdd";

import Column from "./Column";

function ListColumns() {
  return (
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
      <Column />
      <Column />

      {/* Box add new column */}
      <Box
        sx={{
          minWidth: "200px",
          maxWidth: "200px",
          mx: 2,
          borderRadius: "6px",
          height: "fit-content",
          bgcolor: "#ffffff3d",
        }}
      >
        <Button
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
    </Box>
  );
}

ListColumns.propTypes = {};
export default ListColumns;