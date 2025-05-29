import DelaySelection from "./DelaySelection";
import FrameSelection from "./FrameSelection";
import UploadImages from "./UploadImages";

const Options = () => {
  return (
    <section className="flex items-center justify-center w-full">
      <div className="flex items-center gap-4">
        <FrameSelection />
        <DelaySelection />
        <UploadImages />
      </div>
    </section>
  );
};

export default Options;
