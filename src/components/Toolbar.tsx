import { Camera } from "lucide-react";

import { useBoothProvider } from "../store/use-booth-provider";
import { useWebCam } from "../hooks/use-webcam";

const Toolbar = () => {
  const { addImage } = useBoothProvider();
  const { captureImage } = useWebCam();

  const handleCapture = () => {
    const image = captureImage();
    if (image) addImage(image);
  };

  return (
    <button
      className="flex size-10 cursor-pointer items-center justify-center rounded-full border-2 border-black p-2"
      onClick={handleCapture}
    >
      <Camera className="size-full" />
    </button>
  );
};

export default Toolbar;
