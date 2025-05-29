import { SetStateAction, useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import html2canvas from "html2canvas";

import { usePhotoBooth } from "../context/PhotoBoothContext";
import Frame from "../components/Frame";

const existingColors = [
  "#FADADD",
  "#FFE4C4",
  "#F6EAC2",
  "#E3F2FD",
  "#D0EBFF",
  "#E0F7FA",
  "#D1F2EB",
  "#E8F5E9",
  "#FFF9C4",
  "#FFF3E0",
  "#F3E5F5",
  "#EDE7F6",
  "#ECEFF1",
  "#FBE9E7",
  "#FAF3DD",
  "#F0F4C3",
  "#D7CCC8",
  "#C8E6C9",
  "#F5F5DC",
  "#FFE0B2",
  "#F1F8E9",
  "#E1F5FE",
];

const Export = () => {
  const [frameColor, setFrameColor] = useState("#ffffff");
  const [showCustomColorPicker, setShowCustomColorPicker] = useState(false);
  const [frameStyle, setFrameStyle] = useState({
    strip: "flex h-max w-[200px] flex-col gap-[10px] px-2 pt-4 pb-6",
    image: "aspect-[3/2] w-full object-cover",
  });

  const frameRef = useRef<HTMLDivElement>(null);

  const { images, frame } = usePhotoBooth();

  useEffect(() => {
    switch (frame.id) {
      case "4-v":
        setFrameStyle({
          strip: "flex h-max w-[200px] flex-col gap-[10px] px-2 pt-4 pb-6",
          image: "aspect-[3/2] w-full object-cover",
        });
        break;
      case "4-g":
        setFrameStyle({
          strip:
            "flex h-max w-[354px] flex-wrap items-center justify-center gap-[10px] px-2 pt-4 pb-6",
          image: "aspect-[1/1.2] w-[154px] object-cover",
        });
        break;
      default:
        setFrameStyle({
          strip: "flex h-max w-[200px] flex-col gap-[10px] px-2 pt-4 pb-6",
          image: "aspect-[3/2] w-full object-cover",
        });
        break;
    }
  }, [frame.id]);

  const handleDownload = async () => {
    if (!frameRef.current) return;

    const canvas = await html2canvas(frameRef.current, {
      backgroundColor: null,
      useCORS: true,
      scale: 1,
    });

    const link = document.createElement("a");
    link.download = "photo-strip.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-12 md:flex-row">
      <div ref={frameRef}>
        <Frame
          images={images}
          stripStyle={frameStyle.strip}
          imageStyle={frameStyle.image}
          frameColor={frameColor}
        />
      </div>
      <div className="flex max-w-[400px] flex-col items-start">
        {/* color selector */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Select Frame Color</h2>
          <div className="flex flex-wrap items-center justify-start gap-2">
            {/* Custom color */}
            <button
              className="relative size-6"
              onClick={() => setShowCustomColorPicker(!showCustomColorPicker)}
            >
              <img src="/custom-color.png" alt="" />
              <div
                className={`absolute top-8 -left-4 z-10 ${showCustomColorPicker ? "" : "hidden"}`}
              >
                <SketchPicker
                  color={frameColor}
                  onChange={(updatedColor: { hex: SetStateAction<string> }) =>
                    setFrameColor(updatedColor.hex)
                  }
                />
              </div>
            </button>
            {/* Existing colors */}
            {existingColors.map((color) => (
              <button
                key={color}
                className="h-6 w-6 rounded-full"
                style={{ backgroundColor: color }}
                onClick={() => setFrameColor(color)}
              ></button>
            ))}
          </div>
        </div>
        {/* graphic selector */}

        {/* export button */}
        <button
          onClick={handleDownload}
          className="mt-6 cursor-pointer gap-2 rounded-full bg-black px-6 py-3 text-[16px] font-medium text-white transition duration-300 ease-in-out hover:bg-black/80"
        >
          Download Photo
        </button>
      </div>
    </div>
  );
};

export default Export;
