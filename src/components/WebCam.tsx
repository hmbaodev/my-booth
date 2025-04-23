import { useState, useRef, useEffect } from "react";
import { FlipHorizontal2, Camera } from "lucide-react";

interface WebCamProps {
  onCapture?: (imageUrl: string) => void;
}

const WebCam = ({ onCapture }: WebCamProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMirrored, setIsMirrored] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [scale, setScale] = useState<"gray" | "none">("none");

  // Start the camera (front-facing only)
  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (error) {
      console.error(
        "Could not access the camera. Please allow permissions or check device.",
        error,
      );
    }
  };

  // Stop the camera and release physical camera
  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop(); // Ensure both video and audio tracks are stopped
      });
    }
    setStream(null); // Clear the stream
  };

  useEffect(() => {
    startCamera();

    // Cleanup on component unmount
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means it runs once on mount

  // Handle Capture
  const handleCapture = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (isMirrored) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageUrl = canvas.toDataURL("image/png");

    if (onCapture) {
      onCapture(imageUrl); // store saved images into a queue
    }
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
        style={{
          filter: scale === "gray" ? "grayscale(100%)" : "none",
        }}
      />
      <div className="flex items-center gap-3">
        <button
          className="box-border flex h-10 cursor-pointer items-center justify-center rounded-full border-2 border-black px-3 py-2"
          onClick={() => setScale("gray")}
        >
          Trắng/Đen
        </button>
        <button
          className="box-border flex h-10 cursor-pointer items-center justify-center rounded-full border-2 border-black px-3 py-2"
          onClick={() => setScale("none")}
        >
          Mặc định
        </button>
        <button
          onClick={() => setIsMirrored((prev) => !prev)}
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
