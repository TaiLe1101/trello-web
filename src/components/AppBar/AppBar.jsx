import AppsIcon from "@mui/icons-material/Apps";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";

import { ReactComponent as TrelloIcon } from "~/assets/trello.svg";
import ModeSelect from "~/components/ModeSelect";
import Recent from "./Menus/Recent";
import Starred from "./Menus/Starred";
import Templates from "./Menus/Templates";
import Workspaces from "./Menus/Workspaces";
import Profiles from "./Menus/Profiles";

function AppBar() {
  return (
    <>
      <Box
        px={2}
        sx={{
          width: "100%",
          height: (theme) => theme.trello.appBarHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AppsIcon sx={{ color: "primary.main" }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <SvgIcon
              component={TrelloIcon}
              inheritViewBox
              sx={{ color: "primary.main" }}
            ></SvgIcon>
            <Typography
              variant="span"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              Trello
            </Typography>
          </Box>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined">Create</Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            id="outlined-search"
            label="Search"
            type="search"
            size="small"
          />
          <ModeSelect />
          <Tooltip title="Notifications">
            <Badge color="secondary" variant="dot" sx={{ cursor: "pointer" }}>
              <NotificationsNone />
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <Badge color="secondary" sx={{ cursor: "pointer" }}>
              <HelpOutlineOutlinedIcon />
            </Badge>
          </Tooltip>
          <Profiles />
        </Box>
      </Box>
    </>
  );
}

AppBar.propTypes = {};
export default AppBar;
