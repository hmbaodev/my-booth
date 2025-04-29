import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "./layouts/RootLayout";
import Booth from "./pages/Booth";
import Home from "./pages/Home";
import Export from "./pages/Export";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Actions from "./pages/Actions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/actions",
        Component: Actions
      },
      {
        path: "/",
        Component: Home
      },
      {
        path: "/booth",
        Component: Booth
      },
      {
        path: "/export",
        Component: Export
      },
      {
        path: "/login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      }
    ]
  }
]);

const App = () => {
  // return (
  //   <RouterProvider router={router}>
  //     <div className="flex min-h-screen w-full items-center justify-center bg-gray-200 p-8">
  //       <Booth />
  //     </div>
  //   </RouterProvider>
  // );

  return <RouterProvider router={router} />
};

export default App;
