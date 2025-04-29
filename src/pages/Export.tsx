import { Link } from "react-router";
import { useRef } from "react";
import html2canvas from "html2canvas";

import { useBoothProvider } from "../store/use-booth-provider";

const Export = () => {
  const { images, isMirrored } = useBoothProvider();
  const exportRef = useRef<HTMLDivElement>(null);

  const handleExportImage = async () => {
    if (!exportRef.current) return;

    const canvas = await html2canvas(exportRef.current, {
      useCORS: true, // In case you load external images
      backgroundColor: null, // Transparent background if needed
    });

    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "photo-booth-result.png";
    link.click();
  };

  return (
    <div className="items-centerÏ flex w-full justify-center gap-12">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="mb-4 text-center text-xl font-bold">
          Thành quả của bạn đây!!!
        </h2>
        <div className="flex items-center gap-2">
          <Link
            to="/booth"
            className="cursor-pointer rounded-full border-2 border-black bg-black px-4 py-2 text-white uppercase hover:bg-purple-100 hover:text-black"
          >
            Chụp Lại
          </Link>
          <button
            className="cursor-pointer rounded-full border-2 border-black bg-white px-4 py-2 uppercase hover:bg-blue-200"
            onClick={handleExportImage}
          >
            Xuất File
          </button>
        </div>
      </div>
      <div
        ref={exportRef}
        className="relative flex aspect-[1/3.02] w-[200px] flex-col items-center gap-2 bg-[#faf8c8] px-4 py-4"
      >
        <img
          className="absolute top-0 left-0 z-1 h-full w-full"
          src="/details.PNG"
          alt=""
        />
        {images?.map((image) => (
          <img
            key={image}
            src={image}
            alt=""
            className={`z-0 w-[90%] ${isMirrored ? "" : "scale-x-[-1]"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Export;
