import { useState } from "react";

import WebCam from "./components/WebCam";
import ImageQueue from "./components/ImageQueue";

const App = () => {
  const [images, setImages] = useState<string[]>([]);

  const onCapture = (imageUrl: string) => {
    setImages((prev) => [imageUrl, ...prev]);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-200">
      <div className="flex gap-3 ">
        <WebCam onCapture={onCapture} />
        <ImageQueue images={images} />
      </div>
    </div>
  );
};

export default App;
