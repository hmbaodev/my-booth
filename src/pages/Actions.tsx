import { Link } from "react-router";

const Actions = () => {
  const handleUpload = () => {
    alert("Chức năng này tụi mình đang làm. Bạn thông cảm nhé!!!");
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center text-xl font-bold">Bạn Muốn Gì Nè!!!</h2>
      <div className="flex items-center gap-2">
        <Link
          to="/booth"
          className="cursor-pointer rounded-full border-2 border-black bg-black px-4 py-2 text-white uppercase hover:bg-purple-100 hover:text-black"
        >
          Chụp Hình
        </Link>
        <button
          className="cursor-pointer rounded-full border-2 border-black bg-white px-4 py-2 uppercase hover:bg-blue-200"
          onClick={handleUpload}
        >
          Upload hình
        </button>
      </div>
    </div>
  );
};

export default Actions;
