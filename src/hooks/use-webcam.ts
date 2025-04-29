import { useState, useEffect, useRef } from "react";

export const useWebCam = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMirrored, setIsMirrored] = useState(true);
  const [isReady, setIsReady] = useState(false);

  // Start the camera (front-facing only)
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsReady(true);
      }
    } catch (err) {
      console.error("Camera access denied or failed.", err);
    }
  };

  // Stop the camera and release physical camera
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setIsReady(false);
    }
  };

  useEffect(() => {
    startCamera();
    return stopCamera;
  }, []);

  const captureImage = (): string | null => {
    // console.log(videoRef.current, "VIDEO")

    if (!videoRef.current) return null;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    if (isMirrored) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  };

  return {
    videoRef,
    isReady,
    isMirrored,
    setIsMirrored,
    captureImage,
    stopCamera,
    startCamera,
  };
};
