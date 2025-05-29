import { CameraIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import MobileCapturedImages from "./MobileCapturedImages";
import { usePhotoBooth } from "../context/PhotoBoothContext";

const WebCamera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false);

  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [frameStyle, setFrameStyle] = useState<string>("w-full aspect-[3/2]");

  const navigate = useNavigate();

  const { frame, delay, addImage, images } = usePhotoBooth();

  useEffect(() => {
    if (frame.id === "4-v") {
      setFrameStyle("w-full aspect-[3/2]");
    } else if (frame.id === "4-g") {
      setFrameStyle("w-[75%] aspect-[1/1.2]");
    }
  }, [frame.id]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setHasCameraPermission(true);
      } catch (error) {
        console.error("Error accessing the camera:", error);
        setHasCameraPermission(false);
      }
    };

    startCamera();

    // Cleanup on component unmount
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream | null;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL("image/png");
        // onCapture(imageData);
        addImage(imageData);
      }
    }
  };

  const startAutoCapture = async () => {
    setIsCapturing(true);
    for (let i = 0; i < frame.numOfImages; i++) {
      for (let sec = delay; sec > 0; sec--) {
        setCountdown(sec);
        await new Promise((res) => setTimeout(res, 1000));
      }
      setCountdown(null);
      capturePhoto();
      await new Promise((res) => setTimeout(res, 200));
    }
    setIsCapturing(false);
  };

  return (
    <div className="flex w-full flex-col items-center md:max-w-xl">
      {hasCameraPermission ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={`object-cover relative scale-x-[-1] rounded-md border-2 border-black ${frameStyle}`}
          />
          {countdown !== null && (
            <div className="absolute top-1/2 left-1/2 flex aspect-square w-[40px] items-center justify-center rounded-full bg-gray-50/80 text-2xl font-medium">
              <span>{countdown}</span>
            </div>
          )}
          <MobileCapturedImages />
          <button
            className="mt-6 flex cursor-pointer items-center gap-2 rounded-full bg-black px-6 py-3 text-[16px] font-medium text-white transition duration-300 ease-in-out hover:bg-black/80"
            // onClick={capturePhoto}
            onClick={() => {
              if (images.length === frame.numOfImages) {
                navigate("/export");
                return;
              }

              startAutoCapture();
            }}
            disabled={isCapturing}
          >
            <CameraIcon />
            <span>
              {isCapturing
                ? "Capturing..."
                : images.length === frame.numOfImages
                  ? "Export Photos"
                  : `Auto Capture (${frame.numOfImages}x)`}
            </span>
          </button>
          <canvas
            ref={canvasRef}
            style={{ display: "none", marginTop: "1rem", maxWidth: "100%" }}
          />
        </>
      ) : (
        <p>Camera access is required.</p>
      )}
    </div>
  );
};

export default WebCamera;
