import { FaInstagram } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="px-6 pt-8">
      <div className="flex w-full flex-row items-center justify-between rounded-full border border-gray-200 bg-[white] px-6 py-2 shadow-2xl">
        <img
          src="https://www.beautyplus.com/logo-text-pc.png"
          alt="Logo"
          className="h-8"
        />
        <button className="rounded-full bg-[#f7bee1] p-2 shadow-md transition duration-300 ease-in-out">
          <FaInstagram size={24} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
