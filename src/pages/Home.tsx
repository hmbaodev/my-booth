import { Link } from "react-router";

const Home = () => {
  return (
    <div className="flex items-center gap-10 px-4">
      <div className="w-[40%] flex justify-end">
        <img src="/banner-2.webp" className="max-w-[400px]" alt="" />
      </div>
      <div className="flex w-[60%] flex-col items-start gap-3 pr-[80px]">
        <h1 className="text-[60px] font-bold uppercase">
          Chào mừng bạn đến với The Boothy
        </h1>
        <p className="text-md">
          Ứng dụng chụp ảnh Photobooth giúp bạn lưu giữ những khoảnh khắc vui
          nhộn cùng bạn bè và người thân. Chỉ với vài bước đơn giản, bạn có thể
          chụp nhiều bức ảnh liên tiếp và xuất file đẹp mắt với khung hình đáng
          yêu.
        </p>
        <Link
          to="/register"
          className="cursor-pointer rounded-full border-2 border-black bg-black px-4 py-2 text-white uppercase hover:bg-purple-100 hover:text-black"
        >
          Đăng ký tài khoản để bắt đầu
        </Link>
      </div>
    </div>
  );
}

export default Home