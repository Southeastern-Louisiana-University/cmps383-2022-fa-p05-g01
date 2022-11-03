import  {createBrowserRouter}  from "react-router-dom";
import App from "../App";
import ListingsPage from "../pages/Listings/listingPage";
import ListingDetail from "../pages/Listings/listingView";
export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/listings",
        element: <ListingsPage/>,
      
      },
      {
        path: "/listings/:id",
        element: <ListingDetail/>
      }
    ]
  },
]);
