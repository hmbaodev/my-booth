import { useEffect } from "react";
import { usePhotoBooth } from "../context/PhotoBoothContext";

const MobileCapturedImages = () => {
  const { images, frame } = usePhotoBooth();
  const frameStyle =
    frame.id === "4-v" ? "w-[80px] aspect-[3/2]" : "w-[80px] aspect-[1/1.2]";

  useEffect(() => {
    // Scroll to the right when new images are added
    const container = document.getElementById(
      "mobile-captured-images-container",
    );
    if (container) {
      container.scrollLeft = container.scrollWidth;
    }
  }, []);

  return (
    <div
      id="mobile-captured-images-container"
      className="mt-3 flex w-full items-center justify-center gap-3 overflow-x-auto lg:hidden"
    >
      {images.map((image) => (
        <img
          key={image}
          src={image}
          className={`scale-x-[-1] rounded-md border border-black object-cover ${frameStyle}`}
          // className="aspect-[3/2] h-[80px] scale-x-[-1] rounded-md border border-black object-cover"
        />
      ))}
    </div>
  );
};

export default MobileCapturedImages;
