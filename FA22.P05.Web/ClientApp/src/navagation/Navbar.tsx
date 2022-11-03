import { useState } from "react";
import { AppBar, Toolbar, Tabs, Tab, IconButton, Avatar } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  const [tab, setTab] = useState();

  return (
    <>
      <AppBar position="static" sx={{ background: "black" }}>
        <Toolbar>
          <Link to="/">
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
            
            <IconButton className="link-style">
              <Link  style={{ color: "white" ,textDecoration : "none"}} to="listings">
                <Tab label="All Listings" />
              </Link>
            </IconButton>
            <Tab label="My Orders/Bids" />
          </Tabs>

          <IconButton sx={{ marginLeft: "auto" }}>
            <Avatar />
          </IconButton>
        </Toolbar>
      </AppBar>
    <Outlet/>
    </>
  );
}
