import {
  AppBar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "../SideBar";
import { useState } from "react";
import { useContext } from "react";
import { InfoContexts } from "../../../providers";

const Navigation = () => {
  const { dispatch, isSynchronization } = useContext(InfoContexts);
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleSync = () => {
    dispatch({ type: "TOGGLE_SYNCHRONIZATION" });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, fontWeight: "bold" }}
            component="div"
          >
            HTTP
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={isSynchronization}
                onChange={toggleSync}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="동기화 사용"
          />
        </Toolbar>
      </AppBar>
      <SideBar open={open} handleDrawerClose={handleDrawerClose} />
    </Box>
  );
};

export default Navigation;
