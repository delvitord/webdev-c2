import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import SourceIcon from "@mui/icons-material/Source";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CollectionsIcon from "@mui/icons-material/Collections";
import SendIcon from "@mui/icons-material/Send";
import { useAppCv } from "../../appCv";
import { useNavigate } from "react-router-dom";

const drawerWidth = 265;
const iconArray = [PersonIcon, SchoolIcon, CorporateFareIcon, SourceIcon, TipsAndUpdatesIcon, CollectionsIcon];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const open = useAppCv((state) => state.dopen);
  const navigate = useNavigate()

  const handleButton = () => {
    navigate("/datadiri/personal-web")
  }

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
      }}
    >
      <CssBaseline />
      <Box height={50} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            "Data Diri",
            "Riwayat Pendidikan",
            "Pengalaman Organisasi",
            "Portofolio",
            "Skill",
            "Galeri",
          ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 40,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                component="a" // Menggunakan anchor (a) sebagai tautan
                href={
                  index === 0
                    ? "/datadiri"
                    : index === 1
                    ? "/pendidikan"
                    : index === 2
                    ? "/organisasi"
                    : index === 3
                    ? "/portofolio"
                    : index === 4
                    ? "/skill"
                    : index === 5
                    ? "/galeri"
                    : "/"
                } // Sesuaikan rute
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {React.createElement(iconArray[index])}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />{" "}
        {/* Add a flexible box to push the button to the bottom */}
        <Button
          variant="contained"
          size="small" // Make the button smaller
          sx={{
            color:"white",
            mb: 3,
            width: 180,
            height: 35,
            alignSelf: "center",
            backgroundColor: "#333333",
          }}
          onClick={handleButton}
          endIcon={<SendIcon />}
        >
          Lauch Your Web
        </Button>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}></Box>
    </Box>
  );
}
