import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar';
import ListingsPage from '../pages/Listings/listings';
import LogIn from '../pages/Log-in/logInPage';

export const routes = {
  home: "/",
  logIn: "/log-in",
  signUp: "/sign-up",
  listings: "/listings",

};

export default function NavigationRoutes() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path={routes.home} />
          <Route path={routes.listings} element={<ListingsPage/>} />
          <Route path={routes.logIn} element={<LogIn />} />
          <Route path={routes.signUp} />
        </Routes>
    </Router>
  )
}

