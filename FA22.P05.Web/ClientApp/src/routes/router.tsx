    import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import  ListingsPage  from "../pages/Listings/listings";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "listings",
        element: <ListingsPage />,
         
      },
    ],
  },
]);
