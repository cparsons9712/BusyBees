import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "../src/Styling/index.css";
import App from "./App";
import Root from "./Components/Pages/TestPage";
import ErrorPage from "./Components/Pages/ErrorPage";
import Header from "./Components/Structure/HeaderWrapper";
import { ChakraProvider } from "@chakra-ui/react";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/blocks",
        element: <h1>BLOCKS</h1>,
      },
      {
        path: "/task",
        element: <h1>TASK</h1>,
      },
      {
        path: "/dump",
        element: <h1>BRAIN DUMP</h1>,
      },
      {
        path: "/profile",
        element: <h1>USER PROFILE</h1>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
