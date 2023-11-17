import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsBrightness from "@mui/icons-material/SettingsBrightness";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useColorScheme } from "@mui/material/styles";
import { useState } from "react";

function ModeSelect() {
  const [open, setOpen] = useState(false);
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    const selectedMode = event.target.value;
    setMode(selectedMode);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
        <Select
          labelId="label-select-dark-light-mode"
          id="label-select-dark-light-mode"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={mode}
          label="Mode"
          onChange={handleChange}
        >
          <MenuItem value="light">
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LightModeIcon fontSize="small" />
              Light
            </Box>
          </MenuItem>
          <MenuItem value="dark">
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <DarkModeOutlinedIcon fontSize="small" />
              Dark
            </Box>
          </MenuItem>
          <MenuItem value="system">
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <SettingsBrightness fontSize="small" />
              System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default ModeSelect;
