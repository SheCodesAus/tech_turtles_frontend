import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CreateListPage from "./pages/CreateListPage.jsx";

import App from "./components/App.jsx";
// import "./styles.css";
import "./output.css";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const router = createBrowserRouter([
  {
      path: "/",
      element: <App />,
      children: [
          { path: "/", element: <HomePage /> },
          { path: "/create-list", element: <CreateListPage /> },
          { path: "/signup", element: <SignUpPage /> },
          { path: "/login", element: <LoginPage /> },
      ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     {/* Here we wrap our app in the router provider so they render */}
      <RouterProvider router={router} />
  </React.StrictMode>
);