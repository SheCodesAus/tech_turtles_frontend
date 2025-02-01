import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import CreateListPage from "./pages/CreateListPage.jsx";
import ListsListingPage from "./pages/ListsListingPage.jsx";
import ListDetailPage from "./pages/ListDetailPage.jsx";
import SharedDetailPage from "./pages/SharedDetailPage.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import "./output.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/", element: <HomePage /> },
			{ path: "/create-list", element: <ProtectedRoute><CreateListPage /></ProtectedRoute> },
			{ path: "/signup", element: <SignUpPage /> },
			{ path: "/login", element: <LoginPage /> },
			{ path: "/lists", element: <ProtectedRoute><ListsListingPage /></ProtectedRoute> },
			{ path: "/lists/:listId", element: <ProtectedRoute><ListDetailPage /></ProtectedRoute> },
			{ path: "/recipients/:uuid", element: <SharedDetailPage /> },
			{ path: "*", element: <NotFoundPage /> },
		],
	},
	// { path: "*", element: <NotFoundPage /> } 
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		{/* Here we wrap our app in the router provider so they render */}
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);
