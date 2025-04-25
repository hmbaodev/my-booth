import { useBoothProvider } from "../store/use-booth-provider";

const ImageQueue = () => {
  const { images, isMirrored } = useBoothProvider();

  return (
    <div className="flex max-h-[500px] pr-2 gap-3 max-md:flex-row max-md:overflow-x-scroll md:flex-col md:overflow-y-scroll">
      {images.length === 0 ? (
        <div className="flex w-full items-center justify-center rounded-md border-2 border-black p-2 max-md:h-[150px] md:aspect-[1/2] md:w-[150px]">
          <p>Queued Images</p>
        </div>
      ) : (
        images?.map((image) => (
          <img
            key={image}
            src={image}
            alt=""
            className={`w-[112px] rounded-md border-2 border-black md:w-[136px] ${
              isMirrored ? "" : "scale-x-[-1]"
            }`}
          />
        ))
      )}
    </div>
  );
};

export default ImageQueue;
