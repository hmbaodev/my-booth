import ImageQueue from "../components/ImageQueue";
import WebCam from "../components/WebCam";

const Booth = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <WebCam />
      <ImageQueue />
    </div>
  );
}

export default Booth
