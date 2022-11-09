import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { routes } from "../routes/config";

export default function Navbar() {
  const [tab, setTab] = useState();
  const [element, setElement] = useState<null | HTMLElement>();
  const open = Boolean(element);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setElement(event.currentTarget);
  };
  const handleClose = () => {
    setElement(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ background: "#1f2b39" }}>
        <Toolbar>
          <Link
            component={RouterLink}
            underline="none"
            color="inherit"
            to={routes.home}
          >
            <IconButton sx={{ color: "white" }}>Matrix Marketplace</IconButton>
          </Link>

          <Tabs
            textColor="inherit"
            value={tab}
            onChange={(event, tab) => setTab(tab)}
            indicatorColor="primary"
            text-decoration="none"
          >
            <Tab label="My Listings" />

            <Link
              component={RouterLink}
              underline="none"
              color="inherit"
              to={routes.listings}
            >
              <Tab label="All Listings" />
            </Link>

            <Tab label="My Orders/Bids" />
          </Tabs>

          <IconButton sx={{ marginLeft: "auto" }} onClick={handleClick}>
            <Avatar />
          </IconButton>
          <Menu
            anchorEl={element}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
          >
            <MenuItem color="white">
              <Link
                component={RouterLink}
                underline="none"
                color="inherit"
                to={routes.logIn}
              >
                Log In
              </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}
