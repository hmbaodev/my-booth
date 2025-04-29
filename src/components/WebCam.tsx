import { useEffect, useState } from "react";
import { ClockArrowDown, FlipHorizontal2, Camera } from "lucide-react";
import { useNavigate } from "react-router";

import { useBoothProvider } from "../store/use-booth-provider";
import { useWebCam } from "../hooks/use-webcam";

const WebCam = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const navigate = useNavigate();

  const {
    isMirrored,
    toggleMirror,
    addImage,
    countdown,
    setCountdown,
    captureQueue,
    setCaptureQueue,
  } = useBoothProvider();
  const { videoRef, captureImage } = useWebCam();

  const handleCapture = () => {
    if (totalImages < 4) {
      const image = captureImage();
      if (image) addImage(image);
      setTotalImages((prev) => prev + 1);
      // console.log(totalImages)
    } else {
      alert("Bạn chỉ được chụp tối đa 4 tấm!!!");
      return;
    }
  };

  // const startCountdown = () => {
  //   const DEFAULT_COUNTDOWN = 3;
  //   setCountdown(DEFAULT_COUNTDOWN);
  // };

  const DEFAULT_IMAGES = 4;
  const startMultiCapture = (totalPhotos = DEFAULT_IMAGES) => {
    if (captureQueue > 0) return; // prevent overlap
    setCurrentImageIndex(0);
    setShowMessage(true);
    setCaptureQueue(totalPhotos);
    // setCountdown(3);
  };

  useEffect(() => {
    if (showMessage && captureQueue > 0) {
      // Show message briefly, then start countdown
      const timeout = setTimeout(() => {
        setShowMessage(false);
        setCountdown(3);
      }, 1000);
      return () => clearTimeout(timeout);
    }

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (countdown === 0 && captureQueue > 0) {
      const image = captureImage();
      if (image) addImage(image);

      const remaining = captureQueue - 1;
      setCaptureQueue(remaining);
      setCurrentImageIndex((i) => i + 1);

      if (remaining > 0) {
        setShowMessage(true);
      } else {
        setCountdown(-1);
        navigate("/export");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, showMessage]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative aspect-[4/3] w-[600px] overflow-hidden rounded-lg border-2 border-black">
        <video
          ref={videoRef}
          className={`h-full w-full object-cover ${isMirrored ? "scale-x-[-1]" : ""}`}
          autoPlay
          playsInline
        />
        {showMessage && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <p className="text-3xl font-semibold text-white">
              Get ready for image #{currentImageIndex + 1}
            </p>
          </div>
        )}
        {countdown > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              key={countdown} // triggers re-animation on each number change
              className="animate-countdown text-7xl font-bold text-white"
            >
              {countdown}
            </p>
          </div>
        )}
      </div>
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
          // disabled={}
        >
          <Camera className="size-full" />
        </button>
        <button
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border-2 border-black p-2"
          onClick={() => startMultiCapture(4)}
          disabled={countdown > 0}
        >
          <ClockArrowDown className="size-full" />
        </button>
        <button
          className="flex h-10 cursor-pointer items-center justify-center rounded-full border-2 border-black px-4 py-2"
          onClick={() => {
            navigate("/export");
          }}
          disabled={totalImages + 1 <= 4}
        >
          Xuất Frame
        </button>
      </div>
    </div>
  );
};

export default WebCam;
