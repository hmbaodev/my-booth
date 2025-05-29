import { useEffect } from "react";

import { usePhotoBooth } from "../context/PhotoBoothContext";

const CapturedImages = () => {
  const { images, frame } = usePhotoBooth();
  const frameStyle = frame.id === "4-v" ? "w-full aspect-[3/2]" : "w-[75%] aspect-[1/1.2]";

  useEffect(() => {
    // Scroll to the bottom of the container when new images are added
    const container = document.getElementById("captured-images-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [images]);

  return (
    <div
      id="captured-images-container"
      className="mt-4 hidden max-h-[360px] flex-col gap-2 overflow-y-auto lg:flex lg:w-[112px]"
    >
      {images.map((image) => (
        <img
          key={image}
          src={image}
          className={`scale-x-[-1] rounded-md border border-black object-cover ${frameStyle}`}
        />
      ))}
    </div>
  );
};

export default CapturedImages;
