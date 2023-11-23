import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import AddCardIcon from "@mui/icons-material/AddCard";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentPaste from "@mui/icons-material/ContentPaste";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";

import { useState } from "react";

import ListCards from "./ListCards";

function Column() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        minWidth: "300px",
        maxWidth: "300px",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
        ml: 2,
        borderRadius: "6px",
        height: "fit-content",
        maxHeight: (theme) =>
          `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
      }}
    >
      {/* Box Column header */}
      <Box
        sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem !important",
          }}
        >
          Column Title
        </Typography>
        <Box>
          <Tooltip title="More Options">
            <ExpandMoreIcon
              sx={{ color: "text.primary", cursor: "pointer" }}
              id="fade-button-column-dropdown"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
          </Tooltip>
          <Menu
            id="fade-menu-column-dropdown"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem>
              <ListItemIcon>
                <AddCardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add new card</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCopy fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentPaste fontSize="small" />
              </ListItemIcon>
              <ListItemText>Paste</ListItemText>
            </MenuItem>

            <Divider />

            <MenuItem>
              <ListItemIcon>
                <SaveIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Archive this column</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <DeleteForeverIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove this column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Box Column content */}
      <ListCards></ListCards>

      {/* Box Column footer */}
      <Box
        sx={{
          height: (theme) => theme.trello.columnFooterHeight,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button startIcon={<AddCardIcon />}>Add new card</Button>
        <Tooltip title="Drag to move">
          <DragHandleIcon sx={{ cursor: "pointer" }} />
        </Tooltip>
      </Box>
    </Box>
  );
}

Column.propTypes = {};
export default Column;
