import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
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
import SendIcon from "@mui/icons-material/Send";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LinkIcon from '@mui/icons-material/Link';
import SourceIcon from "@mui/icons-material/Source";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CollectionsIcon from "@mui/icons-material/Collections";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Button } from "@mui/material";
import { useAppCv } from "../../appCv";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const drawerWidth = 295;
const iconArray = [DashboardIcon, ManageAccountsIcon, PersonIcon, SchoolIcon, CorporateFareIcon, SourceIcon, TipsAndUpdatesIcon, CollectionsIcon, LinkIcon];
const menuItems = {
  1: [
    { text: "Dashboard", icon: 0 },
    { text: "Manage User", icon: 1 },
  ],
  2: [
    { text: "Data Diri", icon: 2 },
    { text: "Riwayat Pendidikan", icon: 3 },
    { text: "Pengalaman Organisasi", icon: 4 },
    { text: "Portofolio", icon: 5 },
    { text: "Skill", icon: 6 },
    { text: "Galeri", icon: 7 },
    { text: "Personal Web", icon: 8 },
  ],
};

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
  const navigate = useNavigate();
  const location = useLocation();

  const [activePage, setActivePage] = useState("");
  const userRole = parseInt(localStorage.getItem("role"), 10);
  console.log("userRole:", userRole);

  const userMenuItems = menuItems[userRole];

  useEffect(() => {
    // Check if userRole is valid and not NaN
    if (!isNaN(userRole)) {
      const path = location.pathname;
      let activePage = "";

      switch (path) {
        case "/dashboard":
          activePage = "Dashboard";
          break;
        case "/user":
          activePage = "Manage User";
          break;
        case "/datadiri":
          activePage = "Data Diri";
          break;
        case "/pendidikan":
          activePage = "Riwayat Pendidikan";
          break;
        case "/organisasi":
          activePage = "Pengalaman Organisasi";
          break;
        case "/portofolio":
          activePage = "Portofolio";
          break;
        case "/skill":
          activePage = "Skill";
          break;
        case "/galeri":
          activePage = "Galeri";
          break;
        case "/custom-url":
          activePage = "Personal Web";
          break;
        default:
          activePage = "";
      }

      setActivePage(activePage);
    }
  }, [userRole, location]);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
      }}
    >
      <CssBaseline />
      <Box height={50} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {userMenuItems.map((item) => (
            <ListItem key={item.text}>
              <ListItemButton
                sx={{
                  minHeight: 40,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor: item.text === activePage ? "#f5f5f5" : "transparent",
                }}
                component="a"
                href={
                  item.text === "Dashboard"
                    ? "dashboard"
                    : item.text === "Manage User"
                    ? "user"
                    : item.text === "Data Diri"
                    ? "datadiri"
                    : item.text === "Riwayat Pendidikan"
                    ? "pendidikan"
                    : item.text === "Pengalaman Organisasi"
                    ? "organisasi"
                    : item.text === "Portofolio"
                    ? "portofolio"
                    : item.text === "Skill"
                    ? "skill"
                    : item.text === "Galeri"
                    ? "galeri"
                    : item.text === "Personal Web"
                    ? "custom-url"
                    : "/"
                }
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {React.createElement(iconArray[item.icon])}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}></Box>
    </Box>
  );
}
