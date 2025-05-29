import { useState } from "react";

import { MdKeyboardArrowDown } from "react-icons/md";
import { usePhotoBooth } from "../context/PhotoBoothContext";

const frameOptions = [
  { id: "4-v", text: "4 Vertical", image: "/4_1.4d611fe7.png", numOfImages: 4 },
  { id: "4-g", text: "4 Grid", image: "/4_5.82bbc796.png", numOfImages: 4 },
];

const FrameSelection = () => {
  const [openOptions, setOpenOptions] = useState(false);
  const [currentOption, setCurrentOption] = useState(frameOptions[0]);

  const { setFrame } = usePhotoBooth()

  return (
    <div className="relative min-w-[120px]">
      <button
        onClick={() => setOpenOptions(!openOptions)}
        className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-md"
      >
        <div className="flex items-center gap-2">
          <img src={currentOption.image} alt="" className="size-6" />
          <span className="text-[16px]">{currentOption.text}</span>
        </div>
        <MdKeyboardArrowDown />
      </button>
      {openOptions && (
        <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-300 bg-white p-2 shadow-md">
          {frameOptions.map((option) => (
            <button
              key={option.text}
              onClick={() => {
                setCurrentOption(option);
                setOpenOptions(false);
                setFrame({
                  id: option.id,
                  numOfImages: option.numOfImages,
                  text: option.text,
                  image: option.image
                });
              }}
              className="flex w-full items-center gap-2 rounded-md px-1 py-2 text-left hover:bg-gray-100"
            >
              <img src={option.image} alt="" className="size-6" />
              <span className="text-[16px]">{option.text}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FrameSelection;
