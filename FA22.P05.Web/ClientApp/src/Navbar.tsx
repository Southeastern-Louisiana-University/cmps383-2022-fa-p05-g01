import React, { useState } from 'react'
import { AppBar, Toolbar, Tabs, Tab, IconButton, Avatar } from "@mui/material";

export default function Navbar() {

  const [tab, setTab] = useState();

  return (
    <>
        <AppBar position="static" sx={{background: "#1f2b39"}}>
            <Toolbar>
              <IconButton sx={{color: "white"}}>Matrix Marketplace</IconButton>

              <Tabs textColor="inherit" value={tab} onChange={ (event, tab) => setTab(tab)} indicatorColor="primary">
                <Tab label="My Listings" />
                <Tab label="All Listings" />
                <Tab label="My Orders/Bids" />
              </Tabs>

              <IconButton sx={{marginLeft: 'auto'}}>
                <Avatar />
              </IconButton>
            </Toolbar>
        </AppBar>
    </>
  )
}