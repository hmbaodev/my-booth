import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

import { usePhotoBooth } from "../context/PhotoBoothContext";

const delayOptions = [1, 3, 5, 7, 10];

const DelaySelection = () => {
  const [openOptions, setOpenOptions] = useState(false);
  const [currentOption, setCurrentOption] = useState(delayOptions[0]);

  const {setDelay} = usePhotoBooth();

  return (
    <div className="relative min-w-[100px]">
      <button
        onClick={() => setOpenOptions(!openOptions)}
        className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-md"
      >
        <div className="flex items-center gap-2">
          <span className="text-[16px]">Delay {currentOption}s</span>
        </div>
        <MdKeyboardArrowDown />
      </button>
      {openOptions && (
        <div className="absolute mt-2 w-full rounded-md border border-gray-300 bg-white p-2 shadow-md z-10">
          {delayOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                setCurrentOption(option);
                setOpenOptions(false);
                setDelay(option);
              }}
              className="flex w-full items-center gap-2 rounded-md px-1 py-2 text-left hover:bg-gray-100"
            >
              <span className="text-[16px]">Delay {option}s</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DelaySelection;
