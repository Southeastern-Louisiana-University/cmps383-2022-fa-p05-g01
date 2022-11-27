import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../navigation/Navbar";
import Album from "../pages/Listings/listingPage";
import LogIn from "../pages/Log-in/logInPage";
import ListingDetail from "../pages/Listings/listingView";
import CreateListing from "../pages/Listings/addListing";

export const routes = {
  home: "/",
  logIn: "/log-in",
  signUp: "/sign-up",
  listings: "/listings",
  listingsDetail: "/listings/:id",
  addListing: "/listings/add",
};

export default function NavigationRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={routes.home} />
        <Route path={routes.listings} element={<Album />} />
        <Route path={routes.listingsDetail} element={<ListingDetail />} />
        <Route path ={routes.addListing} element = {<CreateListing/>}/>
        <Route path={routes.logIn} element={<LogIn />} />
        <Route path={routes.signUp} />
      </Routes>
    </Router>
  );
}
