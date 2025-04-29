import { Link } from "react-router";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router";

import { useAuthStore } from "../store/use-auth-provider";

const Navbar = () => {
  const navigate = useNavigate();
  const { email, logout } = useAuthStore();

  return (
    <div className="flex h-20 w-full items-center justify-between border-b border-black px-6">
      <Link to={"/"} className="text-xl font-bold">
        The Boothy
      </Link>
      <div className="flex items-center justify-center gap-3">
        {!email ? (
          <>
            <Link
              to="/register"
              className="cursor-pointer rounded-full border-2 border-black bg-black px-4 py-2 text-white uppercase hover:bg-purple-100 hover:text-black"
            >
              Đăng Ký
            </Link>
            <Link
              to="/login"
              className="cursor-pointer rounded-full border-2 border-black bg-white px-4 py-2 uppercase hover:bg-blue-200"
            >
              Đăng nhập
            </Link>
          </>
        ) : (
          <>
            <button
              className="cursor-pointer rounded-full border-2 border-black bg-white px-4 py-2 uppercase hover:bg-blue-200"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Đăng xuất
            </button>
            <Link to="/booth" className="rounded-full bg-black p-2">
              <Camera className="text-white" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
