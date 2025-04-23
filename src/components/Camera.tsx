import { useRef, useEffect } from "react";

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Could not access the camera. Please allow permissions or check device.", err);
      }
    };

    getCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <video
        ref={videoRef}
        className="aspect-[4/3] w-[600px] rounded-lg border-2 border-black"
        autoPlay
        playsInline
      />
      <div className="flex items-center gap-3">
        <button>Invert</button>
        <button>Start</button>
      </div>
    </div>
  );
};

export default Camera;
