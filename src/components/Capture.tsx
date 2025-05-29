import { useEffect } from "react";

import WebCamera from "./WebCamera";
import CapturedImages from "./CapturedImages";
import FollowUs from "./FollowUs";
import { usePhotoBooth } from "../context/PhotoBoothContext";

const Capture = () => {
  const { images } = usePhotoBooth();

  // Show browser confirmation dialog on reload/close if there are unsaved images
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (images.length > 0) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [images]);

  return (
    <section className="mt-6 flex w-full justify-center">
      <div className="flex w-full max-w-6xl flex-col items-start justify-center gap-6 px-2 md:flex-row">
        <FollowUs />
        {/* Camera */}
        <WebCamera />
        {/* Captured images */}
        <CapturedImages />
      </div>
    </section>
  );
};

export default Capture;
