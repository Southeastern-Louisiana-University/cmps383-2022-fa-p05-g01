import React, { useState } from "react";
import { AppBar, Toolbar, Tabs, Tab, IconButton, Avatar } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  const [tab, setTab] = useState();

  return (
    <>
      <AppBar position="static" sx={{ background: "#1f2b39" }}>
        <Toolbar>
          <Link to="/">
            <IconButton sx={{ color: "white" }}>Matrix Marketplace</IconButton>
          </Link>

          <Tabs
            textColor="inherit"
            value={tab}
            onChange={(event, tab) => setTab(tab)}
            indicatorColor="primary"
          >
            <Tab label="My Listings" />
            <IconButton sx={{ color: "white" }}>
            <Link  to="listings"><Tab label="All Listings"/> </Link>
             </IconButton>
   
           
            <Tab label="My Orders/Bids" />
          </Tabs>

          <IconButton sx={{ marginLeft: "auto" }}>
            <Avatar />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
