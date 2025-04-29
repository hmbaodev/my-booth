import { Outlet } from "react-router";

import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="h-[calc(100vh-80px)] flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
