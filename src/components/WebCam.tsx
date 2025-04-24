import { FlipHorizontal2, Camera } from "lucide-react";

import { useBoothProvider } from "../store/use-booth-provider";
import { useWebCam } from "../hooks/use-webcam";

const WebCam = () => {
  const { isMirrored, toggleMirror, addImage } = useBoothProvider();
  const { videoRef, captureImage } = useWebCam();

  const handleCapture = () => {
    const image = captureImage();
    if (image) addImage(image);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <video
        ref={videoRef}
        className={`aspect-[4/3] w-[600px] rounded-lg border-2 border-black ${
          isMirrored ? "scale-x-[-1]" : ""
        }`}
        autoPlay
        playsInline
      />
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMirror}
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-black p-2"
        >
          <FlipHorizontal2 className="size-full text-white" />
        </button>
        <button
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border-2 border-black p-2"
          onClick={handleCapture}
        >
          <Camera className="size-full" />
        </button>
      </div>
    </div>
  );
};

export default WebCam;
