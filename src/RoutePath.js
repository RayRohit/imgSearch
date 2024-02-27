import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import SearchImage from "./pages/SearchImage";
import AddDb from "./pages/AddDb";
import RecentSearch from "./pages/RecentSearch";
import FaceList from "./pages/FaceList";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    children: [
      {
        path: "",
        element: <SearchImage />,
      },
      {
        path: "adddatabase",
        element: <FaceList />,
      },
      {
        path: "recentsearch",
        element: <RecentSearch />,
      },
      // Add other nested routes as needed
    ],
  },
]);
