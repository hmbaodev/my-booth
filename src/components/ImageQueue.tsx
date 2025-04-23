interface ImageQueueProps {
  images: string[];
}

const ImageQueue = ({ images }: ImageQueueProps) => {
  return (
    <div className="flex h-full flex-col items-start justify-center gap-3">
      {images.length === 0 ? (
        <p>Images</p>
      ) : (
        images?.map((image) => (
          <img
            key={image}
            src={image}
            alt=""
            className="w-[136px] rounded-md"
          />
        ))
      )}
    </div>
  );
};

export default ImageQueue;
